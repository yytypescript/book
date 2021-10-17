import { Sidebar } from "@docusaurus/plugin-content-docs/lib/types";
import { SidebarItemCategory } from "@docusaurus/plugin-content-docs/src/types";
import * as console from "console";
import fs from "fs";
import { fromMarkdown } from "mdast-util-from-markdown";
import { List } from "mdast-util-from-markdown/lib";
import path from "path";
import prettier from "prettier";
import * as process from "process";
import * as util from "util";
import glob from "fast-glob";

const gitbookDir = path.resolve(process.argv[2]);
const gitbookNodes = getGitbookNodes(gitbookDir);
const docusaurusSidebars = gitbookNodesToDocusaurusSidebars(gitbookNodes);
createContents(gitbookDir, docusaurusSidebars);
createSidebar(docusaurusSidebars);
createAssets(gitbookDir);

function getGitbookNodes(gitbookDir: string): GitbookNode[] {
  const summaryFile = `${gitbookDir}/SUMMARY.md`;
  const summaryFileContent = fs.readFileSync(summaryFile);
  const tree = fromMarkdown(summaryFileContent);
  const gitbookNodes: GitbookNode[] = [];
  for (const child of tree.children) {
    if (child.type !== "list") {
      continue;
    }
    summaryToGitbookNodes(child, gitbookNodes);
  }
  return gitbookNodes;
}

type GitbookNode = { file: string; title: string; children: GitbookNode[] };

function summaryToGitbookNodes(list: List, tree: GitbookNode[]) {
  for (const listItem of list.children) {
    let children: GitbookNode[] = [];
    for (const listOrParagraph of listItem.children) {
      if (listOrParagraph.type === "list") {
        summaryToGitbookNodes(listOrParagraph, children);
      } else if (listOrParagraph.type === "paragraph") {
        const link = listOrParagraph.children[0];
        if (link && link.type === "link") {
          const text = link.children[0];
          if (text && text.type === "text") {
            tree.push({ file: link.url, title: text.value, children });
          } else {
            throw new Error("Invalid text");
          }
        } else {
          throw new Error("Invalid link");
        }
      } else {
        throw new Error(`Unexpected type: ${listOrParagraph.type}`);
      }
    }
  }
}

type DocusaurusNode =
  | {
      type: "page";
      label: string;
      source: string;
      target: string;
    }
  | {
      type: "category";
      label: string;
      items: Array<DocusaurusNode>;
    };

function gitbookNodesToDocusaurusSidebars(
  gitbookNodes: GitbookNode[]
): DocusaurusNode[] {
  function makeSidebars(
    gitbookNodes: GitbookNode[],
    docusaurusNodes: DocusaurusNode[]
  ) {
    for (const { file, title, children } of gitbookNodes) {
      if (children.length > 0) {
        const items: DocusaurusNode[] = [
          {
            type: "page",
            label: title,
            source: file,
            target: file,
          },
        ];
        makeSidebars(children, items);
        docusaurusNodes.push({
          type: "category",
          label: removeEnglish(title),
          items,
        });
      } else {
        docusaurusNodes.push({
          type: "page",
          label: title,
          source: file,
          target: file,
        });
      }
    }
  }

  // function getTarget(source: string): string {
  //   if (source === "README.md") {
  //     return "intro.md";
  //   }
  //   if (source.endsWith("/README.md")) {
  //     return source.replace(/\/README.md$/, "/intro.md");
  //   }
  //   return source;
  // }

  function removeEnglish(title: string): string {
    return title.replace(/\s*\([a-zA-Z\s]+\)$/, "");
  }

  const docusaurusNodes: DocusaurusNode[] = [];
  makeSidebars(gitbookNodes, docusaurusNodes);
  return docusaurusNodes;
}

function createContents(gitbookDir: string, nodes: DocusaurusNode[]): void {
  for (const node of nodes) {
    if (node.type === "page") {
      const sourcePath = path.resolve(`${gitbookDir}/${node.source}`);
      const targetPath = path.resolve(`${process.cwd()}/docs/${node.target}`);
      const sourceContent = fs.readFileSync(sourcePath).toString("utf-8");
      console.log(`copy from ${sourcePath} -> ${targetPath}`);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, sourceContent);
    } else {
      createContents(gitbookDir, node.items);
    }
  }
}

function createSidebar(nodes: DocusaurusNode[]) {
  function rec(nodes: DocusaurusNode[], depth = 1): Sidebar {
    const sidebar: Sidebar = [];

    for (const node of nodes) {
      if (node.type === "category") {
        sidebar.push({
          type: "category",
          label: node.label,
          ...(depth === 1
            ? {
                collapsed: false,
              }
            : {}),
          ...(node.items.length > 0
            ? { items: rec(node.items, depth + 1) }
            : {}),
        } as Partial<SidebarItemCategory> as SidebarItemCategory);
      } else {
        sidebar.push(node.target.replace(/\.md$/, "") as any);
      }
    }

    return sidebar;
  }

  const sidebar = rec(nodes);

  // 執筆者向け情報を別ツリーにする
  const sidebarForReaders = [];
  const sidebarForWriters = [];
  for (const s of sidebar) {
    if (typeof s === "string" && (s as string).startsWith("writing/")) {
      sidebarForWriters.push(s);
      continue;
    }
    if (typeof s === "object" && s.type === "category" && s.label === "PDR") {
      s.items = s.items.filter(
        (x: any) => !(x as string).includes("__pdr-template")
      );
      // .map((x: any) => (x as string).replace(/[\d]+-/, "")) as any;
      sidebarForWriters.push(s);
      continue;
    }
    sidebarForReaders.push(s);
  }

  const sidebarCodeForReaders = util.inspect(sidebarForReaders, {
    depth: Infinity,
  });
  const sidebarCodeForWriters = util.inspect(sidebarForWriters, {
    depth: Infinity,
  });
  const code = `/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

/** @type {import("@docusaurus/plugin-content-docs/lib/types").Sidebars} */
module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: ${sidebarCodeForReaders},
  writerSidebar: ${sidebarCodeForWriters},
};
`;
  const c = prettier.format(code);
  fs.writeFileSync("sidebars.js", c);
}

function createAssets(gitbookDir: string) {
  const targetPath = path.resolve(`${process.cwd()}/docs/assets`);
  fs.mkdirSync(targetPath, { recursive: true });

  const files = glob.sync(`${gitbookDir}/.gitbook/assets/*`);
  for (const file of files) {
    fs.copyFileSync(file, path.resolve(targetPath, path.basename(file)));
  }
}
