import site from "@/content/site.json";
import type {
  BlogData,
  HomepageData,
  LocationSection,
  MetadataResponse,
  SocialSection,
} from "@/types/data";

const LEGAL_SLUGS = new Set([
  "aviso-legal",
  "politica-privacidad",
  "politica-cookies",
]);

type LocalSite = {
  home: HomepageData & { title: string; description: string };
  blogs: BlogData[];
};

const localSite = site as LocalSite;

export function getHomepage(): HomepageData {
  return localSite.home;
}

export function getMetadata(): MetadataResponse {
  const sections = localSite.home.sections;
  return {
    title: localSite.home.title,
    description: localSite.home.description,
    sections: [
      sections[3] as LocationSection,
      sections[4] as SocialSection,
    ],
  };
}

export function getServices(): BlogData[] {
  return localSite.blogs.filter((page) => !LEGAL_SLUGS.has(page.slug));
}

export function getServiceBySlug(slug: string): BlogData | undefined {
  return getServices().find((page) => page.slug === slug);
}

export function getLegalPages(): BlogData[] {
  return localSite.blogs.filter((page) => LEGAL_SLUGS.has(page.slug));
}

export function getLegalPageBySlug(slug: string): BlogData | undefined {
  return getLegalPages().find((page) => page.slug === slug);
}
