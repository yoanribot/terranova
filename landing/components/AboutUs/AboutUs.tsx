import Image from "next/image";
import { MessageCircle, ScanLine, ClipboardCheck, ArrowUpRight } from "lucide-react";
import Link from "@/components/PageLink";
import { RichTextDocument } from "@/types/RichText";
import styles from "./AboutUs.module.css";

type AboutUsProps = { title: string; text: RichTextDocument; image?: { url: string; alternativeText?: string } };

export default function AboutUs({ image }: AboutUsProps) {
  return (
    <section id="about-us" className={styles.section} aria-labelledby="about-title">
      <div className={styles.imageWrap}>{image ? <Image src={image.url} alt="Atención dental en consulta" fill sizes="(max-width: 760px) 100vw, 45vw" className={styles.image} /> : null}<span className={styles.imageCaption}>Cuidar también es escuchar.</span></div>
      <div className={styles.content}>
        <p className="patient-eyebrow">Cerca de ti, en Calle Alcalá</p>
        <h2 id="about-title">Una visita más clara.<br />Una decisión más tranquila.</h2>
        <p className={styles.intro}>Cada boca es diferente. Por eso, antes de elegir un tratamiento, necesitas entender qué ocurre, qué opciones tienes y qué implica cada una.</p>
        <ul className={styles.principles}>
          <li><MessageCircle aria-hidden="true" /><div><h3>Empieza por tus dudas</h3><p>Cuéntanos qué quieres consultar y qué necesitas para sentirte a gusto durante la visita.</p></div></li>
          <li><ScanLine aria-hidden="true" /><div><h3>Entiende la valoración</h3><p>Pregunta qué pruebas se proponen y para qué sirven. Pide que te expliquen los resultados con palabras sencillas.</p></div></li>
          <li><ClipboardCheck aria-hidden="true" /><div><h3>Valora el plan completo</h3><p>Revisa alternativas, fases, presupuesto y mantenimiento antes de decidir.</p></div></li>
        </ul>
        <Link href="/pacientes" className={styles.link}>Lleva tus preguntas preparadas <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
