import Link from "@/components/PageLink";
import { getServices } from "@/lib/content";
import { getServiceGuide } from "@/lib/service-guides";
import { generatePageMetadata } from "@/app/generateSEOMetadata";

export const metadata = generatePageMetadata("Tratamientos e información para decidir", "Consulta los tratamientos de Terranova, sus limitaciones, fuentes sanitarias y preguntas que puedes llevar a tu valoración dental en Madrid.", "/servicios");

export default function ServicesPage() {
  return (
    <div className="patient-page">
      <nav aria-label="Ruta de navegación"><Link href="/">Inicio</Link> / <span aria-current="page">Tratamientos</span></nav>
      <div className="patient-intro"><p className="patient-eyebrow">Tratamientos · Terranova</p><h1>Conoce tus opciones.<br />Prepara tus preguntas.</h1><p>Cada tratamiento necesita una valoración individual. En estas páginas encontrarás información general, aspectos que conviene comparar y preguntas para entender una propuesta antes de aceptarla.</p></div>
      <ul className="treatment-index">
        {getServices().map(page => <li key={page.slug}><h2><Link href={`/servicios/${page.slug}`}>{page.title}</Link></h2><p>{getServiceGuide(page.slug)?.description || "Comprueba la información publicada sobre aseguradoras y qué debes confirmar para tu póliza concreta."}</p></li>)}
      </ul>
      <p><Link href="/pacientes">Prepara tu visita con una lista personalizada</Link> · <Link href="/informacion-editorial">Responsabilidad y fuentes del contenido</Link></p>
    </div>
  );
}
