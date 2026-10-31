import HeroBanner from "@/components/HeroBanner/HeroBanner";
import OurServices from "@/components/OurServices/OurServices";
import {
  AboutUsData,
  Hero,
  LocationSection,
  ServiceSection,
} from "@/types/data";
import { getHomepage } from "@/lib/content";
import MapWrapper from "@/components/Map/MapWrapper";
import AboutUs from "@/components/AboutUs/AboutUs";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import Link from "@/components/PageLink";

export default function Home() {
  const data = getHomepage();
  const sections = data?.sections || [];

  const heroData = (sections[0] as Hero | undefined) || ({} as Hero);
  const aboutUsData =
    (sections[1] as AboutUsData | undefined) || ({} as AboutUsData);
  const servicesData =
    (sections[2] as ServiceSection | undefined) || ({} as ServiceSection);
  const locationData =
    (sections[3] as LocationSection | undefined) || ({} as LocationSection);
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

      <section className="patient-home-promo">
        <div><p className="patient-eyebrow">Antes de tu visita</p><h2>Ven con tus preguntas.<br />Decide con información.</h2></div>
        <div><p>Prepara una primera consulta, revisa qué preguntar sobre un presupuesto o comprueba tu seguro dental. Crea una lista de pasos y llévala contigo, en papel o en tu móvil.</p><Link href="/pacientes">Preparar mi visita <span aria-hidden="true">→</span></Link></div>
      </section>

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
