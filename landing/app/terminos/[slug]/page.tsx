import { getLegalPageBySlug, getLegalPages } from "@/lib/content";
import { getLegalDocumentInfo } from "@/lib/legal-documents";
import LegalDocument from "@/components/LegalDocument/LegalDocument";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/app/generateSEOMetadata";

type DynamicPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);
  const document = getLegalDocumentInfo(slug);
  if (!page || !document) notFound();
  return generatePageMetadata(document.title, document.description, `/terminos/${slug}`);
}

export default async function Page({ params }: DynamicPageProps) {
  const { slug } = await params;
  const data = getLegalPageBySlug(slug);
  const document = getLegalDocumentInfo(slug);

  if (!data || !document) {
    notFound();
  }

  return <LegalDocument document={document} content={data.content} />;
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
