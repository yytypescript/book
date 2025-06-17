import type { LoadContext, Plugin } from "@docusaurus/types";

export default function pageRefTheme(): Plugin<undefined> {
  return {
    name: "docusaurus-theme-page-ref",
    getThemePath() {
      return `${__dirname}/theme`;
    },
    getTypeScriptThemePath() {
      return `${__dirname}/theme`;
    },
  };
}
