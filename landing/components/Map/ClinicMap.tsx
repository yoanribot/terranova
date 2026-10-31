"use client";

import Image from "next/image";
import Link from "@/components/PageLink";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useConsent } from "@/components/CookieConsent/ConsentProvider";
import styles from "./ClinicMap.module.css";

const directions = "https://www.google.com/maps/dir/?api=1&destination=Calle+Alcala+573+Madrid";
const embed = "https://www.google.com/maps?q=Calle%20Alcal%C3%A1%20573%2C%2028022%20Madrid&output=embed&hl=es&z=16";

export default function ClinicMap() {
  const { preferences, save } = useConsent();
  return (
    <figure className={styles.map}>
      {preferences.maps ? <iframe className={styles.viewport} src={embed} title="Mapa de Terranova Clinica Dental, Calle Alcalá 573, Madrid" width="100%" height="360" loading="lazy" allowFullScreen referrerPolicy="no-referrer" /> : <div className={`${styles.viewport} ${styles.placeholder}`} data-map-placeholder>
        <Image src="/content/media/terranova-clinica-dental-oficina.webp" alt="" fill sizes="(max-width: 760px) 100vw, 70vw" className={styles.preview} />
        <div className={styles.permission}><MapPin size={27} aria-hidden="true" /><h3>Encuéntranos en Google Maps</h3><p>Para mostrar el mapa, Google recibe datos como tu dirección IP y puede utilizar cookies. Actívalo solo si lo deseas.</p><button type="button" onClick={() => save({ ...preferences, maps: true })}>Permitir Google Maps <ArrowUpRight size={17} aria-hidden="true" /></button><Link href="/terminos/politica-cookies">Información sobre cookies</Link></div>
      </div>}
      <figcaption><span><MapPin size={17} aria-hidden="true" />Calle Alcalá, 573 · Madrid</span><a href={directions} target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre Google Maps en otra pestaña)</span></a></figcaption>
    </figure>
  );
}
