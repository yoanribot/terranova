import sharedStyles from "@/app/shared.module.css";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import Card from "../shared/Card/Card";
import { Member } from "@/types/data";

const OurTeam = ({ title, members }: { title: string; members: Member[] }) => {
  return (
    <section className={sharedStyles.container}>
      <SectionTitle title={title} />

      <section id="team" className="flex gap-6 flex-wrap justify-center">
        {members.map((member) => {
          const imagePath = member.image?.url
            ? member.image.url
            : "/team/default-team-member.jpg";

          return (
            <Card
              key={member.title}
              title={member.title}
              description={member.text}
              imagePath={imagePath}
            />
          );
        })}
      </section>
    </section>
  );
};

export default OurTeam;
