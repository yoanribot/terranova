"use client";

import { useState } from "react";
import { ClipboardCheck, Download, Printer, RotateCcw } from "lucide-react";

const general = [
  { id: "appointment", text: "Confirmar día, hora, motivo y precio de la consulta al pedir cita." },
  { id: "route", text: "Preparar la llegada a Calle Alcalá, 573 Local, Madrid, junto al Metro Torre Arias (L5)." },
  { id: "questions", text: "Preparar las preguntas que quiero resolver antes de decidir." },
];
const specific = {
  primera: [
    { id: "records", text: "Preguntar qué documentación e informes previos debo llevar y cómo entregarlos de forma segura." },
    { id: "needs", text: "Comentar al reservar si necesito alguna adaptación para la visita o si acudiré con un menor." },
    { id: "assessment", text: "Preguntar qué incluye la valoración y qué pruebas tendrían un coste adicional." },
  ],
  presupuesto: [
    { id: "options", text: "Pedir que me expliquen las opciones, sus límites y por qué se propone una de ellas para mi caso." },
    { id: "written", text: "Solicitar un presupuesto por escrito con fases, materiales, conceptos incluidos y posibles extras." },
    { id: "timing", text: "Aclarar número previsto de citas, plazos, provisionales y revisiones posteriores." },
    { id: "decision", text: "Anotar qué dudas necesito resolver antes de aceptar el tratamiento o solicitar otra opinión." },
  ],
  seguimiento: [
    { id: "instructions", text: "Llevar las instrucciones y el plan entregados en mi última consulta." },
    { id: "changes", text: "Preparar las dudas sobre la evolución para comentarlas directamente con el profesional." },
    { id: "next", text: "Confirmar cuándo es la siguiente revisión y qué incluye el seguimiento." },
  ],
};
const insuranceItems = [
  { id: "policy", text: "Comprobar con mi aseguradora que esta clínica y el profesional figuran en mi cuadro vigente." },
  { id: "coverage", text: "Confirmar cobertura, carencias, franquicias y límites para cada acto del presupuesto." },
  { id: "authorization", text: "Preguntar si hace falta autorización previa y quién debe solicitarla." },
  { id: "proof", text: "Consultar qué tarjeta o identificación debo mostrar en recepción, sin enviarla por el formulario web." },
];

type Visit = keyof typeof specific;

export default function VisitPlanner({ phone }: { phone: string }) {
  const [visit, setVisit] = useState<Visit>("primera");
  const [insurance, setInsurance] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const items = [...general, ...specific[visit], ...(insurance ? insuranceItems : [])];
  const complete = items.filter(item => checked.has(item.id)).length;

  function toggle(id: string) {
    setChecked(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const checklistText = ["Mi visita a Terranova Clínica Dental", `Tipo de visita: ${visit}`, insurance ? "Con seguro dental" : "Sin comprobación de seguro", "", ...items.map(item => `${checked.has(item.id) ? "[x]" : "[ ]"} ${item.text}`), "", `Contacto: ${phone}`, "Calle Alcalá, 573 Local, 28022 Madrid. Metro Torre Arias (L5).", "Esta lista no reserva una cita ni ofrece un diagnóstico."].join("\n");

  return (
    <section className="visit-planner" aria-labelledby="planner-title">
      <div className="planner-heading">
        <p className="patient-eyebrow"><ClipboardCheck size={18} className="inline-block mr-2" aria-hidden="true" />Tu lista, paso a paso</p>
        <h2 id="planner-title">Llega con tus dudas preparadas.</h2>
        <p>No necesitas registrarte. La selección se mantiene solo mientras usas esta página; no se envía ni se guarda en el navegador.</p>
      </div>
      <div className="planner-controls no-print">
        <div>
          <label htmlFor="visit-type">¿Qué visita estás preparando?</label>
          <select id="visit-type" value={visit} onChange={event => setVisit(event.target.value as Visit)}>
            <option value="primera">Mi primera visita</option>
            <option value="presupuesto">Valorar un presupuesto o tratamiento</option>
            <option value="seguimiento">Una revisión o seguimiento</option>
          </select>
        </div>
        <label className="insurance-choice"><input type="checkbox" checked={insurance} onChange={event => setInsurance(event.target.checked)} /> Quiero comprobar mi seguro dental</label>
      </div>
      <p className="planner-print-context">Terranova Clínica Dental · {visit === "primera" ? "Primera visita" : visit === "presupuesto" ? "Valoración de presupuesto" : "Revisión o seguimiento"}{insurance ? " · Con comprobación de seguro" : ""}</p>
      <p role="status" aria-live="polite">{complete} de {items.length} pasos preparados</p>
      <progress value={complete} max={items.length} aria-label="Pasos preparados" />
      <ul className="planner-list">
        {items.map(item => <li key={item.id}><label><input type="checkbox" checked={checked.has(item.id)} onChange={() => toggle(item.id)} /><span>{item.text}</span></label></li>)}
      </ul>
      <div className="planner-actions no-print">
        <button type="button" onClick={() => window.print()}><Printer size={18} className="inline-block mr-2" aria-hidden="true" />Imprimir o guardar como PDF</button>
        <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(checklistText)}`} download="mi-visita-terranova.txt"><Download size={18} className="inline-block mr-2" aria-hidden="true" />Descargar lista en texto</a>
        <button type="button" onClick={() => setChecked(new Set())}><RotateCcw size={18} className="inline-block mr-2" aria-hidden="true" />Desmarcar pasos</button>
      </div>
      <p className="planner-contact">Contacto: <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a> · Calle Alcalá, 573 Local, Madrid · Metro Torre Arias (L5).</p>
      <p>Esta lista es una ayuda de organización. No reserva una cita, confirma cobertura ni ofrece un diagnóstico.</p>
      <noscript><p>La lista inicial se puede leer sin JavaScript. Actívalo para personalizar, marcar y descargar los pasos, o imprime esta página desde el navegador.</p></noscript>
    </section>
  );
}
