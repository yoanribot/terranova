import { getBlogBySlug, getBlogs } from "@/lib/strapi";
import styles from "./servicios.module.css";
import { getStrapiMedia } from "@/lib/utils";
import { RichTextRenderer } from "@/components/shared/BlockRender/RichText";
import Carousel from "@/components/shared/Carousel";
import { RichTextDocument } from "@/types/RichText";
import { BlogData } from "@/types/data";

type DynamicPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: DynamicPageProps) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);

  if (!data?.[0]) {
    return <div>No se encontraron datos para el servicio solicitado.</div>;
  }

  const { title, content, backgroundImage, images } = data[0] || {};
  const bgImage = getStrapiMedia(backgroundImage?.url);

  return (
    <section className={styles.pageContent}>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="h-96 p-2 bg-cover bg-center flex items-center justify-center xs:mb-20"
      >
        <h1 className="text-6xl text-center my-32">{title}</h1>
      </div>

      <div className="mb-20 p-6">
        {/* <BlockRendererClient content={content} /> */}
        <RichTextRenderer content={content as RichTextDocument} />
      </div>

      {images && images.length > 0 && (
        <section>
          <h3 className="text-xl mb-6 text-center">Imagenes relacionadas:</h3>
          <Carousel images={images} />
        </section>
      )}
    </section>
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  const filteredBlogs = blogs.filter(
    (blog): blog is BlogData & { slug: string } =>
      Boolean((blog as { slug?: string } | null)?.slug),
  );

  return filteredBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}
