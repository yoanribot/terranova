import { getHomepage, getServiceBySlug, getServices } from "@/lib/content";
import { RichTextDocument } from "@/types/RichText";
import { LocationSection } from "@/types/data";
import DynamicPage from "@/components/DynamicPage/DynamicPage";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/app/generateSEOMetadata";
import ServiceGuide from "@/components/ServiceGuide/ServiceGuide";
import { getServiceGuide } from "@/lib/service-guides";

type DynamicPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = getServiceBySlug(slug);
  if (!page) notFound();
  const guide = getServiceGuide(slug);
  return generatePageMetadata(page.title, guide?.description || "Consulta las aseguradoras anunciadas por Terranova y prepara las preguntas sobre cobertura, autorizaciones y presupuesto antes de tu cita.", `/servicios/${slug}`);
}

export default async function Page({ params }: DynamicPageProps) {
  const { slug } = await params;
  const data = getServiceBySlug(slug);
  const homeData = getHomepage();
  const locationData = homeData?.sections?.[3] as LocationSection;
  const { address, description, phoneMain, phoneSecondary, schedules } =
    locationData || {};

  if (!data) {
    notFound();
  }

  const { title, content, backgroundImage, images } = data;

  return (
    <DynamicPage
      title={title}
      serviceSlug={slug}
      content={content as RichTextDocument}
      backgroundImage={backgroundImage}
      images={images}
      address={address}
      description={description}
      phoneMain={phoneMain}
      phoneSecondary={phoneSecondary}
      schedules={schedules}
      parent={{ href: "/servicios", label: "Tratamientos" }}
    >
      <ServiceGuide slug={slug} />
    </DynamicPage>
  );
}

export const dynamic = "force-static";

export function generateStaticParams() {
  return getServices()
    .filter((blog) => !!blog && typeof blog.slug === "string" && blog.slug)
    .map((blog) => ({
      slug: blog.slug as string,
    }));
}
