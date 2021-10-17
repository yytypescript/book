import * as fs from "fs";
import { Root } from "mdast";
import { Plugin } from "unified";

export const pageRef: Plugin<[never]> = () => (node: Root, file) => {
  let linkFound = false;

  for (const [index, paragraph] of node.children.entries()) {
    if (paragraph.type !== "paragraph") {
      continue;
    }
    if (paragraph.children.length !== 1) {
      continue;
    }
    if (paragraph.children[0].type !== "link") {
      continue;
    }
    const link = paragraph.children[0];
    if (!link.url.startsWith("/")) {
      continue;
    }
    linkFound = true;
    node.children[index] = {
      type: "jsx" as any,
      value: `<PageRef link="${slugToFilename(link.url)}" />`,
    };
  }

  if (linkFound) {
    node.children.unshift({
      type: "import" as any,
      value: 'import PageRef from "@site/src/components/PageRef";',
    });
  }
};

function slugToFilename(slug: string): string {
  if (fs.existsSync(`./docs${slug}/README.md`)) {
    return `${slug}/README.md`;
  }
  return `${slug}.md`;
}
