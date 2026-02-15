import "./globals.css";

import type { Metadata } from "next";
import { DM_Serif_Text } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getHomepage, getMetadata } from "@/lib/strapi";
import { LocationSection } from "@/types/data";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
config.autoAddCss = false;

const dmSerif = DM_Serif_Text({
  weight: ["400"],
});

const { title, description, sections } = await getMetadata();
const data = await getHomepage();
console.log({ data });
const socials = sections?.[0].socials || [];
const locationData = data?.sections?.[3] as LocationSection;

export const metadata: Metadata = {
  title: title || "Terra Nova",
  description: description || "Bienvenidos a Terra Nova",
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
      </head>

      <body className={`${dmSerif.className} antialiased`}>
        <Header title={title} />
        <main>{children}</main>
        <Footer title={title} socials={socials} location={locationData} />
      </body>
    </html>
  );
}
