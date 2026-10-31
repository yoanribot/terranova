import Image from "next/image";
import Link from "@/components/PageLink";
import { ArrowUpRight, HeartPulse, Smile, ShieldCheck, Sparkles } from "lucide-react";
import { Service } from "@/types/data";
import styles from "./OurServices.module.css";
import { isPracticalService } from "@/lib/service-categories";

const summaries: Record<string, string> = {
  "implantologia-dental": "Conoce las opciones para reponer dientes, los pasos de la cirugía y el mantenimiento.",
  endodoncia: "Entiende cómo se trata el interior del diente y qué reconstrucción puede necesitar después.",
  periodoncia: "Aprende a cuidar las encías y a distinguir una limpieza de un tratamiento periodontal.",
  "carillas-dentales": "Compara materiales, preparación del diente y alternativas para cambiar tu sonrisa.",
  blanqueamiento: "Descubre qué puede aclarar el tratamiento, sus límites y la posible sensibilidad.",
  "estetica-facial": "Infórmate sobre los procedimientos, los riesgos y las preguntas que conviene hacer.",
  "ortodoncia-invisible": "Revisa cómo funcionan los alineadores, sus controles y el compromiso de uso.",
  "ortodoncia-fija": "Conoce el proceso con brackets, los cuidados diarios y la fase de retención.",
  odontopediatria: "Prepara la visita infantil y resuelve dudas de prevención y cuidado en casa.",
  protesis: "Compara soluciones fijas y removibles y qué esperar durante la adaptación.",
  bruxismo: "Distingue el bruxismo de los problemas de mandíbula y conoce los límites del tratamiento.",
  aseguradora: "Comprueba tu cuadro médico, coberturas y posibles gastos antes de pedir cita.",
  financiaciones: "Consulta las opciones de pago en cuotas y sus condiciones antes de solicitar financiación.",
  "cbct-dental": "Conoce el diagnóstico dental 3D, el escaneado intraoral y los pasos para planificar tu tratamiento.",
};
const categories = [
  { title: "Cuidar y conservar", text: "Prevención, encías y salud dental", icon: ShieldCheck },
  { title: "Recuperar la función", text: "Soluciones para cada necesidad", icon: HeartPulse },
  { title: "Alinear tu sonrisa", text: "Opciones de ortodoncia", icon: Smile },
  { title: "Valorar un cambio", text: "Estética con información", icon: Sparkles },
];

export default function OurServices({ services }: { title: string; services: Service[] }) {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.heading}><div><p className="patient-eyebrow">Información para elegir</p><h2 id="services-title">Un cuidado para cada<br />etapa de tu sonrisa.</h2></div><p>Qué es cada tratamiento, cuándo se valora y qué preguntas hacer. Empieza por lo que necesitas entender.</p></div>
      <ul className={styles.categories}>{categories.map(({ title, text, icon: Icon }) => <li key={title}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><div><strong>{title}</strong><span>{text}</span></div></li>)}</ul>
      <div className={styles.grid}>{services?.map(service => <Link key={service.slug} href={`/servicios/${service.slug}`} className={styles.card}>
        <div className={styles.imageWrap}><Image src={service.image?.url || "/assets/teeth_black_white.png"} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" className={styles.image} /></div>
        <div className={styles.cardCopy}><div className={styles.cardHeading}><h3>{service.title}</h3><ArrowUpRight size={20} aria-hidden="true" /></div><p>{summaries[service.slug] || service.text}</p><span className={styles.readMore}>{isPracticalService(service.slug) ? "Ver opciones" : service.slug === "cbct-dental" ? "Conocer las pruebas" : "Conocer el tratamiento"}</span></div>
      </Link>)}</div>
      <div className={styles.footer}><span>¿No sabes por dónde empezar?</span><Link href="/pacientes">Prepara tu primera visita <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    </section>
  );
}
