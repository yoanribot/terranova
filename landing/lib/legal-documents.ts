import type { BlockNode, RichTextDocument } from "@/types/RichText";

export const legalDocuments = [
  { slug: "politica-privacidad", title: "Política de privacidad", label: "Privacidad", description: "Consulta la información publicada sobre el formulario, los datos personales y tus derechos.", icon: "privacy" },
  { slug: "aviso-legal", title: "Aviso legal", label: "Aviso legal", description: "Información del sitio, datos de contacto y condiciones de uso de la web.", icon: "legal" },
  { slug: "politica-cookies", title: "Política de cookies", label: "Cookies", description: "Información sobre cookies, herramientas de análisis, publicidad y opciones del navegador.", icon: "cookies" },
] as const;

export type LegalDocumentInfo = (typeof legalDocuments)[number];
export type LegalSection = { id: string; title: string; content: RichTextDocument };

export function getLegalDocumentInfo(slug: string) {
  return legalDocuments.find(document => document.slug === slug);
}

const headingLabels: Record<string, string> = {
  "LEY DE LOS SERVICIOS DE LA SOCIEDAD DE LA INFORMACIÓN (LSSI)": "Servicios de la sociedad de la información (LSSI)",
  "DATOS IDENTIFICATIVOS": "Datos identificativos",
  "DERECHOS DE PROPIEDAD INTELECTUAL E INDUSTRIAL": "Derechos de propiedad intelectual e industrial",
  "EXENCIÓN DE RESPONSABILIDADES": "Exención de responsabilidades",
  "LEY APLICABLE Y JURISDICCIÓN": "Ley aplicable y jurisdicción",
  "INFORMACIÓN AL USUARIO": "Información para el usuario",
  "CARÁCTER OBLIGATORIO O FACULTATIVO DE LA INFORMACIÓN FACILITADA POR EL USUARIO": "Información facilitada en el formulario",
  "Uso de Cookies": "Uso de cookies",
  "Política de enlaces": "Política de enlaces",
  "Direcciones IP": "Direcciones IP",
};

export function legalBlockText(block: BlockNode): string {
  return block.type === "list"
    ? block.children.map(item => item.children.map(child => child.text).join("")).join(" ")
    : block.children.map(child => child.text).join("");
}

// Adapt the existing snapshot for reading; keep the legal source text unchanged.
export function groupLegalContent(content: RichTextDocument, title: string) {
  const intro: RichTextDocument = [];
  const sections: LegalSection[] = [];
  let current: LegalSection | undefined;

  function append(block: BlockNode) {
    const target = current?.content || intro;
    let next = block;
    if (block.type === "paragraph" && /^\s*•\s*/.test(legalBlockText(block))) {
      next = { type: "list", format: "unordered", children: [{ type: "list-item", children: block.children.map((child, index) => index === 0 ? { ...child, text: child.text.replace(/^\s*•\s*/, "") } : child) }] };
    }
    const previous = target.at(-1);
    // The cookies snapshot splits its opening sentence across two paragraphs.
    if (!current && previous?.type === "paragraph" && block.type === "paragraph"
      && legalBlockText(previous).startsWith("En el sitio web ")
      && /^\s+utilizamos cookies/.test(legalBlockText(block))) {
      target[target.length - 1] = { ...previous, children: [...previous.children, ...block.children] };
      return;
    }
    if (next.type === "list" && previous?.type === "list" && next.format === previous.format) {
      target[target.length - 1] = { ...previous, children: [...previous.children, ...next.children] };
    } else target.push(next);
  }

  for (const block of content) {
    const text = legalBlockText(block).trim();
    if (!text || text.toLocaleLowerCase("es") === title.toLocaleLowerCase("es")) continue;
    if (block.type !== "list" && /^\d+\.\d+\s/.test(text)) {
      append({ type: "heading", level: 3, children: block.children });
      continue;
    }
    const isHeading = block.type === "heading" || Object.hasOwn(headingLabels, text) || /^\d+\.\s/.test(text) || /^¿[^?]+\?$/.test(text);
    const isAdvertising = text.startsWith("Google AdSense y otros proveedores");
    if (isHeading || isAdvertising) {
      current = { id: `apartado-${sections.length + 1}`, title: isAdvertising ? "Publicidad de Google" : headingLabels[text] || text.replace(/^\d+\.\s*/, ""), content: [] };
      sections.push(current);
      if (isAdvertising) append(block);
    } else append(block);
  }
  return { intro, sections: sections.filter(section => section.content.length > 0) };
}
