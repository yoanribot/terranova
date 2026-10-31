import Image from "next/image";
import { ArrowRight, BookOpen, Check, ChevronDown, ClipboardList, ExternalLink, MessageCircle, SearchCheck } from "lucide-react";
import Link from "@/components/PageLink";
import { getServiceArtwork, getServiceGuide } from "@/lib/service-guides";
import { getServiceBySlug } from "@/lib/content";
import ServiceIcon from "./ServiceIcon";
import styles from "./ServiceGuide.module.css";

export default function ServiceGuide({ slug }: { slug: string }) {
  const guide = getServiceGuide(slug);
  if (!guide) return null;
  const relatedServices = guide.related.map(related => getServiceBySlug(related)).filter(page => page !== undefined);

  return (
    <div className={styles.guide}>
      {guide.steps?.length ? <section id="paso-a-paso" aria-labelledby="pasos-heading" className={styles.process}>
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Conocer el recorrido ayuda</p><h2 id="pasos-heading">Paso a paso, contigo.</h2><p>Un recorrido orientativo. Tu profesional te explicará qué pasos necesita tu caso.</p></div>
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
        <div><h2 id="fuentes-heading">Fuentes y alcance de esta información</h2><p>Información general de Terranova Clinica Dental. No sustituye una valoración individual ni constituye un plan de tratamiento.</p><ul>{guide.sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer" target="_blank">{source.label}<ExternalLink size={14} aria-hidden="true" /><span className="sr-only"> (se abre en otra pestaña)</span></a></li>)}</ul><p>Estas fuentes explican aspectos generales; no verifican los servicios ni los resultados de esta clínica. <Link href="/informacion-editorial">Responsabilidad, fuentes y correcciones</Link>.</p></div>
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
