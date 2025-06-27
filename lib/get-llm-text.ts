import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import { remarkInclude } from "fumadocs-mdx/config";
import type { Page } from "@/lib/source";

const processor = remark().use(remarkMdx).use(remarkInclude).use(remarkGfm);

export async function getLLMText(page: Page) {
  const category =
    {
      ui: "Fumadocs Framework",
      headless: "Fumadocs Core (core library of framework)",
      mdx: "Fumadocs MDX (the built-in content source)",
      cli: "Fumadocs CLI (the CLI tool for automating Fumadocs apps)",
    }[page.slugs[0]] ?? page.slugs[0];

  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: page.data.content,
  });

  // TODO: Correct the Source URL below:
  return `# ${category}: ${page.data.title}
URL: ${page.url}
Source: https://raw.githubusercontent.com/yytypescript/book/refs/heads/main/${page.path}

${page.data.description}
        
${processed.value}`;
}
