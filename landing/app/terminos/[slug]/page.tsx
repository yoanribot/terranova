import { getBlogBySlug } from "@/lib/strapi";
import styles from "./termns.module.css";
import { BlogData } from "@/types/data";
import { getStrapiMedia } from "@/lib/utils";
import { RichTextRenderer } from "@/components/shared/BlockRender/RichText";
import { RichTextDocument } from "@/types/RichText";
type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);

  if (!data?.[0]) {
    return <div>No se encontraron datos para el servicio solicitado.</div>;
  }

  const { title, content, backgroundImage } = data[0] || {};
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
    </section>
  );
}
