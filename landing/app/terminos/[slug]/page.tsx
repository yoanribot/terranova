import { getHomepage, getLegalPageBySlug, getLegalPages } from "@/lib/content";
import { RichTextDocument } from "@/types/RichText";
import { LocationSection } from "@/types/data";
import DynamicPage from "@/components/DynamicPage/DynamicPage";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/app/generateSEOMetadata";

type DynamicPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);
  if (!page) notFound();
  return generatePageMetadata(page.title, `${page.title} de Terranova Clínica Dental: información del titular y condiciones aplicables al uso de este sitio.`, `/terminos/${slug}`);
}

export default async function Page({ params }: DynamicPageProps) {
  const { slug } = await params;
  const data = getLegalPageBySlug(slug);
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
      content={content as RichTextDocument}
      backgroundImage={backgroundImage}
      images={images}
      address={address}
      description={description}
      phoneMain={phoneMain}
      phoneSecondary={phoneSecondary}
      schedules={schedules}
    />
  );
}

export const dynamic = "force-static";

export function generateStaticParams() {
  const paths = getLegalPages()
    .filter((blog) => !!blog && typeof blog.slug === "string" && blog.slug)
    .map((blog) => ({
      slug: blog.slug,
    }));

  return paths;
}
