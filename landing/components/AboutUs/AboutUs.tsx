import sharedStyles from "@/app/shared.module.css";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import { getStrapiMedia } from "@/lib/utils";

type AboutUsProps = {
  title: string;
  text: string;
  image?: { url: string; alternativeText?: string };
};

const AboutUs = ({ title, text, image }: AboutUsProps) => {
  return (
    <section id="about-us" className={sharedStyles.container}>
      <SectionTitle title={title} />

      <div className="flex gap-24 justify-center">
        <p className="flex-1 p-3 text-xl text-balance">{text}</p>

        <div className="flex-1 h-100">
          {image && (
            <img
              src={getStrapiMedia(image.url)}
              alt={image.alternativeText || title}
              className="h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
