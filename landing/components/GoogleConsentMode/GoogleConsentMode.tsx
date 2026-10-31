import Script from "next/script";

/**
 * Establishes denied defaults before any Google tag can run. The site banner
 * updates Analytics; only an actual certified CMP can authorize advertising.
 */
export default function GoogleConsentMode() {
  return (
    // This component is rendered only by app/layout.tsx (the App Router root layout).
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="google-consent-mode" strategy="beforeInteractive">
      {`var privacyUrl = new URL(window.location.href);
if (privacyUrl.searchParams.get('_privacy') === 'necessary') {
  window.__terranovaForceDenied = true;
  privacyUrl.searchParams.delete('_privacy');
  window.history.replaceState(window.history.state, '', privacyUrl.href);
}
window.dataLayer = window.dataLayer || [];
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
