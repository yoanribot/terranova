import { ArrowUpRight, MapPin, Phone, TrainFront, Clock3 } from "lucide-react";
import { LocationSection } from "@/types/data";
import styles from "./Map.module.css";
import ClinicMap from "./ClinicMap";

type MapSectionProps = Omit<LocationSection, "email">;

export default function Map({ phoneMain, phoneSecondary, address, description, schedules }: MapSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="location-title">
      <header className={styles.heading}><div><p className="patient-eyebrow">Nos encontrarás aquí</p><h2 id="location-title">A un paso de<br />tu próxima visita.</h2></div><p className={styles.intro}>En San Blas-Canillejas, junto al Metro Torre Arias. Comprueba el horario y contacta con la clínica para concertar tu cita.</p></header>
      <div className={styles.locationGrid}>
      <div className={styles.mapPanel}><ClinicMap /></div>
      <div className={styles.details}>
        <div className={styles.address}><span className={styles.icon}><MapPin aria-hidden="true" /></span><div><h3>Terranova Clínica Dental</h3><p>{address}</p><p className={styles.metro}><TrainFront size={16} aria-hidden="true" />{description}</p><a href="https://www.google.com/maps/dir/?api=1&destination=Calle+Alcala+573+Madrid" target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (abre Google Maps en otra pestaña)</span></a></div></div>
        <div className={styles.hours}><h3><Clock3 size={19} aria-hidden="true" />Horario de la clínica</h3><dl>{schedules?.map(slot => <div key={slot.day}><dt>{slot.day}</dt><dd>{slot.availability || "Cerrado"}</dd></div>)}</dl></div>
        <div className={styles.phones}><Phone size={20} aria-hidden="true" /><div><h3>¿Prefieres llamarnos?</h3><a href={`tel:${phoneMain?.replace(/\s/g, "")}`}>{phoneMain}</a>{phoneSecondary ? <a href={`tel:${phoneSecondary.replace(/\s/g, "")}`}>{phoneSecondary}</a> : null}</div></div>
      </div>
      </div>
    </section>
  );
}
