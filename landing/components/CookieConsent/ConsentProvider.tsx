"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import { CONSENT_KEY, createConsent, DENIED_PREFERENCES, parseConsent } from "@/lib/consent.mjs";
import CookieBanner, { type CookieBannerHandle } from "./CookieBanner";

export type Preferences = { analytics: boolean; maps: boolean; advertising: boolean };
export type ConsentRecord = { version: number; updatedAt: number; expiresAt: number; preferences: Preferences };
type ConsentContextValue = {
  preferences: Preferences;
  record: ConsentRecord | null;
  ready: boolean;
  save: (preferences: Preferences) => boolean;
  openSettings: () => void;
  analyticsAvailable: boolean;
  advertisingAvailable: boolean;
};
type GoogleWindow = Window & { gtag?: (...args: unknown[]) => void; __terranovaForceDenied?: boolean };

const ConsentContext = createContext<ConsentContextValue | null>(null);
const changeEvent = "terranova-consent-change";
const sessionDenialKey = "terranova.consent.session-denial";
let memoryChoice: string | undefined;
let localStorageChecked = false;
let localStorageWritable = true;
let reloadSafe = true;
const serverSnapshot = () => null;
const serverReady = () => false;
const browserReady = () => true;
const subscribeReady = () => () => {};

function snapshot() {
  if (memoryChoice === undefined && (window as GoogleWindow).__terranovaForceDenied) {
    (window as GoogleWindow).__terranovaForceDenied = false;
    memoryChoice = JSON.stringify(createConsent(DENIED_PREFERENCES));
    try { localStorage.setItem(CONSENT_KEY, memoryChoice); } catch { /* Keep the forced denial in this document. */ }
  }
  let raw = memoryChoice;
  if (raw === undefined) {
    try { raw = sessionStorage.getItem(sessionDenialKey) || undefined; } catch { /* Storage may be disabled. */ }
    if (raw === undefined) try {
      raw = localStorage.getItem(CONSENT_KEY) || undefined;
      // Never restore an old grant from a store that cannot accept withdrawal.
      if (raw && !localStorageChecked) {
        localStorageChecked = true;
        try { localStorage.setItem(CONSENT_KEY, raw); } catch { localStorageWritable = false; }
      }
      if (!localStorageWritable) raw = undefined;
    } catch { /* Deny when storage is unavailable. */ }
  }
  return raw && parseConsent(raw) ? raw : null;
}
function subscribe(callback: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) { memoryChoice = undefined; localStorageChecked = false; callback(); }
  };
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", storage);
  };
}

function removeTrackingCookies(preferences: Preferences) {
  const names = document.cookie.split(";").map(cookie => cookie.split("=")[0].trim()).filter(name =>
    (!preferences.analytics && /^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_gac_)/.test(name))
    || (!preferences.advertising && /^(_gcl_|__gads$|__gpi$|__eoi$)/.test(name)));
  const parts = location.hostname.split(".");
  const domains = ["", ...parts.map((_, index) => parts.slice(index).join(".")).filter(domain => domain.includes(".")).flatMap(domain => [domain, `.${domain}`])];
  const paths = ["/", ...location.pathname.split("/").map((_, index, all) => all.slice(0, index + 1).join("/")).filter(Boolean)];
  for (const name of names) for (const domain of domains) for (const path of paths) {
    document.cookie = `${name}=; Max-Age=0; path=${path};${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
  }
}

function updateGoogleConsent(preferences: Preferences, gaId: string) {
  const google = window as GoogleWindow;
  if (gaId) Reflect.set(google, `ga-disable-${gaId}`, !preferences.analytics);
  google.gtag?.("consent", "update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    // Advertising grants are published only by the certified CMP integration.
    ...(!preferences.advertising ? { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" } : {}),
  });
  removeTrackingCookies(preferences);
}

export default function ConsentProvider({ children, gaId, advertisingAvailable }: { children: ReactNode; gaId: string; advertisingAvailable: boolean }) {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const ready = useSyncExternalStore(subscribeReady, browserReady, serverReady);
  const record = useMemo(() => parseConsent(raw) as ConsentRecord | null, [raw]);
  const preferences = record?.preferences || DENIED_PREFERENCES;
  const banner = useRef<CookieBannerHandle>(null);
  const analyticsAvailable = /^G-[A-Z0-9]+$/i.test(gaId);

  const save = useCallback((choice: Preferences) => {
    const next = createConsent({ ...choice, analytics: analyticsAvailable && choice.analytics, advertising: advertisingAvailable && choice.advertising });
    // Deny immediately, before React re-renders or the page is reloaded.
    updateGoogleConsent(next.preferences, gaId);
    memoryChoice = JSON.stringify(next);
    let persisted = true;
    try {
      localStorage.setItem(CONSENT_KEY, memoryChoice);
      localStorageWritable = true;
      try { sessionStorage.removeItem(sessionDenialKey); } catch { /* An old denial remains safe. */ }
      reloadSafe = true;
    } catch {
      persisted = false;
      localStorageWritable = false;
      reloadSafe = false;
      try { localStorage.removeItem(CONSENT_KEY); reloadSafe = true; } catch { /* The store may be read-only. */ }
      try { sessionStorage.setItem(sessionDenialKey, JSON.stringify(createConsent(DENIED_PREFERENCES))); reloadSafe = true; } catch { /* Keep the memory choice for this document. */ }
    }
    window.dispatchEvent(new Event(changeEvent));
    return persisted;
  }, [analyticsAvailable, advertisingAvailable, gaId]);

  useEffect(() => {
    if (!ready) return;
    updateGoogleConsent(preferences, gaId);
    // Removing a tag cannot stop an already running library. A fresh document
    // stops it, including when consent is withdrawn in another browser tab.
    const analyticsRunning = !preferences.analytics && document.getElementById("google-analytics-library");
    const advertisingRunning = !preferences.advertising && document.getElementById("google-adsense");
    if (analyticsRunning || advertisingRunning) {
      if (reloadSafe) window.location.reload();
      else {
        // Stop executed libraries with a fresh document even if every storage
        // write is blocked. The bootstrap consumes this deny-only override
        // before any persisted choice can authorize optional services again.
        const destination = new URL(window.location.href);
        destination.searchParams.set("_privacy", "necessary");
        window.location.replace(destination.href);
      }
    }
  }, [ready, preferences, gaId]);

  useEffect(() => {
    if (!record) return;
    const timer = window.setInterval(() => {
      if (Date.now() >= record.expiresAt) window.dispatchEvent(new Event(changeEvent));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, [record]);

  const openSettings = useCallback(() => banner.current?.open(), []);
  const value = useMemo(() => ({ preferences, record, ready, save, openSettings, analyticsAvailable, advertisingAvailable }), [preferences, record, ready, save, openSettings, analyticsAvailable, advertisingAvailable]);
  return <ConsentContext.Provider value={value}>{children}<CookieBanner ref={banner} /></ConsentContext.Provider>;
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("Cookie preferences require ConsentProvider");
  return context;
}

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useConsent();
  return <button type="button" className={className} onClick={openSettings}>Configurar cookies</button>;
}
