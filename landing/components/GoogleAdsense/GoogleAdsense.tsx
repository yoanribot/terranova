"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { canLoadAds } from "@/lib/ad-eligibility.mjs";
import { useConsent } from "@/components/CookieConsent/ConsentProvider";
import useAdvertisingConsent from "@/components/CookieConsent/useAdvertisingConsent";

const ADSENSE_SCRIPT_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

export default function GoogleAdsense({ eligiblePaths }: { eligiblePaths: string[] }) {
  const pathname = usePathname();
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const { preferences, record } = useConsent();
  const consentGranted = useAdvertisingConsent(preferences.advertising && process.env.NEXT_PUBLIC_GOOGLE_CMP_READY === "true", JSON.stringify(record));
  if (!canLoadAds({ enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED, cmpReady: process.env.NEXT_PUBLIC_GOOGLE_CMP_READY, client, pathname, eligiblePaths, consentGranted })) return null;

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`${ADSENSE_SCRIPT_URL}?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
