"use client";

import React from "react";
import type { BlockNode, InlineNode, RichTextDocument } from "@/types/RichText";

export default function BlockRendererClient({
  content,
}: {
  readonly content: RichTextDocument;
}) {
  if (!content) return null;

  return (
    <div className="text-black">
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
        <p className="mb-4 text-lg leading-relaxed text-black">
          {node.children.map((child, index) => (
            <InlineRenderer key={index} node={child} />
          ))}
        </p>
      );
    case "heading": {
      const Tag = `h${node.level}` as keyof React.JSX.IntrinsicElements;
      const headingClasses = [
        "text-3xl font-bold mt-8 mb-4 text-black",
        "text-2xl font-semibold mt-6 mb-3 text-black",
        "text-xl font-semibold mt-5 mb-2 text-black",
        "text-lg font-semibold mt-5 mb-2 text-black",
        "text-base font-semibold mt-5 mb-2 text-black",
        "text-sm font-semibold mt-5 mb-2 text-black",
      ];
      return (
        <Tag className={headingClasses[node.level - 1] ?? headingClasses[0]}>
          {node.children.map((child, index) => (
            <InlineRenderer key={index} node={child} />
          ))}
        </Tag>
      );
    }
    case "list": {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      const listClass =
        node.format === "ordered"
          ? "list-decimal list-inside pl-6 mb-4"
          : "list-disc list-inside pl-6 mb-1";
      return (
        <ListTag className={listClass}>
          {node.children.map((item, index) => (
            <li key={index} className="leading-relaxed mb-1">
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
  let content: React.ReactNode = node.text;

  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;

  return <>{content}</>;
}
