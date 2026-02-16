import sharedStyles from "@/app/shared.module.css";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import Card from "../shared/Card/Card";
import { Service } from "@/types/data";

const OurServices = ({
  title,
  services,
}: {
  title: string;
  services: Service[];
}) => {
  console.log({ services });

  return (
    <section id="services" className={sharedStyles.container}>
      <SectionTitle title={title} />

      <section className="flex gap-6 flex-wrap justify-center">
        {services?.map((service) => {
          const imagePath = service.image?.url
            ? service.image.url
            : "/services/estetica-dental-servicio.jpg";

          return (
            <Card
              key={service.title}
              title={service.title}
              description={service.text}
              imagePath={imagePath}
              slug={service.slug}
            />
          );
        })}
      </section>
    </section>
  );
};

export default OurServices;
