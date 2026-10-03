import type { MetadataRoute } from "next";
import { getLegalPages, getServices } from "@/lib/content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.terranovaclinicadental.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices().map(({ slug }) => ({
    url: new URL(`/servicios/${slug}`, siteUrl).toString(),
  }));

  const legalPages = getLegalPages().map(({ slug }) => ({
    url: new URL(`/terminos/${slug}`, siteUrl).toString(),
  }));

  return [
    { url: new URL("/", siteUrl).toString() },
    ...services,
    ...legalPages,
  ];
}
