import Link from "@/components/PageLink";
import VisitPlanner from "@/components/VisitPlanner/VisitPlanner";
import { getMetadata } from "@/lib/content";
import { generatePageMetadata } from "@/app/generateSEOMetadata";

export const metadata = generatePageMetadata("Prepara tu visita", "Organiza tu visita a Terranova: lista personalizada para primera consulta, presupuesto, seguimiento o seguro dental, con descarga e impresión.", "/pacientes");

export default function PatientsPage() {
  const location = getMetadata().sections[0];
  return (
    <div className="patient-page">
      <nav aria-label="Ruta de navegación"><Link href="/">Inicio</Link> / <span aria-current="page">Antes de tu visita</span></nav>
      <div className="patient-intro">
        <p className="patient-eyebrow">Información para pacientes · Madrid</p>
        <h1>Una visita empieza<br />con buenas preguntas.</h1>
        <p>Prepara lo que necesitas confirmar, compara un presupuesto con más claridad y evita que una duda importante se quede fuera de la consulta.</p>
      </div>
      <VisitPlanner phone={location.phoneMain} />
      <div className="patient-columns">
        <section>
          <h2>Antes de reservar</h2>
          <p>Llama al <a href={`tel:${location.phoneMain.replace(/\s/g, "")}`}>{location.phoneMain}</a> para confirmar disponibilidad, duración prevista, precio y qué incluye la cita. Pregunta si las pruebas se facturan aparte. No damos por supuesto que una primera valoración sea gratuita.</p>
          <p>Si necesitas cambiar una cita o alguna adaptación para acceder a la consulta, coméntalo con recepción. Para un menor, confirma quién debe acompañarle y qué documentación se necesita.</p>
        </section>
        <section>
          <h2>Cómo llegar</h2>
          <p>{location.address}. {location.description}.</p>
          <p><Link href="/#map">Consultar ubicación y horario publicado</Link>. Confirma el horario de tu cita directamente con la clínica, especialmente en festivos.</p>
          <p>No envíes historias clínicas, radiografías, documentos de identidad o datos de tu póliza por el formulario general. Pregunta al equipo por el canal adecuado.</p>
        </section>
      </div>
      <section className="patient-reading">
        <h2>Un presupuesto que puedas entender</h2>
        <p>Comprueba que describe el tratamiento propuesto y separa sus fases. Pide aclaraciones sobre pruebas, materiales, provisionales, revisiones, reparaciones y mantenimiento. Si la propuesta cambia después de una prueba, solicita que te expliquen el motivo y el importe actualizado antes de decidir.</p>
        <p>Con seguro dental, estar en un cuadro médico no implica que todos los actos estén cubiertos. Verifica cada concepto con tu aseguradora y conserva su confirmación. <Link href="/servicios/aseguradora">Consulta la información sobre aseguradoras y cobertura</Link>.</p>
        <p><Link href="/servicios">Explora los tratamientos y sus preguntas para la consulta</Link> · <Link href="/informacion-editorial">Quién publica esta información y cómo comunicar una corrección</Link>.</p>
      </section>
    </div>
  );
}
