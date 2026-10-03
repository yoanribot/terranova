import Script from "next/script";

const ADSENSE_SCRIPT_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d{16}$/;

export default function GoogleAdsense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

  if (!enabled || !client || !ADSENSE_CLIENT_PATTERN.test(client)) return null;

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
