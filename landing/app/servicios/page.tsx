import Image from "next/image";
import { ArrowRight, ChevronRight, ClipboardList } from "lucide-react";
import Link from "@/components/PageLink";
import { getServiceBySlug } from "@/lib/content";
import { getServiceArtwork, getServiceGuide } from "@/lib/service-guides";
import { generatePageMetadata } from "@/app/generateSEOMetadata";
import ServiceIcon from "@/components/ServiceGuide/ServiceIcon";
import styles from "@/components/ServiceGuide/ServiceIndex.module.css";

export const metadata = generatePageMetadata("Tratamientos e información para decidir", "Conoce los tratamientos de Terranova: explicaciones sencillas, pasos, cuidados, alternativas y preguntas para preparar tu visita dental en Madrid.", "/servicios");

const groups = [
  { id: "diagnostico", title: "Diagnóstico y odontología digital", description: "Conoce qué aportan la imagen 3D y los registros digitales a la planificación de tu caso.", slugs: ["cbct-dental"] },
  { id: "cuidar", title: "Cuidar y conservar", description: "Entiende qué ocurre en tu boca y qué opciones tienes para cuidarla.", slugs: ["endodoncia", "periodoncia", "bruxismo"] },
  { id: "recuperar", title: "Recuperar dientes", description: "Compara las formas de sustituir dientes y el mantenimiento que necesitan.", slugs: ["implantologia-dental", "protesis"] },
  { id: "sonrisa", title: "Alineación y estética", description: "Conoce los cambios posibles, sus límites y qué debes valorar antes de decidir.", slugs: ["ortodoncia-invisible", "ortodoncia-fija", "carillas-dentales", "blanqueamiento", "estetica-facial"] },
  { id: "familia", title: "Cuidado en familia", description: "Prepara las visitas de los más pequeños y sus hábitos de salud bucodental.", slugs: ["odontopediatria"] },
  { id: "seguros-financiacion", title: "Seguros y financiación", description: "Consulta tu cobertura y las opciones disponibles para organizar el pago de tu tratamiento.", slugs: ["aseguradora", "financiaciones"] },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <nav aria-label="Ruta de navegación" className={styles.breadcrumb}><Link href="/">Inicio</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Tratamientos</span></nav>
        <header className={styles.intro}>
          <div><p className={styles.eyebrow}>Tratamientos · Terranova</p><h1>Conoce tus opciones.<br /><span>Decide con calma.</span></h1><p>Cada boca necesita una valoración individual. Aquí encontrarás explicaciones claras para entender los tratamientos, comparar alternativas y llegar a consulta con tus preguntas.</p></div>
          <Link href="/pacientes" className={styles.visitCard}><ClipboardList size={30} strokeWidth={1.5} aria-hidden="true" /><span><strong>Tu visita, un poco más fácil</strong><span>Prepara una lista con lo que quieres preguntar. Puedes guardarla o imprimirla.</span><em>Preparar mi visita <ArrowRight size={17} aria-hidden="true" /></em></span></Link>
        </header>
        <nav aria-label="Explorar tratamientos por necesidad" className={styles.categories}>{groups.map(group => <a key={group.id} href={`#${group.id}`}>{group.title}<ArrowRight size={15} aria-hidden="true" /></a>)}</nav>

        {groups.map(group => <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className={styles.group}>
          <div className={styles.groupHeading}><h2 id={`${group.id}-heading`}>{group.title}</h2><p>{group.description}</p></div>
          <ul className={styles.cards}>{group.slugs.map(slug => {
            const page = getServiceBySlug(slug);
            if (!page) return null;
            const artwork = getServiceArtwork(slug);
            const guide = getServiceGuide(slug);
            return <li key={slug}><Link href={`/servicios/${slug}`} className={styles.card}>
              {artwork?.url ? <div className={styles.image}><Image src={artwork.url} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw" /></div> : null}
              <div className={styles.cardBody}><span className={styles.cardIcon}><ServiceIcon slug={slug} size={23} /></span><h3>{page.title}</h3><p>{guide?.description || "Información para entender tus opciones y preparar las preguntas de tu próxima consulta."}</p><span className={styles.cardAction}>Conocer las opciones <ArrowRight size={18} aria-hidden="true" /></span></div>
            </Link></li>;
          })}</ul>
        </section>)}

        <aside className={styles.note}><p>Esta información te ayuda a preparar la consulta. El diagnóstico y las recomendaciones se adaptan a tu situación después de una valoración profesional.</p><Link href="/informacion-editorial">Cómo preparamos el contenido <ArrowRight size={16} aria-hidden="true" /></Link></aside>
      </div>
    </div>
  );
}
