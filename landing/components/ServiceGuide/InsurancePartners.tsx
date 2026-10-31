import Image from "next/image";
import { ArrowRight, CircleHelp, ExternalLink, ShieldCheck } from "lucide-react";
import type { ServicePartner } from "@/lib/service-guides";
import styles from "./InsurancePartners.module.css";

export default function InsurancePartners({ partners }: { partners: ServicePartner[] }) {
  return <section id="aseguradoras-listado" className={styles.section} aria-labelledby="insurance-partners-title">
    <header className={styles.heading}>
      <div><p className={styles.eyebrow}><ShieldCheck size={17} aria-hidden="true" />Seguros y redes dentales</p><h2 id="insurance-partners-title">Compañías y redes<br />con las que trabajamos.</h2></div>
      <div><p>Busca tu compañía y dinos qué seguro tienes contratado. Te ayudaremos a preparar la consulta sobre tu cobertura y a organizar la visita.</p><p className={styles.note}>Las prestaciones, autorizaciones e importes dependen de tu póliza y del tratamiento. El nombre de la compañía no determina por sí solo qué está incluido.</p></div>
    </header>
    <div className={styles.grid}>
      {partners.map(partner => <article key={partner.name} className={styles.card}>
        <div className={styles.logo} style={partner.logoBackground ? { backgroundColor: partner.logoBackground } : undefined}><Image src={partner.logo} alt="" width={190} height={60} /></div>
        <h3>{partner.name}</h3><p>{partner.summary}</p>
        <a href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={`Información oficial de ${partner.name}, se abre en otra pestaña`}>Información oficial <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (se abre en otra pestaña)</span></a>
      </article>)}
      <article className={`${styles.card} ${styles.helpCard}`}><CircleHelp size={31} strokeWidth={1.5} aria-hidden="true" /><h3>¿Tu seguro no aparece?</h3><p>Pregúntanos antes de descartar tu visita. Te orientamos sobre la información que conviene confirmar con tu compañía y las opciones disponibles.</p><a href="#consulta">Consultar mi seguro <ArrowRight size={17} aria-hidden="true" /></a></article>
    </div>
  </section>;
}
