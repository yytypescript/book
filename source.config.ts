import remarkAutoPageCard from "@suin/auto-page-card";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs";
import { twoslashBugWorkaround } from "shiki-twoslash-fix";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkAutoPageCard],
    rehypeCodeOptions: {
      langs: ["ts", "js", "html", "tsx", "mdx"],
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        twoslashBugWorkaround(
          transformerTwoslash({
            typesCache: createFileSystemTypesCache(),
          }),
        ),
      ],
    },
  },
});
