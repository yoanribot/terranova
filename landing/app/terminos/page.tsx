import { ArrowUpRight, ChevronRight, Mail } from "lucide-react";
import Link from "@/components/PageLink";
import { LegalIcon, LegalLocation } from "@/components/LegalDocument/LegalDocument";
import { legalDocuments } from "@/lib/legal-documents";
import { getMetadata } from "@/lib/content";
import { generatePageMetadata } from "@/app/generateSEOMetadata";
import styles from "@/components/LegalDocument/LegalDocument.module.css";

export const metadata = generatePageMetadata(
  "Información legal",
  "Consulta el aviso legal y las políticas de privacidad y cookies de Terranova Clinica Dental.",
  "/terminos",
);

export default function LegalIndexPage() {
  const { email } = getMetadata().sections[0];
  return <div className={styles.page}>
    <div className={styles.shell}>
      <nav aria-label="Ruta de navegación" className={styles.breadcrumb}><Link href="/">Inicio</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Información legal</span></nav>
      <header className={`${styles.hero} ${styles.indexHero}`}>
        <div><p className={styles.eyebrow}>Terranova Clinica Dental</p><h1>Información legal,<br />a tu alcance.</h1><p className={styles.lead}>Consulta cómo se utiliza este sitio web y la información sobre privacidad y cookies. Elige el documento que necesitas.</p></div>
        <span className={styles.heroIcon}><LegalIcon icon="legal" size={64} /></span>
      </header>
      <nav aria-label="Documentos legales" className={styles.documentCards}>
        {legalDocuments.map((document, index) => <Link key={document.slug} href={`/terminos/${document.slug}`}>
          <div className={styles.cardTop}><span className={styles.cardIcon}><LegalIcon icon={document.icon} size={30} /></span><span className={styles.cardNumber} aria-hidden="true">0{index + 1}</span></div>
          <h2>{document.title}</h2><p>{document.description}</p><span className={styles.cardAction}>Leer documento <ArrowUpRight size={19} aria-hidden="true" /></span>
        </Link>)}
      </nav>
      <div className={styles.indexContact}><span><Mail size={22} aria-hidden="true" /></span><div><h2>¿Necesitas contactar con la clínica?</h2><p>Puedes escribirnos a <a href={`mailto:${email}`}>{email}</a>.</p></div></div>
      <LegalLocation />
    </div>
  </div>;
}
