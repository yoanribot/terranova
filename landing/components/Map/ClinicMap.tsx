import { ArrowUpRight, MapPin } from "lucide-react";
import styles from "./ClinicMap.module.css";

const directions = "https://www.google.com/maps/dir/?api=1&destination=Calle+Alcala+573+Madrid";
const embed = "https://www.google.com/maps?q=Calle%20Alcal%C3%A1%20573%2C%2028022%20Madrid&output=embed&hl=es&z=16";

export default function ClinicMap() {
  return (
    <figure className={styles.map}>
      <iframe src={embed} title="Mapa de Terranova Clinica Dental, Calle Alcalá 573, Madrid" width="100%" height="360" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      <figcaption><span><MapPin size={17} aria-hidden="true" />Calle Alcalá, 573 · Madrid</span><a href={directions} target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre Google Maps en otra pestaña)</span></a></figcaption>
    </figure>
  );
}
