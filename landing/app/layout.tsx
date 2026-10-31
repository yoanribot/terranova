import "./globals.css";
import "./shared.css";
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
        <GoogleAdsense eligiblePaths={["/", ...getServices().filter(page => page.slug !== "aseguradora").map(page => `/servicios/${page.slug}`)]} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" id="page-top">
        <a href="#main-content" className="skip-link">Saltar al contenido</a>
        {process.env.NEXT_PUBLIC_GOOGLE_CMP_READY === "true" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} /> : null}
        <Header title={title} />
        <main id="main-content" tabIndex={-1}>
          {children}
          {whatsapp?.href ? <a href={whatsapp.href} className="whatsapp-contact no-print" target="_blank" rel="noopener noreferrer" aria-label="Contactar con Terranova por WhatsApp, se abre en otra pestaña"><FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" /><span>WhatsApp</span></a> : null}
        </main>
        <Footer title={title} socials={socials} location={locationData} />
      </body>
    </html>
  );
}
