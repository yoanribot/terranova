import Link from "@/components/PageLink";

export default function NotFound() {
  return <div className="patient-page patient-reading"><p className="patient-eyebrow">Error 404</p><h1>No encontramos esta página.</h1><p>La dirección puede haber cambiado o no existir. Puedes consultar los tratamientos o volver al inicio para encontrar la información de contacto.</p><p><Link href="/servicios">Ver tratamientos</Link> · <Link href="/pacientes">Prepara tu visita</Link> · <Link href="/">Volver al inicio</Link></p></div>;
}
