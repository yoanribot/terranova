import Link from "@/components/PageLink";
import { getMetadata } from "@/lib/content";
import { generatePageMetadata } from "@/app/generateSEOMetadata";

export const metadata = generatePageMetadata("Responsabilidad y fuentes del contenido", "Quién publica la información de Terranova, cómo consultar las fuentes y cómo comunicar errores o dudas sobre los contenidos dentales.", "/informacion-editorial");

export default function EditorialPage() {
  const location = getMetadata().sections[0];
  return (
    <div className="patient-page patient-reading">
      <nav aria-label="Ruta de navegación"><Link href="/">Inicio</Link> / <span aria-current="page">Responsabilidad del contenido</span></nav>
      <p className="patient-eyebrow">Terranova Clínica Dental</p>
      <h1>Quién publica esta información.</h1>
      <section>
        <h2>La clínica y el titular del sitio</h2>
        <p>Este sitio presenta los servicios de Terranova Clínica Dental, en {location.address}. El titular indicado en el <Link href="/terminos/aviso-legal">aviso legal</Link> es MG Dental Partners S.L., NIF B23889603.</p>
        <p>Puedes contactar con la clínica en el <a href={`tel:${location.phoneMain.replace(/\s/g, "")}`}>{location.phoneMain}</a> o en <a href={`mailto:${location.email}`}>{location.email}</a>.</p>
      </section>
      <section>
        <h2>Para qué sirven las páginas de tratamientos</h2>
        <p>Son una introducción a las opciones de atención y una ayuda para preparar preguntas. No permiten diagnosticar una enfermedad, conocer la indicación de un tratamiento concreto o calcular su pronóstico sin una valoración profesional.</p>
        <p>La información general no equivale a una recomendación clínica individual. Antes de decidir, pide el diagnóstico, las alternativas, los riesgos y un presupuesto adaptados a tu caso, junto con el nombre y la colegiación del profesional que te atienda.</p>
      </section>
      <section>
        <h2>Fuentes y revisión profesional</h2>
        <p>Las secciones «Antes de decidir» enlazan fuentes sanitarias públicas para que puedas consultar la información de origen. Las referencias extranjeras describen aspectos generales; sus precios, sistemas de cobertura y normas no se trasladan a España.</p>
        <p>La preparación de estas secciones ha contado con asistencia de inteligencia artificial y consulta de las fuentes enlazadas. Esto no acredita una revisión clínica. Actualmente no se identifica en estas páginas una revisión médica individual firmada; no debe interpretarse la marca de la clínica como una firma profesional.</p>
        <p>Las fuentes no avalan a Terranova ni garantizan sus resultados. Las fotografías ilustrativas tampoco son prueba de resultados clínicos ni testimonios de pacientes.</p>
      </section>
      <section>
        <h2>Comunicar un error o pedir una aclaración</h2>
        <p>Escribe a <a href={`mailto:${location.email}?subject=Correcci%C3%B3n%20de%20contenido%20web`}>{location.email}</a> indicando la dirección de la página y el texto que necesita revisión. No adjuntes datos médicos ni documentos personales. Para dudas sobre tu atención, contacta directamente con la clínica.</p>
        <p>La información sobre citas, aseguradoras y servicios puede cambiar. Confírmala con recepción antes de desplazarte o aceptar un presupuesto.</p>
      </section>
      <p><Link href="/pacientes">Prepara tu visita</Link> · <Link href="/servicios">Consultar tratamientos</Link> · <Link href="/terminos/politica-privacidad">Política de privacidad</Link></p>
    </div>
  );
}
