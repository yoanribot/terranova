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
import { ContactForm } from "@/components/ContactForm/ContactForm";

export default async function Home() {
  const data = await getHomepage();
  const sections = data?.sections || [];

  const heroData = (sections[0] as Hero | undefined) || ({} as Hero);
  const aboutUsData =
    (sections[1] as AboutUsData | undefined) || ({} as AboutUsData);
  const servicesData =
    (sections[2] as ServiceSection | undefined) || ({} as ServiceSection);
  const locationData =
    (sections[3] as LocationSection | undefined) || ({} as LocationSection);
  const teamData =
    (sections[4] as TeamSection | undefined) || ({} as TeamSection);

  return (
    <>
      <HeroBanner {...heroData} />

      <div className="w-full bg-[#708f67]">
        <AboutUs
          title={aboutUsData?.title}
          text={aboutUsData?.text}
          image={aboutUsData?.image}
        />
      </div>

      <OurServices
        title={servicesData?.title}
        services={servicesData?.services}
      />

      {/* <OurTeam title={teamData?.title} members={teamData?.members} /> */}

      <MapWrapper locationData={locationData} />

      <div className="w-full bg-[#708f67]">
        <div id="contact" className="w-full p-4 md:py-12 max-w-3xl m-auto">
          <ContactForm />
        </div>
      </div>

      {/* <Testimonials />*/}
    </>
  );
}
