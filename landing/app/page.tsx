import HeroBanner from "@/components/HeroBanner/HeroBanner";
import OurServices from "@/components/OurServices/OurServices";
import OurTeam from "@/components/OurTeam/OurTeam";
import { Hero, Services } from "@/types/data";
import { getHomepage } from "@/lib/strapi";
import MapWrapper from "@/components/Map/MapWrapper";

export default async function Home() {
  const data = await getHomepage();

  console.log(data);

  const heroData = data?.sections?.[0] as Hero;
  const servicesData = data?.sections?.[1];

  console.log({ servicesData });

  return (
    <>
      <HeroBanner {...heroData} />
      <OurServices
        title={servicesData?.title}
        services={servicesData?.services as Services[]}
      />
      <OurTeam />
      <MapWrapper />
      {/* <Testimonials />
      <ContactForm /> */}
    </>
  );
}
