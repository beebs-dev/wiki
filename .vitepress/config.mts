import { defineConfig } from "vitepress";

export default defineConfig({
  cleanUrls: true,
  srcDir: "content",
  base: "/knowledge-base",

  title: "Knowledge Base",
  titleTemplate: "Knowledge Base",
  description: "Beebles Laboratorium Knowledge Base",

  locales: {
    root: {
      lang: "en",
      label: "English",
    },
    fr: {
      lang: "fr",
      label: "French",
      link: "/fr",
    },
  },

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Index",
        items: [
          { text: "index", link: "/wiki" },
          { text: "Tags", link: "/wiki/tags" },
        ],
      },
      {
        text: "Contribute",
        link: "https://github.com/beebs.dev/knowledge-base/edit/main/CONTRIBUTION.md",
      },
    ],

    search: {
      provider: "local",
    },

    sidebar: [],

    socialLinks: [
      { icon: "github", link: "https://github.com/beebs.dev/knowledge-base" },
    ],

    editLink: {
      pattern:
        "https://github.com/beebs.dev/knowledge-base/edit/main/content/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025",
    },
  },

  lastUpdated: true,
});
