import Script from "next/script";

const GOOGLE_ANALYTICS_ID_PATTERN = /^G-[A-Z0-9]+$/i;

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => {
  const gaId = ga_id.trim();

  if (!GOOGLE_ANALYTICS_ID_PATTERN.test(gaId)) return null;

  return (
    <>
      <Script
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
            gtag('js', new Date());

            gtag('config', ${JSON.stringify(gaId)});
          `,
        }}
      ></Script>
    </>
  );
};
export default GoogleAnalytics;
