import { BlockNode, InlineNode, RichTextDocument } from "@/types/RichText";
import React, { JSX } from "react";

interface Props {
  content: RichTextDocument;
  className?: string;
}

export const RichTextRenderer: React.FC<Props> = ({ content, className }) => {
  return (
    <div
      className={
        className
          ? className + " prose prose-neutral max-w-none"
          : "prose prose-neutral max-w-none"
      }
    >
      {content?.map((node, index) => (
        <BlockRenderer key={index} node={node} />
      ))}
    </div>
  );
};

/* ---------------------------------- */
/* Block Renderer */
/* ---------------------------------- */

const BlockRenderer: React.FC<{ node: BlockNode }> = ({ node }) => {
  switch (node.type) {
    case "paragraph":
      return (
        <p className="mb-4 text-lg leading-relaxed text-gray-700">
          {node.children.map((child, i) => (
            <InlineRenderer key={i} node={child} />
          ))}
        </p>
      );

    case "heading": {
      const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
      const headingClasses = [
        "text-3xl font-bold mt-8 mb-4 text-gray-900", // h1
        "text-2xl font-semibold mt-6 mb-3 text-gray-900", // h2
        "text-xl font-semibold mt-4 mb-2 text-gray-900", // h3
        "text-lg font-semibold mt-3 mb-2 text-gray-900", // h4
        "text-base font-semibold mt-2 mb-1 text-gray-900", // h5
        "text-base font-medium mt-2 mb-1 text-gray-900", // h6
      ];
      const className =
        headingClasses[(node.level ?? 1) - 1] || headingClasses[0];
      return (
        <Tag className={className}>
          {node.children.map((child, i) => (
            <InlineRenderer key={i} node={child} />
          ))}
        </Tag>
      );
    }

    case "list": {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      const listClass =
        node.format === "ordered"
          ? "list-decimal list-inside pl-6 mb-4"
          : "list-disc list-inside pl-6 mb-4";
      return (
        <ListTag className={listClass}>
          {node.children.map((item, i) => (
            <li key={i} className="mb-1">
              {item.children.map((child, j) => (
                <InlineRenderer key={j} node={child} />
              ))}
            </li>
          ))}
        </ListTag>
      );
    }

    default:
      return null;
  }
};

/* ---------------------------------- */
/* Inline Renderer */
/* ---------------------------------- */

const InlineRenderer: React.FC<{ node: InlineNode }> = ({ node }) => {
  if (node.type !== "text") return null;

  let content: React.ReactNode = node.text;

  if (node.bold) {
    content = (
      <strong className="font-semibold text-gray-900">{content}</strong>
    );
  }

  if (node.italic) {
    content = <em className="italic text-gray-800">{content}</em>;
  }

  if (node.underline) {
    content = <u className="underline decoration-primary/60">{content}</u>;
  }

  return <>{content}</>;
};
