"use client";

import Script from "next/script";
import { useConsent } from "@/components/CookieConsent/ConsentProvider";
import { CONSENT_LIFETIME } from "@/lib/consent.mjs";

const GOOGLE_ANALYTICS_ID_PATTERN = /^G-[A-Z0-9]+$/i;

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => {
  const gaId = ga_id.trim();
  const { preferences } = useConsent();

  if (!preferences.analytics || !GOOGLE_ANALYTICS_ID_PATTERN.test(gaId)) return null;

  return (
    <>
      <Script
        id="google-analytics-library"
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
      ></Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window[${JSON.stringify(`ga-disable-${gaId}`)}] = false;
            gtag('consent', 'update', { analytics_storage: 'granted' });
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(gaId)}, {
              cookie_expires: ${CONSENT_LIFETIME / 1000},
              cookie_update: false,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      ></Script>
    </>
  );
};
export default GoogleAnalytics;
