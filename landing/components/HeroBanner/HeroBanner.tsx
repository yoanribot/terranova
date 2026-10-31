import Image from "next/image";
import Link from "@/components/PageLink";
import { ArrowDown, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Hero } from "@/types/data";
import styles from "./HeroBanner.module.css";
import { getMetadata } from "@/lib/content";

export default function HeroBanner({ image }: Hero) {
  const phone = getMetadata().sections[0].phoneMain;
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <Image src={image?.url || "/content/media/terranova-clinica-dental-oficina.webp"} alt="" fill priority sizes="100vw" className={styles.image} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span aria-hidden="true" />Terranova Clinica Dental</p>
        <h1 id="home-title">Tu sonrisa,<br />con el cuidado<br />que merece.</h1>
        <p className={styles.intro}>Una nueva forma de cuidar tu sonrisa. Entiende tus opciones, resuelve tus dudas y prepara tu visita con información clara.</p>
        <div className={styles.actions}>
          <Link href="/#contact" className={styles.primary}>Hablemos de tu visita <ArrowUpRight size={19} aria-hidden="true" /></Link>
          <Link href="/servicios" className={styles.secondary}>Explora los tratamientos <ArrowDown size={17} aria-hidden="true" /></Link>
        </div>
        <div className={styles.practical}><span><MapPin size={16} aria-hidden="true" />Calle Alcalá, 573 · Madrid</span><a href={`tel:${phone.replace(/[^+\d]/g, "")}`}><Phone size={16} aria-hidden="true" /><span>{phone}</span></a></div>
      </div>
    </section>
  );
}
