import type { Metadata, Viewport } from "next";

import { LocationSection, MetadataResponse } from "@/types/data";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export function generateSEOMetadata(
  metadataResponse: MetadataResponse | null | undefined,
): Metadata {
  const title = metadataResponse?.title || "Terranova Clinica dental";
  const description =
    metadataResponse?.description || "Bienvenidos a Terranova Clinica dental";
  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  );

  // const heroBannerData =
  //   (data?.sections?.[0] as Hero | undefined) || ({} as Hero);
  // const { image } = heroBannerData;
  // const ogImageUrl = getStrapiMedia(image?.url);
  const ogImageUrl = "/logo.svg";

  const locationData = (metadataResponse?.sections?.[1] as
    | LocationSection
    | undefined) || {
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

  const geoLatitude = locationData.location?.latitude?.toString() || "";
  const geoLongitude = locationData.location?.longitude?.toString() || "";

  return {
    title,
    description,
    keywords:
      "clinica dental, odontologia, salud bucal, Terranova, Madrid, San Blas, Canillejas, ortodoncia, implantes dentales, blanqueamiento dental",
    metadataBase,
    applicationName: title,
    creator: title,
    publisher: title,
    category: "health",
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: "/",
      siteName: title,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Clinica dental en Madrid`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/logo.svg",
    },
    other: {
      ...(geoLatitude && geoLongitude
        ? {
            "geo.region": "ES-MD",
            "geo.placename": "Madrid",
            "geo.position": `${geoLatitude};${geoLongitude}`,
            ICBM: `${geoLatitude}, ${geoLongitude}`,
          }
        : {}),
    },
  };
}
