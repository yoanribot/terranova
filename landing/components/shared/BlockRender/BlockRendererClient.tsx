import React from "react";
import type { BlockNode, InlineNode, RichTextDocument } from "@/types/RichText";
import styles from "./RichText.module.css";

export default function BlockRendererClient({
  content,
  className,
}: {
  readonly content: RichTextDocument;
  readonly className?: string;
}) {
  if (!content) return null;

  return (
    <div className={[styles.content, className].filter(Boolean).join(" ")}>
      {content.map((node, index) => (
        <BlockRenderer key={index} node={node} />
      ))}
    </div>
  );
}

function BlockRenderer({ node }: { node: BlockNode }) {
  switch (node.type) {
    case "paragraph":
      return (
        <p>
          {node.children.map((child, index) => (
            <InlineRenderer key={index} node={child} />
          ))}
        </p>
      );
    case "heading": {
      const Tag = `h${Math.min(6, Math.max(2, node.level))}` as keyof React.JSX.IntrinsicElements;
      return (
        <Tag>
          {node.children.map((child, index) => (
            <InlineRenderer key={index} node={child} />
          ))}
        </Tag>
      );
    }
    case "list": {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag>
          {node.children.map((item, index) => (
            <li key={index}>
              {item.children.map((child, childIndex) => (
                <InlineRenderer key={childIndex} node={child} />
              ))}
            </li>
          ))}
        </ListTag>
      );
    }
  }
}

function InlineRenderer({ node }: { node: InlineNode }) {
  // The local text snapshot also contains URLs in legal notices.
  // Make them usable without injecting HTML or changing the content schema.
  let content: React.ReactNode = node.text.split(/(https?:\/\/[^\s<>()]+)/g).map((part, index) => {
    if (!/^https?:\/\//.test(part)) return part;
    const url = part.replace(/[.,;:!?]+$/, "");
    const punctuation = part.slice(url.length);
    return <React.Fragment key={index}><a href={url} target="_blank" rel="noopener noreferrer">{url}<span className="sr-only"> (se abre en otra pestaña)</span></a>{punctuation}</React.Fragment>;
  });

  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;

  return <>{content}</>;
}
