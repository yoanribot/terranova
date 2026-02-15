/* ---------------------------------- */
/* Base Types */
/* ---------------------------------- */

export type RichTextDocument = BlockNode[];

export type BlockNode = HeadingNode | ParagraphNode | ListNode;

export type InlineNode = TextNode;

/* ---------------------------------- */
/* Text Node (inline) */
/* ---------------------------------- */

export interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  // future-proof for links, code, etc.
}

/* ---------------------------------- */
/* Paragraph */
/* ---------------------------------- */

export interface ParagraphNode {
  type: "paragraph";
  children: InlineNode[];
}

/* ---------------------------------- */
/* Heading */
/* ---------------------------------- */

export interface HeadingNode {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
}

/* ---------------------------------- */
/* List */
/* ---------------------------------- */

export interface ListNode {
  type: "list";
  format: "unordered" | "ordered";
  children: ListItemNode[];
}

export interface ListItemNode {
  type: "list-item";
  children: InlineNode[];
}
