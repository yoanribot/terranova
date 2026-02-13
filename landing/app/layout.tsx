import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getHomepage, getMetadata } from "@/lib/strapi";
import { LocationSection } from "@/types/data";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { title, description, sections } = await getMetadata();
const data = await getHomepage();
const socials = sections?.[0].socials || [];
const locationData = data?.sections?.[2] as LocationSection;

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer socials={socials} location={locationData} />
      </body>
    </html>
  );
}
