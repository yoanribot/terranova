import { getBlogBySlug, getBlogs, getHomepage } from "@/lib/strapi";
import styles from "./servicios.module.css";
import { getStrapiMedia } from "@/lib/utils";
import { RichTextRenderer } from "@/components/shared/BlockRender/RichText";
import Carousel from "@/components/shared/Carousel";
import { RichTextDocument } from "@/types/RichText";
import { BlogData, LocationSection } from "@/types/data";
import { ContactForm } from "@/components/ContactForm/ContactForm";

type DynamicPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: DynamicPageProps) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);
  const homeData = await getHomepage();
  const locationData = homeData?.sections?.[3] as LocationSection;
  const { address, description, phoneMain, phoneSecondary, schedules } =
    locationData || {};

  if (!data?.[0]) {
    return <div>No se encontraron datos para el servicio solicitado.</div>;
  }

  const { title, content, backgroundImage, images } = data[0] || {};
  const bgImage = getStrapiMedia(backgroundImage?.url);

  return (
    <section className="text-white">
      <div
        style={{
          backgroundImage: `linear-gradient( 180deg, rgba(0,0,0,0.61) 0%, rgba(0,0,0,0.29) 100% ), url(${bgImage})`,
        }}
        className="h-[60vh] p-2 bg-cover bg-center flex items-center justify-center xs:mb-20 text-white relative"
      >
        <h1 className="text-6xl text-center my-32">{title}</h1>
        {/* <img
          src="/section-divider-x.svg"
          alt="Section Divider"
          className="w-full absolute bottom-0 h-30"
        /> */}
        <img
          src="/section-divider-wave.svg"
          alt="Section Divider"
          className="w-full absolute bottom-0 h-30"
        />
      </div>

      <div className={styles.pageContent}>
        <div className="p-6">
          {/* <BlockRendererClient content={content} /> */}
          <RichTextRenderer content={content as RichTextDocument} />
        </div>

        {images && images.length > 0 && (
          <section>
            <h3 className="text-xl mb-6 text-center">Imagenes relacionadas:</h3>
            <Carousel images={images} />
          </section>
        )}
      </div>

      <div className="bg-gray-600 pb-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1518.1917175293722!2d-3.6161087017516556!3d40.44464964424175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422fa5bf86a4dd%3A0x28c23634ca08de3f!2sC.%20Alcal%C3%A1%2C%20573%2C%20San%20Blas-Canillejas%2C%2028022%20Madrid%2C%20Spain!5e0!3m2!1sen!2sfr!4v1771016881177!5m2!1sen!2sfr"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="max-w-[1200px] m-auto flex mt-20">
          <div className="flex-1">
            <ul>
              <li className="mt-4">
                <strong>Direccion:</strong> {address}
              </li>
              <li className="mt-4">
                <strong>Informacion extra:</strong> {description}
              </li>
              <li className="mt-4">
                <strong>Telefono:</strong> {phoneMain}
              </li>
              <li className="mt-4">
                <strong>Telefono secundario:</strong> {phoneSecondary}
              </li>
              <li className="mt-4">
                <strong>Horario de apertura:</strong>
              </li>
              <ul>
                {schedules?.map((slot) => (
                  <li key={slot.day} className="mb-0.5">
                    <span className="">{slot.day}:</span>{" "}
                    {slot.availability ?? (
                      <span className="text-orange-500"> Cerrado </span>
                    )}
                  </li>
                ))}
              </ul>
            </ul>
          </div>
          <div className="flex-2 text-black">
            <ContactForm />
          </div>
        </div>
      </div>
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
