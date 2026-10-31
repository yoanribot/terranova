import HeroBanner from "@/components/HeroBanner/HeroBanner";
import OurServices from "@/components/OurServices/OurServices";
import { AboutUsData, Hero, LocationSection, ServiceSection } from "@/types/data";
import { getHomepage } from "@/lib/content";
import MapWrapper from "@/components/Map/MapWrapper";
import AboutUs from "@/components/AboutUs/AboutUs";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import Link from "@/components/PageLink";
import { ArrowUpRight, ClipboardList, Printer, CircleCheck, Phone } from "lucide-react";
import styles from "./Home.module.css";
import GoogleReviews from "@/components/GoogleReviews/GoogleReviews";

export default function Home() {
  const sections = getHomepage()?.sections || [];
  const hero = (sections[0] as Hero | undefined) || ({} as Hero);
  const about = (sections[1] as AboutUsData | undefined) || ({} as AboutUsData);
  const services = (sections[2] as ServiceSection | undefined) || ({} as ServiceSection);
  const location = (sections[3] as LocationSection | undefined) || ({} as LocationSection);

  return (
    <>
      <HeroBanner {...hero} />
      <AboutUs {...about} />
      <OurServices {...services} />
      <section className={styles.preparation} aria-labelledby="preparation-title">
        <div className={styles.preparationCopy}><p className="patient-eyebrow">Antes de tu visita</p><h2 id="preparation-title">Tus preguntas también<br />forman parte del cuidado.</h2><p>Una primera consulta, un presupuesto o una revisión. Prepara una lista sencilla para no dejarte nada importante.</p><Link href="/pacientes">Preparar mi visita <ArrowUpRight size={19} aria-hidden="true" /></Link></div>
        <ol className={styles.preparationSteps}>
          <li><ClipboardList aria-hidden="true" /><div><h3>Elige el motivo de la visita</h3><p>Encuentra los pasos que encajan contigo y añade las comprobaciones de tu seguro, si lo necesitas.</p></div><span aria-hidden="true">01</span></li>
          <li><CircleCheck aria-hidden="true" /><div><h3>Marca lo que ya tienes listo</h3><p>Reúne tus dudas sobre opciones, presupuesto y seguimiento. Sin registros ni envío de datos.</p></div><span aria-hidden="true">02</span></li>
          <li><Printer aria-hidden="true" /><div><h3>Lleva tu lista a la consulta</h3><p>Consúltala en el móvil, descárgala o imprímela para conversar con el profesional.</p></div><span aria-hidden="true">03</span></li>
        </ol>
      </section>
      <GoogleReviews />
      <MapWrapper locationData={location} />
      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className={styles.contactInner}>
          <div className={styles.contactCopy}><p className={styles.eyebrow}>Estamos para escucharte</p><h2 id="contact-title">El primer paso<br />es hablar.</h2><p>Consulta disponibilidad, pide una primera visita o resuelve una duda sobre tu cita. Para cuestiones médicas, habla directamente con el profesional.</p><a href={`tel:${location.phoneMain?.replace(/\s/g, "")}`}><Phone size={21} aria-hidden="true" /><span><small>También puedes llamarnos</small>{location.phoneMain}</span></a><div className={styles.contactNote}>El envío del formulario no confirma una reserva. La clínica contactará contigo para acordar los detalles.</div></div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
