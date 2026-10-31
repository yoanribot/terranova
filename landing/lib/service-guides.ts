import guides from "@/content/service-guides.json";
import { getHomepage } from "@/lib/content";
import type { ServiceSection } from "@/types/data";

export type GuideBlock = { title: string; text: string };
export type ServiceGuideData = {
  description: string;
  intro?: string;
  highlights?: GuideBlock[];
  steps?: GuideBlock[];
  faq?: { question: string; answer: string }[];
  sections: GuideBlock[];
  questions: string[];
  sources: { label: string; url: string }[];
  related: string[];
};

const serviceGuides: Record<string, ServiceGuideData> = guides;

export function getServiceGuide(slug: string): ServiceGuideData | undefined {
  return Object.hasOwn(serviceGuides, slug) ? serviceGuides[slug] : undefined;
}

export function getServiceArtwork(slug: string) {
  const section = getHomepage().sections[2] as ServiceSection | undefined;
  return section?.services.find(service => service.slug === slug)?.image;
}
