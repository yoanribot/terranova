import HeroBanner from "@/components/HeroBanner/HeroBanner";
import OurServices from "@/components/OurServices/OurServices";
import OurTeam from "@/components/OurTeam/OurTeam";
import {
  Hero,
  LocationSection,
  ServiceSection,
  TeamSection,
} from "@/types/data";
import { getHomepage } from "@/lib/strapi";
import MapWrapper from "@/components/Map/MapWrapper";

export default async function Home() {
  const data = await getHomepage();

  const heroData = data?.sections?.[0] as Hero;
  const servicesData = data?.sections?.[1] as ServiceSection;
  const locationData = data?.sections?.[2] as LocationSection;
  const teamData = data?.sections?.[3] as TeamSection;

  return (
    <>
      <HeroBanner {...heroData} />

      <OurServices
        title={servicesData?.title}
        services={servicesData?.services}
      />

      <OurTeam title={teamData?.title} members={teamData?.members} />

      <MapWrapper locationData={locationData} />

      {/* <Testimonials />
      <ContactForm /> */}
    </>
  );
}
