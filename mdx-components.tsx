import { Mermaid } from "@/components/mdx/mermaid";
import { source } from "@/lib/source";
import getPageCardComponents from "@suin/fumadocs-page-card";
import * as Twoslash from "fumadocs-twoslash/ui";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as TabsComponents from "fumadocs-ui/components/tabs";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...Twoslash,
    Mermaid,
    ...getPageCardComponents({ source }),
    ...components,
  };
}
