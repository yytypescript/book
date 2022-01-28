const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const remarkBreaks = require("remark-breaks");
const { pageRef } = require("./src/remark/pageRef");
const { tweetILearned } = require("./src/remark/tweetILearned");
const tsconfigForTwoslash = require(__dirname + "/tsconfig.twoslash.json");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import("@docusaurus/types").DocusaurusConfig} */
(
  module.exports = {
    title: "TypeScript入門『サバイバルTypeScript』",
    tagline: "Dinosaurs are cool",
    url: "https://typescriptbook.jp",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/logo.svg",
    organizationName: "yytypescript", // Usually your GitHub org/user name.
    projectName: "book", // Usually your repo name.
    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import("@docusaurus/preset-classic").Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            editUrl: "https://github.com/yytypescript/book/edit/master/",
            routeBasePath: "/",
            numberPrefixParser: false,
            remarkPlugins: [remarkBreaks, pageRef, tweetILearned],
          },
          // blog: {
          //   showReadingTime: true,
          //   // Please change this to your repo.
          //   editUrl:
          //     'https://github.com/facebook/docusaurus/edit/main/website/blog/',
          // },
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
      /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
      ({
        navbar: {
          title: "サバイバルTypeScript",
          logo: {
            alt: "サバイバルTypeScript",
            src: "img/logo.svg",
          },
          items: [
            // {
            //   type: "doc",
            //   docId: "intro",
            //   position: "left",
            //   label: "Tutorial",
            // },
            // {to: '/blog', label: 'Blog', position: 'left'},
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
                { label: "執筆の流れ", to: "/writing/how-to-change" },
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
          copyright: `Copyright © ${new Date().getFullYear()} YYTypeScript. Built with Docusaurus.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: [
            "java",
            "php",
            "ruby",
            "shell-session",
            "tsx",
            "jsx",
          ],
        },
        algolia: {
          appId: "5N3JHNPACB",
          apiKey: "99655de886960eadb0eca65591529110",
          indexName: "typescriptbook",
          contextualSearch: true,
        },
      }),
    i18n: {
      defaultLocale: "ja",
      locales: ["ja"],
    },
    plugins: [
      "./src/components/codeReadingAssistant/docusaurusPlugin.js",
      // [require.resolve("docusaurus-lunr-search"), { languages: ["ja", "ja"] }],
      // [
      //   require.resolve("@cmfcmf/docusaurus-search-local"),
      //   {
      //     // whether to index docs pages
      //     indexDocs: true,
      //
      //     // Whether to also index the titles of the parent categories in the sidebar of a doc page.
      //     // 0 disables this feature.
      //     // 1 indexes the direct parent category in the sidebar of a doc page
      //     // 2 indexes up to two nested parent categories of a doc page
      //     // 3...
      //     //
      //     // Do _not_ use Infinity, the value must be a JSON-serializable integer.
      //     indexDocSidebarParentCategories: 2,
      //     language: "ja",
      //   },
      // ],
    ],
  }
);
