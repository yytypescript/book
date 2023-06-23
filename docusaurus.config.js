// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const {
  tweetILearned,
} = require("./src/components/tweetILearned/tweetILearnedRemark");
const { pageRef } = require("./src/components/pageRef/pageRefRemark");
const remarkBreaks = require("remark-breaks");
const tsconfigForTwoslash = require(__dirname + "/tsconfig.twoslash.json");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "TypeScript入門『サバイバルTypeScript』",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",
  url: "https://typescriptbook.jp",
  baseUrl: "/",
  organizationName: "yytypescript",
  projectName: "book",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/yytypescript/book/edit/master/",
          routeBasePath: "/",
          numberPrefixParser: false,
          remarkPlugins: [remarkBreaks, pageRef, tweetILearned],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleAnalytics: {
          trackingID: "UA-43572771-14",
          anonymizeIP: true,
        },
      }),
    ],
    [
      "docusaurus-preset-shiki-twoslash",
      {
        themes: ["min-light", "min-dark"],
        defaultCompilerOptions: tsconfigForTwoslash.compilerOptions,
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "サバイバルTypeScript",
            items: [
              { label: "第1章 はじめに", to: "/" },
              { label: "第2章 TypeScriptのあらまし", to: "/overview" },
              { label: "第3章 作って学ぶTypeScript", to: "/tutorials" },
              { label: "第4章 読んで学ぶTypeScript", to: "/reference" },
              { label: "第5章 Tips", to: "/tips" },
            ],
          },
          {
            title: "ユーティリティ",
            items: [
              { label: "記号とキーワード", to: "/symbols-and-keywords" },
              {
                label: "TypeScript解読アシスタント",
                to: "/code-reading-assistant",
              },
            ],
          },
          {
            title: "執筆に参加したい方",
            items: [
              { label: "概要", to: "/writing" },
              { label: "CONTRIBUTING", to: "/writing/contributing" },
              {
                label: "はじめて執筆する方へ",
                to: "/writing/getting-started",
              },
              {
                label: "チケット駆動",
                to: "/writing/ticket-driven",
              },
              {
                label: "環境構築からプルリクエストまでの流れ",
                to: "/writing/how-to-change",
              },
              { label: "Markdown", to: "/writing/markdown" },
              { label: "PDR", to: "/writing/pdr" },
            ],
          },
          {
            title: "コミュニティー",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/yytypescript/book",
              },
              {
                label: "Connpass",
                href: "https://yyts.connpass.com/",
              },
              {
                label: "Discord",
                href: "https://discord.gg/DTwRgzt",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/yytypescript",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} YYTypeScript. <a href="/license">Licensed under CC BY-SA 4.0 and MIT(partially)</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: "5N3JHNPACB",
        apiKey: "99655de886960eadb0eca65591529110",
        indexName: "typescriptbook",
        contextualSearch: true,
      },
    }),
  plugins: [
    [
      "@gracefullight/docusaurus-plugin-microsoft-clarity",
      { projectId: "9wrel6kg8q" },
    ],
    "./src/components/codeReadingAssistant/docusaurusPlugin.js",
  ],
  scripts: [
    {
      src: "https://plausible.io/js/script.js",
      defer: true,
      "data-domain": "typescriptbook.jp",
    },
  ],
};

module.exports = config;
