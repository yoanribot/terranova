import HeroBanner from "@/components/HeroBanner/HeroBanner";
import OurServices from "@/components/OurServices/OurServices";
import OurTeam from "@/components/OurTeam/OurTeam";
import {
  AboutUsData,
  Hero,
  LocationSection,
  ServiceSection,
  TeamSection,
} from "@/types/data";
import { getHomepage } from "@/lib/strapi";
import MapWrapper from "@/components/Map/MapWrapper";
import AboutUs from "@/components/AboutUs/AboutUs";

export default async function Home() {
  const data = await getHomepage();

  console.log({ data });

  const heroData = data?.sections?.[0] as Hero;
  const aboutUsData = data?.sections?.[1] as AboutUsData;
  const servicesData = data?.sections?.[1] as ServiceSection;
  const locationData = data?.sections?.[3] as LocationSection;
  const teamData = data?.sections?.[4] as TeamSection;

  return (
    <>
      {/* <HeroBanner {...heroData} />

      <AboutUs
        title={aboutUsData?.title}
        text={aboutUsData?.text}
        image={aboutUsData?.image}
      /> */}

      <OurServices
        title={servicesData?.title}
        services={servicesData?.services}
      />
      {/*
      <OurTeam title={teamData?.title} members={teamData?.members} />

      <MapWrapper locationData={locationData} /> */}

      {/* <Testimonials />
      <ContactForm /> */}
    </>
  );
}
