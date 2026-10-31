"use client";

import { useEffect, useState } from "react";
import { hasGoogleAdvertisingConsent } from "@/lib/consent.mjs";

type TCData = { listenerId?: number; eventStatus?: string; cmpStatus?: string };
type TCFApi = (command: string, version: number, callback: (data: TCData, success: boolean) => void, parameter?: number) => void;
type CMPWindow = Window & { __tcfapi?: TCFApi; gtag?: (...args: unknown[]) => void };

export default function useAdvertisingConsent(enabled: boolean, revision: string) {
  const [response, setResponse] = useState({ revision: "", granted: false });
  useEffect(() => {
    if (!enabled) return;
    let disposed = false;
    let api: TCFApi | undefined;
    let listenerId: number | undefined;
    function listen() {
      api = (window as CMPWindow).__tcfapi;
      if (!api) return false;
      try {
        api("addEventListener", 2, (data, success) => {
          if (disposed) return;
          listenerId = data?.listenerId;
          if (success && data?.eventStatus === "cmpuishown") return;
          const allowed = success && hasGoogleAdvertisingConsent(data);
          (window as CMPWindow).gtag?.("consent", "update", { ad_storage: allowed ? "granted" : "denied", ad_user_data: allowed ? "granted" : "denied", ad_personalization: allowed ? "granted" : "denied" });
          setResponse({ revision, granted: allowed });
          if (!allowed && document.getElementById("google-adsense")) window.location.reload();
        });
        return true;
      } catch { return false; }
    }
    let attempts = 0;
    const timer = listen() ? undefined : window.setInterval(() => {
      if (listen() || ++attempts >= 120) window.clearInterval(timer);
    }, 250);
    return () => {
      disposed = true;
      window.clearInterval(timer);
      if (api && listenerId !== undefined) {
        try { api("removeEventListener", 2, () => {}, listenerId); } catch { /* The CMP may have already unloaded. */ }
      }
    };
  }, [enabled, revision]);
  return enabled && response.revision === revision && response.granted;
}
