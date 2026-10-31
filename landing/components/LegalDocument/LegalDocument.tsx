import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Cookie, FileText, List, Mail, MapPin, Phone, Shield } from "lucide-react";
import Link from "@/components/PageLink";
import ClinicMap from "@/components/Map/ClinicMap";
import BlockRenderer from "@/components/shared/BlockRender/BlockRendererClient";
import { getMetadata } from "@/lib/content";
import { groupLegalContent, legalBlockText, legalDocuments, type LegalDocumentInfo, type LegalSection } from "@/lib/legal-documents";
import type { RichTextDocument } from "@/types/RichText";
import styles from "./LegalDocument.module.css";

export function LegalIcon({ icon, size = 24 }: { icon: LegalDocumentInfo["icon"]; size?: number }) {
  const Icon = icon === "privacy" ? Shield : icon === "cookies" ? Cookie : FileText;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}

function SectionContent({ section }: { section: LegalSection }) {
  const fields = section.content.map(block => ({ block, match: legalBlockText(block).match(/^(Nombre de dominio|Nombre comercial|Nombre de la clínica|Dirección de la clínica|Teléfono|e-mail|Correo electrónico):\s*(.+)$/) }));
  if (fields.length && fields.every(field => field.match)) {
    return <dl className={styles.facts}>{fields.map(({ match }) => {
      const [, label, value] = match!;
      const href = /e-mail|Correo electrónico/.test(label) ? `mailto:${value}` : label === "Teléfono" ? `tel:${value.replace(/[^+\d]/g, "")}` : label === "Nombre de dominio" ? `https://${value}` : undefined;
      return <div key={label}><dt>{label}</dt><dd>{href ? <a href={href}>{value}</a> : value}</dd></div>;
    })}</dl>;
  }
  return <BlockRenderer content={section.content} />;
}

export function LegalLocation() {
  const location = getMetadata().sections[0];
  return <section className={styles.location} aria-labelledby="legal-location-title">
    <div className={styles.locationHeading}><div><p className={styles.eyebrow}>Terranova Clinica Dental</p><h2 id="legal-location-title">También puedes encontrarnos aquí.</h2></div><p><MapPin size={18} aria-hidden="true" />{location.address}</p></div>
    <ClinicMap />
  </section>;
}

export default function LegalDocument({ document, content }: { document: LegalDocumentInfo; content: RichTextDocument }) {
  const { intro, sections } = groupLegalContent(content, document.title);
  const location = getMetadata().sections[0];
  return <div className={styles.page}>
    <div className={styles.shell}>
      <nav aria-label="Ruta de navegación" className={styles.breadcrumb}><Link href="/">Inicio</Link><ChevronRight size={14} aria-hidden="true" /><Link href="/terminos">Información legal</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{document.label}</span></nav>
      <header className={styles.hero}>
        <div><p className={styles.eyebrow}>Información del sitio</p><h1>{document.title}</h1><p className={styles.lead}>{document.description}</p></div>
        <span className={styles.heroIcon}><LegalIcon icon={document.icon} size={64} /></span>
      </header>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav className={styles.documentNav} aria-label="Documentos legales"><p className={styles.navHeading}>Documentos</p>{legalDocuments.map(item => <Link key={item.slug} href={`/terminos/${item.slug}`} aria-current={document.slug === item.slug ? "page" : undefined}><LegalIcon icon={item.icon} size={19} /><span>{item.label}</span><ChevronRight size={15} aria-hidden="true" /></Link>)}</nav>
          {sections.length ? <details className={styles.contents}><summary><List size={19} aria-hidden="true" /><span>En esta página</span><ChevronDown size={17} aria-hidden="true" /></summary><nav aria-label="Apartados del documento"><ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span aria-hidden="true">{String(index + 1).padStart(2,"0")}</span>{section.title}</a></li>)}</ol></nav></details> : null}
          <div className={styles.contactNote}><p>¿Necesitas contactar?</p><a href={`mailto:${location.email}`}><Mail size={16} aria-hidden="true" /><span>{location.email}</span></a><a href={`tel:${location.phoneMain.replace(/[^+\d]/g, "")}`}><Phone size={16} aria-hidden="true" />{location.phoneMain}</a></div>
        </aside>
        <article className={styles.article} aria-label={document.title}>
          <div className={styles.articleTop}><span><LegalIcon icon={document.icon} size={16} />{document.label}</span><span>{sections.length} apartados</span></div>
          {intro.length ? <div className={styles.intro}><BlockRenderer content={intro} /></div> : null}
          {sections.map((section, index) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className={styles.section}><div className={styles.sectionTitle}><span aria-hidden="true">{String(index + 1).padStart(2,"0")}</span><h2 id={`${section.id}-title`}>{section.title}</h2></div><SectionContent section={section} /></section>)}
          <a href="#main-content" className={styles.backTop}>Volver al principio <ArrowLeft size={16} aria-hidden="true" /></a>
        </article>
      </div>
      <nav className={styles.related} aria-label="Otros documentos legales"><p className={styles.eyebrow}>Consulta también</p><div>{legalDocuments.filter(item => item.slug !== document.slug).map(item => <Link key={item.slug} href={`/terminos/${item.slug}`}><LegalIcon icon={item.icon} size={24} /><span><strong>{item.title}</strong><span>{item.description}</span></span><ArrowRight size={19} aria-hidden="true" /></Link>)}</div></nav>
      <LegalLocation />
    </div>
  </div>;
}
