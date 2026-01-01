import HeroBanner from "@/components/HeroBanner/HeroBanner";
import OurServices from "@/components/OurServices/OurServices";
import OurTeam from "@/components/OurTeam/OurTeam";
import {
  Hero,
  LocationSection,
  Member,
  Service,
  ServiceSection,
  TeamSection,
} from "@/types/data";
import { getHomepage } from "@/lib/strapi";
import MapWrapper from "@/components/Map/MapWrapper";

export default async function Home() {
  const data = await getHomepage();

  console.log(data);

  const heroData = data?.sections?.[0] as Hero;
  const servicesData = data?.sections?.[1] as ServiceSection;
  const locationData = data?.sections?.[2] as LocationSection;
  const teamData = data?.sections?.[3] as TeamSection;

  console.log({ teamData });

  return (
    <>
      <HeroBanner {...heroData} />

      <OurServices
        title={servicesData?.title}
        services={servicesData?.services as Service[]}
      />

      <OurTeam
        title={teamData?.title}
        members={teamData?.members as Member[]}
      />

      <MapWrapper locationData={locationData} />

      {/* <Testimonials />
      <ContactForm /> */}
    </>
  );
}
