import Script from "next/script";

/**
 * Establishes Google's privacy-first default until the configured CMP publishes
 * the visitor's consent decision. The Google CMP updates these values when it
 * is enabled for the site in AdSense Privacy & messaging.
 */
export default function GoogleConsentMode() {
  return (
    // This component is rendered only by app/layout.tsx (the App Router root layout).
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="google-consent-mode" strategy="beforeInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_personalization: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});`}
    </Script>
  );
}
