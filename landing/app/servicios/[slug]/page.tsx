import { getBlogs } from "@/lib/strapi";
import styles from "./servicios.module.css";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getBlogs();

  console.log({ slug, data });

  return (
    <section className={styles.pageContent}>
      <h1>Servicio: {slug}</h1>
    </section>
  );
}
