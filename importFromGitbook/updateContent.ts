import * as console from "console";
import glob from "fast-glob";
import fs from "fs";
import matter from "gray-matter";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { createRequire } from "module";
import path from "path";
import prettier from "prettier";

const filenames = glob.sync("docs/**/*.md");
const require = createRequire(import.meta.url);

for (const filename of filenames) {
  const file = getFile(filename);
  setSidebarLabel(file);
  setSlug(file);
  replaceGenericsExpressionInTitle(file);
  replaceAssetsPaths(file);
  replaceTags(file);
  normalizeMarkdown(file);
  saveFile(file);
}

type File = {
  filename: string;
  data: Record<string, any>;
  content: string;
};

function getFile(filename: string): File {
  const sourceContent = fs.readFileSync(filename);
  const { content, data } = matter(sourceContent);
  return { filename, data, content };
}

function replaceTags(file: File) {
  replacePageRefTag(file);
  replaceContentRef(file);
  replaceCodeTag(file);
  replaceHint(file);
}

function replacePageRefTag(file: File) {
  file.content = file.content.replaceAll(
    /{% page-ref page="(.+?)" %}/g,
    (_, ref) => resolveRef(file, ref)
  );
}

function replaceContentRef(file: File) {
  file.content = file.content.replaceAll(
    /{% content-ref url="(?<path>.+?)" %}.+?{% endcontent-ref %}/gs,
    (_, ref) => resolveRef(file, ref)
  );
}

function resolveRef(file: File, ref: string): string {
  const link = ref.endsWith("/") ? `${ref}README.md` : ref;
  const targetFilename = path.resolve(path.dirname(file.filename), link);
  if (path.basename(targetFilename) === "broken-reference") {
    console.error(`Broken reference found: ${file.filename}`);
    return "**broken-reference**";
  }
  const { content: targetContent } = getFile(targetFilename);
  const targetTitle = getContentTitle(targetContent);
  return `[${targetTitle}](${link})`;
}

function replaceCodeTag(file: File) {
  file.content = file.content.replaceAll(
    /{% code title="(?<title>.+?)" %}\s```(?<lang>\w+)\s(?<code>.+?)```\s{% endcode %}/gs,
    (substring, title, lang, code) => {
      return `${"```"}${lang} title="${title}"\n${code.replace(
        /\n+$/s,
        ""
      )}\n${"```"}`;
    }
  );
}

function getContentTitle(content: string): string {
  const matches = content.match(/^#\s*(.+)$/m);
  if (matches) {
    return matches[1];
  }
  return "__TODO_NO_TITLE__";
}

function replaceHint(file: File) {
  file.content = file.content.replaceAll(
    /{% hint style="(?<style>\w+?)" %}\s(?<content>.+?)\s{% endhint %}/gs,
    (substring, style, content) => {
      const x =
        style === "info"
          ? "info"
          : style === "warning"
          ? "caution"
          : style === "success"
          ? "tip"
          : "note";
      return `:::${x}\n\n${content}\n\n:::`;
    }
  );
}

function normalizeMarkdown(file: File) {
  const prettierIgnores = ["docs/reference/functions/arrow-functions.md"];
  const tree = fromMarkdown(file.content);
  let newContent = toMarkdown(tree, { listItemIndent: "one", bullet: "-" });
  newContent = newContent.replaceAll(/\\$/gm, "");
  newContent = newContent.replaceAll(/(?!`)(?:\\`){2,}/g, "`` ` ``");
  newContent = newContent.replaceAll(
    /\\<(.+?)>/g,
    (substring, arg) => `&lt;${arg}>`
  );
  if (!prettierIgnores.includes(file.filename)) {
    newContent = prettier.format(newContent, {
      parser: "markdown-nocjsp", // prettier本家のMarkdownパーサーは英単語の前後にスペースを入れる問題があるので、この問題を対策がされたパーサーを用いています。
      plugins: [require("prettier-plugin-md-nocjsp")],
    });
  }
  file.content = newContent;
}

function setSidebarLabel(file: File) {
  let label: string | undefined;

  if (
    file.filename !== "docs/README.md" &&
    file.filename.endsWith("/README.md")
  ) {
    label = "概要";
  }
  const matches = file.content.match(
    /^#\s+(.+?)\s*\\?\([a-zA-Z0-9\s.,]+\\?\)$/m
  );
  if (matches) {
    label = matches[1];
  }

  if (label) {
    file.data["sidebar_label"] = label;
  }
}

function setSlug(file: File) {
  if (file.filename.endsWith("/README.md")) {
    const slug = file.filename.replace(
      /^docs(.+?)\/?README.md$/,
      (substring, slug) => slug
    );
    file.data["slug"] = slug;
  }
}

function replaceGenericsExpressionInTitle(file: File) {
  file.content.replaceAll(/^#\s+(?<title>.+)/gm, (substring, title: string) => {
    if (
      title.includes("&lt;") ||
      title.includes("&gt;") ||
      title.includes("<") ||
      title.includes(">")
    ) {
      const newTitle = title.replace("&lt;", "<").replaceAll("&gt;", ">");
      file.data["title"] = newTitle;
      return ""; // delete title line
    }
    return substring;
  });
}

function replaceAssetsPaths(file: File) {
  file.content = file.content.replaceAll(
    /!\[(.*?)]\(<?(?:\.\.\/)*\.gitbook\/assets\/(.+?)>?\)/g,
    (substring, alt, filename) => {
      const filePath = path.resolve(file.filename);
      const assetPath = path.resolve("docs/assets", filename);
      const newPath = path.relative(path.dirname(filePath), assetPath);
      const newTag = `![${alt}](${newPath})`;
      return newTag;
    }
  );
}

function saveFile(file: File) {
  fs.writeFileSync(file.filename, matter.stringify(file.content, file.data));
}
