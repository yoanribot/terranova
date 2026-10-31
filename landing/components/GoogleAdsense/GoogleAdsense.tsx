"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { canLoadAds } from "@/lib/ad-eligibility.mjs";

const ADSENSE_SCRIPT_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

export default function GoogleAdsense({ eligiblePaths }: { eligiblePaths: string[] }) {
  const pathname = usePathname();
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  if (!canLoadAds({ enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED, cmpReady: process.env.NEXT_PUBLIC_GOOGLE_CMP_READY, client, pathname, eligiblePaths })) return null;

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
