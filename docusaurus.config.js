// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const {
  postILearned,
} = require("./src/components/postILearned/postILearnedRemark");
const { pageRef } = require("./src/components/pageRef/pageRefRemark");
const remarkBreaks = require("remark-breaks");
const tsconfigForTwoslash = require(__dirname + "/tsconfig.twoslash.json");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Survival TypeScript - Nhập môn TypeScript",
  tagline: "Học TypeScript để sống sót trong thế giới lập trình",
  favicon: "img/logo.svg",
  url: "https://typescriptbook.jp",
  baseUrl: "/",
  organizationName: "yytypescript",
  projectName: "book",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "vi",
    locales: ["vi"],
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
          remarkPlugins: [remarkBreaks, pageRef, postILearned],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        // Google Analytics tắt cho bản dịch tiếng Việt
        // googleAnalytics: {
        //   trackingID: "UA-43572771-14",
        //   anonymizeIP: true,
        // },
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
        title: "Survival TypeScript",
        logo: {
          alt: "Survival TypeScript",
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
            value: `custom-ask-to-ai-link`,
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Survival TypeScript",
            items: [
              { label: "Chương 1: Giới thiệu", to: "/" },
              { label: "Chương 2: Tổng quan TypeScript", to: "/overview" },
              {
                label: "Chương 3: Học TypeScript qua thực hành",
                to: "/tutorials",
              },
              {
                label: "Chương 4: Học TypeScript qua tài liệu",
                to: "/reference",
              },
              { label: "Chương 5: Tips", to: "/tips" },
            ],
          },
          {
            title: "Tiện ích",
            items: [
              { label: "Ký hiệu và từ khóa", to: "/symbols-and-keywords" },
              {
                label: "Trợ lý đọc code TypeScript",
                to: "/code-reading-assistant",
              },
            ],
          },
          {
            title: "Đóng góp",
            items: [
              { label: "Tổng quan", to: "/writing" },
              { label: "CONTRIBUTING", to: "/writing/contributing" },
              {
                label: "Hướng dẫn cho người mới",
                to: "/writing/getting-started",
              },
              {
                label: "Ticket-driven",
                to: "/writing/ticket-driven",
              },
              {
                label: "Từ setup đến pull request",
                to: "/writing/how-to-change",
              },
              { label: "Markdown", to: "/writing/markdown" },
              { label: "PDR", to: "/writing/pdr" },
            ],
          },
          {
            title: "Cộng đồng",
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
