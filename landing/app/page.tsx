import HeroBanner from "@/components/HeroBanner/HeroBanner";
import OurServices from "@/components/OurServices/OurServices";
import OurTeam from "@/components/OurTeam/OurTeam";
import { Hero } from "@/types/data";
import { getHomepage } from "@/lib/strapi";
import MapWrapper from "@/components/Map/MapWrapper";

export default async function Home() {
  const data = await getHomepage();

  const heroData = data?.sections?.[0] as Hero;

  return (
    <>
      <HeroBanner {...heroData} />
      <OurServices />
      <OurTeam />
      <MapWrapper />
      {/* <Testimonials />
      <ContactForm /> */}
    </>
  );
}
