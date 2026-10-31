import guides from "@/content/service-guides.json";

export function getServiceGuide(slug: string) {
  return Object.hasOwn(guides, slug) ? guides[slug as keyof typeof guides] : undefined;
}
