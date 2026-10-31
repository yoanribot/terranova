import Image from "next/image";
import { ArrowDown, ArrowRight, ChevronRight, Clock3, HeartHandshake, MapPin, Phone, SearchCheck, Info } from "lucide-react";
import styles from "./DynamicPage.module.css";
import { RichTextDocument } from "@/types/RichText";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import BlockRendererClient from "../shared/BlockRender/BlockRendererClient";
import Link from "@/components/PageLink";
import ServiceIcon from "@/components/ServiceGuide/ServiceIcon";
import { getServiceArtwork, getServiceGuide } from "@/lib/service-guides";
import ClinicMap from "@/components/Map/ClinicMap";
import { isPracticalService } from "@/lib/service-categories";
import InsurancePartners from "@/components/ServiceGuide/InsurancePartners";

type DynamicPageProps = {
  title: string;
  content: RichTextDocument;
  backgroundImage?: { url: string };
  images?: { url: string; alternativeText?: string }[];
  address?: string;
  description?: string;
  phoneMain?: string;
  phoneSecondary?: string;
  schedules?: { day: string; availability?: string }[];
  children?: React.ReactNode;
  parent?: { href: string; label: string };
  serviceSlug?: string;
};

export default function DynamicPage({
  title, content, backgroundImage, images, address, description,
  phoneMain, phoneSecondary, schedules, children, parent, serviceSlug,
}: DynamicPageProps) {
  const guide = serviceSlug ? getServiceGuide(serviceSlug) : undefined;
  const artwork = serviceSlug ? getServiceArtwork(serviceSlug) : undefined;
  const heroImage = artwork?.url || backgroundImage?.url;
  const telephone = phoneMain?.replace(/[^+\d]/g, "");
  const isService = Boolean(serviceSlug);
  const practical = isPracticalService(serviceSlug);
  const isImaging = serviceSlug === "cbct-dental";
  const primaryLabel = serviceSlug === "financiaciones" ? "Consultar financiación" : serviceSlug === "aseguradora" ? "Consultar mi seguro" : isImaging ? "Pedir una valoración" : practical ? "Consultar opciones" : "Consultar mi caso";

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <nav aria-label="Ruta de navegación" className={styles.breadcrumb}>
          <Link href="/">Inicio</Link><ChevronRight size={14} aria-hidden="true" />
          {parent ? <><Link href={parent.href}>{parent.label}</Link><ChevronRight size={14} aria-hidden="true" /></> : null}
          <span aria-current="page">{title}</span>
        </nav>

        <header className={isService ? styles.hero : styles.legalHero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{practical ? "Organiza tu visita, con información clara" : isService ? "Tu salud, con información clara" : "Información de Terranova"}</p>
            {serviceSlug ? <span className={styles.treatmentMark}><ServiceIcon slug={serviceSlug} size={28} /></span> : null}
            <h1>{title}</h1>
            {guide ? <p className={styles.lead}>{guide.intro || guide.description}</p> : null}
            {isService ? <div className={styles.heroActions}>
              <a href="#consulta" className={styles.primaryAction}>{primaryLabel} <ArrowRight size={18} aria-hidden="true" /></a>
              <a href="#informacion" className={styles.textAction}>{practical ? "Ver la información" : isImaging ? "Conocer las pruebas" : "Entender el tratamiento"} <ArrowDown size={17} aria-hidden="true" /></a>
            </div> : null}
          </div>
          {isService && heroImage ? <figure className={styles.heroVisual}>
            <Image src={heroImage} alt="" fill priority sizes="(min-width: 1240px) 550px, (max-width: 760px) calc(100vw - 36px), 48vw" className={`${styles.heroImage} ${serviceSlug === "aseguradora" ? styles.insurancePoster : ""}`} />
            <figcaption><span className={styles.captionDot} />{serviceSlug === "aseguradora" ? "Compañías y redes con las que trabajamos" : serviceSlug === "financiaciones" ? "Terranova Clinica Dental" : isImaging ? "Imagen orientativa de radiografía dental" : "Imagen orientativa del tratamiento"}</figcaption>
          </figure> : null}
        </header>

        {guide?.highlights?.length ? <section aria-label={practical ? "La información de un vistazo" : isImaging ? "Las pruebas de un vistazo" : "El tratamiento de un vistazo"} className={styles.highlights}>
          {guide.highlights.map((item, index) => {
            const Icon = [SearchCheck, Info, HeartHandshake][index % 3];
            return <div key={item.title} className={styles.highlight}><span className={styles.highlightIcon}><Icon size={23} aria-hidden="true" strokeWidth={1.7} /></span><div><h2>{item.title}</h2><p>{item.text}</p></div></div>;
          })}
        </section> : null}

        {isService ? <nav aria-label="Contenido de esta página" className={styles.contentsNav}>
          <span>En esta página</span><a href="#informacion">Lo esencial</a>
          {guide?.insurers?.length ? <a href="#aseguradoras-listado">Compañías y redes</a> : null}
          {guide?.steps?.length ? <a href="#paso-a-paso">Paso a paso</a> : null}
          {guide ? <a href="#antes-de-decidir">Antes de decidir</a> : null}
          {guide?.faq?.length ? <a href="#preguntas-frecuentes">Dudas frecuentes</a> : null}
        </nav> : null}

        {guide?.insurers?.length ? <InsurancePartners partners={guide.insurers} /> : null}
        <article className={isService ? styles.article : styles.legalArticle}>
          <div id="informacion" className={styles.reading}>
            {isService ? <p className={styles.eyebrow}>Lo esencial, sin complicaciones</p> : null}
            <BlockRendererClient content={content} />
          </div>
          {children}
        </article>

        {images?.length ? <section className={styles.gallery} aria-label="Imágenes orientativas del tratamiento">{images.map((image, index) => <figure key={image.url}><Image src={image.url} alt={image.alternativeText || `Imagen orientativa ${index + 1} de ${title.toLowerCase()}`} width={960} height={640} sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>{image.alternativeText || title}</figcaption></figure>)}</section> : null}
      </div>

      {isService ? <section id="consulta" className={styles.contact} aria-labelledby="consulta-heading">
        <header className={styles.contactHeading}>
          <div><p className={styles.eyebrow}>El siguiente paso</p>
            <h2 id="consulta-heading">{serviceSlug === "aseguradora" ? <>Te ayudamos a<br />preparar tu visita.</> : <>Tu caso merece<br />una conversación.</>}</h2>
          </div>
          <p className={styles.contactIntro}>Cuéntanos qué necesitas para organizar tu visita. Puedes escribirnos, llamarnos o consultar cómo llegar a la clínica.</p>
        </header>
        <div className={styles.contactInner}>
          <div className={styles.contactLocation}>
            <ClinicMap />
            <div className={styles.locationDetails}>
            <h3>Terranova Clinica Dental</h3>
            <ul className={styles.contactDetails}>
              {address ? <li><MapPin size={21} aria-hidden="true" /><span>{address}<small>{description}</small></span></li> : null}
              {phoneMain ? <li><Phone size={21} aria-hidden="true" /><a href={`tel:${telephone}`}>{phoneMain}</a></li> : null}
              {phoneSecondary ? <li><Phone size={21} aria-hidden="true" /><a href={`tel:${phoneSecondary.replace(/[^+\d]/g, "")}`}>{phoneSecondary}</a></li> : null}
            </ul>
            {schedules?.length ? <details className={styles.hours}><summary><Clock3 size={19} aria-hidden="true" />Consultar horarios</summary><dl>{schedules.map(slot => <div key={slot.day}><dt>{slot.day}</dt><dd>{slot.availability || "Cerrado"}</dd></div>)}</dl></details> : null}
            </div>
          </div>
          <ContactForm financing={serviceSlug === "financiaciones"} insurance={serviceSlug === "aseguradora"} />
        </div>
      </section> : null}
      {!isService ? <div className={styles.legalMap}><ClinicMap /></div> : null}
    </div>
  );
}
