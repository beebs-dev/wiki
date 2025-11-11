import { defineConfig } from "vitepress";

export default defineConfig({
  cleanUrls: true,
  srcDir: "content",
  ignoreDeadLinks: true, // REMOVE THIS; ONLY FOR DEMO

  title: "Knowledge Base",
  titleTemplate: "knowledge wiki",
  description: "Sylvan Franklin community knowledge wiki",

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
        link: "https://github.com/0x15BA88FF/knowledge-base/edit/main/CONTRIBUTION.md",
      },
    ],

    search: {
      provider: "local",
    },

    sidebar: [],

    socialLinks: [
      { icon: "github", link: "https://github.com/0x15BA88FF/knowledge-base" },
    ],

    editLink: {
      pattern:
        "https://github.com/0x15BA88FF/knowledge-base/edit/main/content/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025",
    },
  },

  lastUpdated: true,
});
