import Link from "@/components/PageLink";
import { getServiceGuide } from "@/lib/service-guides";
import { getServiceBySlug } from "@/lib/content";

export default function ServiceGuide({ slug }: { slug: string }) {
  const guide = getServiceGuide(slug);
  if (!guide) return null;
  return (
    <aside className="patient-guide" aria-label="Información para decidir sobre el tratamiento">
      <p className="patient-eyebrow">Antes de decidir</p>
      {guide.sections.map(section => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
      <section>
        <h2>Preguntas para llevar a tu consulta</h2>
        <ul>{guide.questions.map(question => <li key={question}>{question}</li>)}</ul>
        <p><Link href="/pacientes">Prepara tu visita con una lista que puedes imprimir</Link>.</p>
      </section>
      <section className="patient-sources">
        <h2>Fuentes y alcance de esta información</h2>
        <p>Información general publicada por Terranova Clínica Dental (MG Dental Partners S.L.). No sustituye una valoración individual ni constituye un plan de tratamiento.</p>
        <ul>{guide.sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer" target="_blank">{source.label} <span className="sr-only">(se abre en otra pestaña)</span></a></li>)}</ul>
        <p>Las fuentes explican aspectos generales; no verifican los servicios ni los resultados de esta clínica. <Link href="/informacion-editorial">Responsabilidad, fuentes y correcciones</Link>.</p>
      </section>
      <nav aria-label="Tratamientos relacionados">
        <h2>Consulta también</h2>
        <ul>{guide.related.map(related => <li key={related}><Link href={`/servicios/${related}`}>{getServiceBySlug(related)?.title}</Link></li>)}</ul>
      </nav>
    </aside>
  );
}
