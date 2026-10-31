import type { RichTextDocument } from "@/types/RichText";
import BlockRendererClient from "./BlockRendererClient";

export function RichTextRenderer({ content, className }: { content: RichTextDocument; className?: string }) {
  return <BlockRendererClient content={content} className={className} />;
}
