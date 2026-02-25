import { getBlogs } from "@/lib/strapi";
import styles from "./DynamicPage.module.css";
import { getStrapiMedia } from "@/lib/utils";
import { RichTextRenderer } from "@/components/shared/BlockRender/RichText";
import Carousel from "@/components/shared/Carousel/Carousel";
import { RichTextDocument } from "@/types/RichText";
import { BlogData } from "@/types/data";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import BlockRendererClient from "../shared/BlockRender/BlockRendererClient";

type DynamicPageProps = {
  title: string;
  content: RichTextDocument;
  backgroundImage?: { url: string };
  images?: { url: string; alternativeText?: string }[];
  address?: string;
  description?: string;
  phoneMain?: string;
  phoneSecondary?: string;
  schedules?: { day: string; availability?: string }[];
};

export default async function DynamicPage({
  title,
  content,
  backgroundImage,
  images,
  address,
  description,
  phoneMain,
  phoneSecondary,
  schedules,
}: DynamicPageProps) {
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
          className="w-full absolute bottom-0 h-15 sm:h-30"
        />
      </div>

      <div className={styles.pageContent}>
        <div className="p-6">
          <BlockRendererClient content={content} />
          {/* <RichTextRenderer content={content as RichTextDocument} /> */}
        </div>

        {images && images.length > 0 && (
          <section>
            <h3 className="text-xl mb-6 text-center">Imagenes relacionadas:</h3>
            <Carousel images={images} />
          </section>
        )}
      </div>

      <div className="bg-[#708f67]">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-0 lg:gap-10 sm:py-20">
            <div className="sm:flex-3 text-black">
              <ContactForm />
            </div>
            <div className="sm:flex-2 p-10 sm:py-0">
              <ul>
                <li className="">
                  <p className="text-md text-white sm:text-xl">
                    <span>Direccion:</span> {address}
                  </p>
                </li>
                <li className="mt-4">
                  <p className="text-md text-white sm:text-xl">
                    <span>Informacion extra:</span> {description}
                  </p>
                </li>
                <li className="mt-4">
                  <p className="text-md text-white sm:text-xl">
                    <span>Telefono:</span> {phoneMain}
                  </p>
                </li>
                <li className="mt-4">
                  <p className="text-md text-white sm:text-xl">
                    <span>Telefono secundario:</span> {phoneSecondary}
                  </p>
                </li>
                <li className="mt-4">
                  <p className="text-md text-white sm:text-xl">
                    <span>Horario de apertura:</span>
                  </p>
                </li>
                <ul>
                  {schedules?.map((slot) => (
                    <li key={slot.day} className="mb-0.5">
                      <span className="text-lg text-white">{slot.day}:</span>
                      <span className="text-lg text-white ml-2">
                        {slot.availability ?? (
                          <span className="text-orange-500"> Cerrado </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1518.1917175293722!2d-3.6161087017516556!3d40.44464964424175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422fa5bf86a4dd%3A0x28c23634ca08de3f!2sC.%20Alcal%C3%A1%2C%20573%2C%20San%20Blas-Canillejas%2C%2028022%20Madrid%2C%20Spain!5e0!3m2!1sen!2sfr!4v1771016881177!5m2!1sen!2sfr"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter(
        (blog): blog is BlogData & { slug: string } =>
          Boolean((blog as { slug?: string } | null)?.slug),
      )
    : [];

  return filteredBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}
