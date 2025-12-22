import { siteConfig } from "@/app/config/data";
import sharedStyles from "@/app/shared.module.css";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import Card from "../shared/Card/Card";

const { title, items } = siteConfig.teamMembers;

const OurTeam = () => {
  return (
    <section className={sharedStyles.container}>
      <SectionTitle title={title} />

      <section className="flex gap-6 flex-wrap">
        {items.map((item) => (
          <Card
            key={item.title}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </section>
    </section>
  );
};

export default OurTeam;
