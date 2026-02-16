import sharedStyles from "@/app/shared.module.css";
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
    <section id="about-us" className={sharedStyles.container}>
      <SectionTitle title={title} />

      <div className="flex gap-12 justify-center">
        <div className="flex-3 h-100 hidden sm:block">
          {image && (
            <img
              src={getStrapiMedia(image.url)}
              alt={image.alternativeText || title}
              className="h-full object-cover"
            />
          )}
        </div>
        <RichTextRenderer
          content={text as RichTextDocument}
          className="flex-5 p-3 text-balance"
        />
      </div>
    </section>
  );
};

export default AboutUs;
