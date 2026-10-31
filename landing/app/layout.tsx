import "./globals.css";
import "./shared.css";
import "./fonts.css";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getMetadata, getServices } from "@/lib/content";
import { LocationSection } from "@/types/data";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import GoogleAdsense from "@/components/GoogleAdsense/GoogleAdsense";
import GoogleConsentMode from "@/components/GoogleConsentMode/GoogleConsentMode";
import ConsentProvider from "@/components/CookieConsent/ConsentProvider";
import { isPracticalService } from "@/lib/service-categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { generateSEOMetadata, viewport } from "@/app/generateSEOMetadata";

config.autoAddCss = false;
const metadataResponse = getMetadata();
const title = metadataResponse?.title || "Terranova Clínica Dental";
const sections = metadataResponse?.sections || [];
const socials = sections?.[1]?.socials || [];
const whatsapp = socials.find(social => social?.label?.toLowerCase() === "whatsapp");
const locationData = (metadataResponse?.sections?.[0] as LocationSection | undefined) || {
  title: "", description: "", phoneMain: "", address: "", email: "",
  location: { latitude: "", longitude: "" }, schedules: [],
};
export { viewport };
export const metadata: Metadata = generateSEOMetadata(metadataResponse);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <GoogleConsentMode />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased" id="page-top">
        <ConsentProvider gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS?.trim() || ""} advertisingAvailable={process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && process.env.NEXT_PUBLIC_GOOGLE_CMP_READY === "true" && /^ca-pub-\d{16}$/.test(process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "")}>
        <a href="#main-content" className="skip-link">Saltar al contenido</a>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} /> : null}
        <GoogleAdsense eligiblePaths={["/", ...getServices().filter(page => !isPracticalService(page.slug)).map(page => `/servicios/${page.slug}`)]} />
        <Header title={title} />
        <main id="main-content" tabIndex={-1}>
          {children}
          {whatsapp?.href ? <a href={whatsapp.href} className="whatsapp-contact no-print" target="_blank" rel="noopener noreferrer" aria-label="Contactar con Terranova por WhatsApp, se abre en otra pestaña"><FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" /><span>WhatsApp</span></a> : null}
        </main>
        <Footer title={title} socials={socials} location={locationData} />
        </ConsentProvider>
      </body>
    </html>
  );
}
