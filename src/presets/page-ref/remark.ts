import type { Root } from "mdast";

export default function remarkPageRef() {
  return (node: Root): void => {
    for (const [index, paragraph] of node.children.entries()) {
      if (paragraph.type !== "paragraph") {
        continue;
      }
      if (paragraph.children[0]?.type !== "link") {
        continue;
      }
      const link = paragraph.children[0];
      if (!link.url.startsWith("/")) {
        continue;
      }
      node.children[index] = {
        type: "mdxJsxFlowElement",
        name: "PageRef",
        attributes: [
          { type: "mdxJsxAttribute", name: "path", value: link.url },
        ],
        children: [],
      };
    }
  };
}
