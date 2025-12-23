import sharedStyles from "@/app/shared.module.css";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import Card from "../shared/Card/Card";
import { Services } from "@/types/data";
import { API_BASE_URL } from "@/lib/constants";

const OurServices = ({
  title,
  services,
}: {
  title: string;
  services: Services[];
}) => {
  console.log(services);

  return (
    <section className={sharedStyles.container}>
      <SectionTitle title={title} />

      <section className="flex gap-6 flex-wrap">
        {services.map((service) => {
          const imagePath = service.image?.url
            ? `${API_BASE_URL}${service.image.url}`
            : "/services/estetica-dental-servicio.jpg";

          return (
            <Card
              key={service.title}
              title={service.title}
              description={service.text}
              imagePath={imagePath}
            />
          );
        })}
      </section>
    </section>
  );
};

export default OurServices;
