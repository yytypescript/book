import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type * as Twoslash from "remark-shiki-twoslash";
import rehypeRaw, { type Options as RehypeRawOptions } from "rehype-raw";
import pluginPageRef from "./src/plugins/docusaurus-plugin-page-ref";

const rehypeRawOptions: RehypeRawOptions = {
  passThrough: [
    "mdxjsEsm",
    "mdxJsxTextElement",
    "mdxJsxFlowElement",
    "mdxFlowExpression",
  ],
};

const config: Config = {
  title: "TypeScript入門『サバイバルTypeScript』",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",
  url: "https://typescriptbook.jp",
  baseUrl: "/",
  organizationName: "yytypescript",
  projectName: "book",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/yytypescript/book/edit/master/",
          routeBasePath: "/",
          numberPrefixParser: false,
          remarkPlugins: [[pluginPageRef, {}]],
          rehypePlugins: [[rehypeRaw, rehypeRawOptions]],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        googleAnalytics: {
          trackingID: "UA-43572771-14",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
    [
      "docusaurus-preset-shiki-twoslash",
      {
        themes: ["min-light", "min-dark"],
        defaultCompilerOptions: {},
      } satisfies Twoslash.Options,
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "サバイバルTypeScript",
      logo: {
        alt: "サバイバルTypeScript",
        src: "img/logo.svg",
      },
      items: [
        {
          href: "https://github.com/yytypescript/book",
          label: "GitHub",
          position: "right",
        },
        {
          type: "html",
          position: "right",
          value: "custom-ask-to-ai-link",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: "サバイバルTypeScript",
        //   items: [
        //     { label: "第1章 はじめに", to: "/" },
        //     { label: "第2章 TypeScriptのあらまし", to: "/overview" },
        //     { label: "第3章 作って学ぶTypeScript", to: "/tutorials" },
        //     { label: "第4章 読んで学ぶTypeScript", to: "/reference" },
        //     { label: "第5章 Tips", to: "/tips" },
        //   ],
        // },
        // {
        //   title: "ユーティリティ",
        //   items: [
        //     { label: "記号とキーワード", to: "/symbols-and-keywords" },
        //     {
        //       label: "TypeScript解読アシスタント",
        //       to: "/code-reading-assistant",
        //     },
        //   ],
        // },
        // {
        //   title: "執筆に参加したい方",
        //   items: [
        //     { label: "概要", to: "/writing" },
        //     { label: "CONTRIBUTING", to: "/writing/contributing" },
        //     {
        //       label: "はじめて執筆する方へ",
        //       to: "/writing/getting-started",
        //     },
        //     {
        //       label: "チケット駆動",
        //       to: "/writing/ticket-driven",
        //     },
        //     {
        //       label: "環境構築からプルリクエストまでの流れ",
        //       to: "/writing/how-to-change",
        //     },
        //     { label: "Markdown", to: "/writing/markdown" },
        //     { label: "PDR", to: "/writing/pdr" },
        //   ],
        // },
        // {
        //   title: "コミュニティー",
        //   items: [
        //     {
        //       label: "GitHub",
        //       href: "https://github.com/yytypescript/book",
        //     },
        //     {
        //       label: "Connpass",
        //       href: "https://yyts.connpass.com/",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discord.gg/DTwRgzt",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "https://twitter.com/yytypescript",
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} YYTypeScript. <a href="/license">Licensed under CC BY-SA 4.0 and MIT(partially)</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // algolia: {
    //   appId: "5N3JHNPACB",
    //   apiKey: "99655de886960eadb0eca65591529110",
    //   indexName: "typescriptbook",
    //   contextualSearch: true,
    // },
  } satisfies Preset.ThemeConfig,
  plugins: [
    // [
    //   "@gracefullight/docusaurus-plugin-microsoft-clarity",
    //   { projectId: "9wrel6kg8q" },
    // ],
    // "./src/components/codeReadingAssistant/docusaurusPlugin.js",
  ],
  scripts: [
    {
      src: "https://plausible.io/js/script.js",
      defer: true,
      "data-domain": "typescriptbook.jp",
    },
  ],
};

export default config;
