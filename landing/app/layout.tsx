import "./globals.css";
import "./shared.css";

import type { Metadata } from "next";
import { DM_Serif_Text } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getHomepage, getMetadata } from "@/lib/strapi";
import { LocationSection } from "@/types/data";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ChevronUp } from "lucide-react";

config.autoAddCss = false;

const dmSerif = DM_Serif_Text({
  weight: ["400"],
});

const metadataResponse = await getMetadata();
const data = await getHomepage();

const title = metadataResponse?.title || "Terra Nova";
const description = metadataResponse?.description || "Bienvenidos a Terra Nova";
const sections = metadataResponse?.sections || [];
const socials = sections?.[0]?.socials || [];
const whatsapp = socials.find(
  (social) => social?.label?.toLowerCase() === "whatsapp",
);
const locationData = (data?.sections?.[3] as LocationSection | undefined) || {
  title: "",
  description: "",
  phoneMain: "",
  address: "",
  email: "",
  location: {
    latitude: "",
    longitude: "",
  },
  schedules: [],
};

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* GOOGLE ANALYTICS */}
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      )}

      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poiret+One&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`${dmSerif.className} antialiased`}>
        <Header title={title} />

        <main>
          {children}
          <a
            href={whatsapp?.href}
            className="fixed bottom-4 right-4 bg-green-500 text-white h-13 w-13 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center z-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" className="m-auto" />
          </a>
          <a
            href="#"
            className="fixed bottom-40 rounded-sm bg-red right-0 p-2 text-white h-12 w-12 shadow-lg bg-black/30 hover:bg-gray-600 transition-colors flex items-center justify-center z-50 cursor-pointer"
          >
            <ChevronUp width={154} />
          </a>
        </main>

        <Footer title={title} socials={socials} location={locationData} />
      </body>
    </html>
  );
}
