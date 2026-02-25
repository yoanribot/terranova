import styles from "./AboutUs.module.css";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import { getStrapiMedia } from "@/lib/utils";
import { RichTextRenderer } from "../shared/BlockRender/RichText";
import { RichTextDocument } from "@/types/RichText";

type AboutUsProps = {
  title: string;
  text: RichTextDocument;
  image?: { url: string; alternativeText?: string };
};

const AboutUs = ({ title, text, image }: AboutUsProps) => {
  return (
    <section id="about-us" className="relative">
      <div className={styles.header}>
        <div className="container">
          <SectionTitle
            title={title}
            subtitle="Un equipo dedicado a la salud de su sonrisa"
            withMarginTop={false}
          />
        </div>
      </div>

      <div className="container">
        <div className={`flex gap-10 xl:gap-20 justify-center sm:p-10`}>
          <div className="flex-3 hidden lg:block">
            {image && (
              <img
                src={getStrapiMedia(image.url)}
                alt={image.alternativeText || title}
                className="w-full h-full object-cover max-h-130 rounded-lg shadow-lg"
              />
            )}
          </div>

          <div className="flex-5 p-3 text-balance m-auto text-6xl">
            <RichTextRenderer content={text as RichTextDocument} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
