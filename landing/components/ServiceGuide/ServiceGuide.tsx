import Image from "next/image";
import { ArrowRight, BookOpen, Check, ChevronDown, ClipboardList, ExternalLink, MessageCircle, SearchCheck } from "lucide-react";
import Link from "@/components/PageLink";
import { getServiceArtwork, getServiceGuide } from "@/lib/service-guides";
import { getServiceBySlug } from "@/lib/content";
import ServiceIcon from "./ServiceIcon";
import styles from "./ServiceGuide.module.css";
import { isPracticalService } from "@/lib/service-categories";

export default function ServiceGuide({ slug }: { slug: string }) {
  const guide = getServiceGuide(slug);
  if (!guide) return null;
  const practical = isPracticalService(slug);
  const relatedServices = guide.related.map(related => getServiceBySlug(related)).filter(page => page !== undefined);

  return (
    <div className={styles.guide}>
      {guide.partners?.length ? <section className={styles.partners} aria-labelledby="financing-partners-title"><div className={styles.sectionIntro}><p className={styles.eyebrow}>Opciones para organizar el pago</p><h2 id="financing-partners-title">Conoce las entidades y sus opciones.</h2><p>Consulta con el equipo qué alternativa está disponible para tu tratamiento. Cada operación está sujeta a evaluación y a sus propias condiciones.</p></div><div className={styles.partnerGrid}>{guide.partners.map(partner => <article key={partner.name}><div className={`${styles.partnerLogo} ${partner.name === "Findirect" ? styles.inverseLogo : ""}`}><Image src={partner.logo} alt="" width={190} height={64} /></div><h3>{partner.name}</h3><p>{partner.summary}</p><a href={partner.url} target="_blank" rel="noopener noreferrer">Información del proveedor <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (se abre en otra pestaña)</span></a></article>)}</div></section> : null}
      {guide.steps?.length ? <section id="paso-a-paso" aria-labelledby="pasos-heading" className={styles.process}>
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Conocer el recorrido ayuda</p><h2 id="pasos-heading">{slug === "financiaciones" ? "Así se solicita la financiación." : slug === "aseguradora" ? "Así te ayudamos con tu seguro." : "Paso a paso, contigo."}</h2><p>{practical ? "El equipo te explicará el procedimiento y las condiciones que se aplican a tu solicitud." : "Un recorrido orientativo. Tu profesional te explicará qué pasos necesita tu caso."}</p></div>
        <ol className={styles.steps}>{guide.steps.map((step, index) => <li key={step.title}><span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section> : null}

      <section id="antes-de-decidir" aria-labelledby="decidir-heading" className={styles.decision}>
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Una decisión informada</p><h2 id="decidir-heading">Qué conviene tener en cuenta</h2></div>
        <div className={styles.decisionGrid}>{guide.sections.map((section, index) => {
          const Icon = index % 2 === 0 ? SearchCheck : ClipboardList;
          return <section key={section.title} className={styles.decisionCard}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><h3>{section.title}</h3><p>{section.text}</p></section>;
        })}</div>
      </section>

      {guide.faq?.length ? <section id="preguntas-frecuentes" aria-labelledby="dudas-heading" className={styles.faqSection}>
        <div className={styles.faqIntro}><span className={styles.sectionIcon}><MessageCircle size={28} strokeWidth={1.5} aria-hidden="true" /></span><p className={styles.eyebrow}>Respuestas sencillas</p><h2 id="dudas-heading">Es normal tener dudas.</h2><p>Empieza por estas respuestas. En consulta podrás preguntar todo lo que necesites.</p></div>
        <div className={styles.faqList}>{guide.faq.map(item => <details key={item.question} className={styles.faq}><summary><span>{item.question}</span><ChevronDown size={19} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
      </section> : null}

      <section className={styles.consultation} aria-labelledby="preguntas-heading">
        <div><p className={styles.eyebrow}>Tu próxima consulta</p><h2 id="preguntas-heading">Llévate estas preguntas.</h2><p>No necesitas recordar todo. Apunta tus dudas y pide que te expliquen el plan con palabras que entiendas.</p><Link href="/pacientes" className={styles.plannerLink}>Preparar mi visita <ArrowRight size={17} aria-hidden="true" /></Link></div>
        <ul>{guide.questions.map(question => <li key={question}><Check size={18} aria-hidden="true" /><span>{question}</span></li>)}</ul>
      </section>

      <aside className={styles.sources} aria-labelledby="fuentes-heading">
        <BookOpen size={24} strokeWidth={1.5} aria-hidden="true" />
        <div><h2 id="fuentes-heading">Fuentes y alcance de esta información</h2><p>{practical ? "Información general de Terranova Clinica Dental. Consulta las condiciones vigentes y solicita la información por escrito antes de decidir." : "Información general de Terranova Clinica Dental. No sustituye una valoración individual ni constituye un plan de tratamiento."}</p><ul>{guide.sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer" target="_blank">{source.label}<ExternalLink size={14} aria-hidden="true" /><span className="sr-only"> (se abre en otra pestaña)</span></a></li>)}</ul><p>{practical ? "Los enlaces de los proveedores ofrecen información general. Las condiciones aplicables dependen de tu contrato o de la operación que se apruebe." : "Estas fuentes explican aspectos generales; no verifican los servicios ni los resultados de esta clínica."} <Link href="/informacion-editorial">Responsabilidad, fuentes y correcciones</Link>.</p></div>
      </aside>

      {relatedServices.length ? <nav aria-labelledby="relacionados-heading" className={styles.related}>
        <div className={styles.relatedHeader}><div><p className={styles.eyebrow}>Sigue explorando</p><h2 id="relacionados-heading">Otras opciones que puedes conocer</h2></div><Link href="/servicios">Ver todos los tratamientos <ArrowRight size={17} aria-hidden="true" /></Link></div>
        <ul>{relatedServices.map(page => {
          const artwork = getServiceArtwork(page.slug);
          return <li key={page.slug}><Link href={`/servicios/${page.slug}`} className={styles.relatedCard}>{artwork?.url ? <div className={styles.relatedImage}><Image src={artwork.url} alt="" fill sizes="(max-width: 760px) 100px, (min-width: 1240px) 550px, 50vw" /></div> : null}<span className={styles.relatedCopy}><ServiceIcon slug={page.slug} size={22} /><span>{page.title}</span><ArrowRight size={19} aria-hidden="true" /></span></Link></li>;
        })}</ul>
      </nav> : null}
    </div>
  );
}
