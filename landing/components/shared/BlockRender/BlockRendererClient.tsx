"use client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({
  content,
}: {
  readonly content: BlocksContent;
}) {
  if (!content) return null;
  return (
    <div className="text-black">
      <BlocksRenderer
        content={content}
        blocks={{
          // You can use the default components to set class names...
          paragraph: ({ children }) => (
            <p className="mb-4 text-lg leading-relaxed text-gray-700">
              {children}
            </p>
          ),
          // ...or point to a design system
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">
                    {children}
                  </h1>
                );
              case 2:
                return (
                  <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900">
                    {children}
                  </h2>
                );
              case 3:
                return (
                  <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-900">
                    {children}
                  </h3>
                );
              case 4:
                return (
                  <h4 className="text-lg font-semibold mt-5 mb-2 text-gray-900">
                    {children}
                  </h4>
                );
              case 5:
                return (
                  <h5 className="text-base font-semibold mt-5 mb-2 text-gray-900">
                    {children}
                  </h5>
                );
              case 6:
                return (
                  <h6 className="text-sm font-semibold mt-5 mb-2 text-gray-900">
                    {children}
                  </h6>
                );
              default:
                return (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">
                    {children}
                  </h1>
                );
            }
          },
          list: ({ children, format }) =>
            format === "ordered" ? (
              <ol className="list-decimal list-inside pl-6 mb-4">{children}</ol>
            ) : (
              <ul className="list-disc list-inside pl-6 mb-1">{children}</ul>
            ),
          "list-item": ({ children }) => (
            <li className="leading-relaxed mb-1">{children}</li>
          ),
          // For links, you may want to use the component from your router or framework
          link: ({ children, url }) => (
            <a href={url} className="text-blue-500 hover:underline">
              {children}
            </a>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <span className="italic">{children}</span>,
        }}
      />
    </div>
  );
}
