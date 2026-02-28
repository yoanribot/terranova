import { getBlogBySlug, getBlogs, getHomepage } from "@/lib/strapi";
import { RichTextDocument } from "@/types/RichText";
import { LocationSection } from "@/types/data";
import DynamicPage from "@/components/DynamicPage/DynamicPage";

type DynamicPageProps = {
  params: { slug: string };
};

export default async function Page({ params }: DynamicPageProps) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);
  const homeData = await getHomepage();
  const locationData = homeData?.sections?.[3] as LocationSection;
  const { address, description, phoneMain, phoneSecondary, schedules } =
    locationData || {};

  if (!data || !data[0] || !data?.[0]) {
    return <div>No se encontraron datos para el servicio solicitado.</div>;
  }

  const { title, content, backgroundImage } = data[0] || {};

  return (
    <DynamicPage
      title={title}
      content={content as RichTextDocument}
      backgroundImage={backgroundImage}
      address={address}
      description={description}
      phoneMain={phoneMain}
      phoneSecondary={phoneSecondary}
      schedules={schedules}
    />
  );
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const blogs = await getBlogs();

  const paths = (blogs ?? [])
    .filter((blog) => !!blog && typeof blog.slug === "string" && blog.slug)
    .map((blog) => ({
      slug: blog.slug,
    }));

  return paths;
}
