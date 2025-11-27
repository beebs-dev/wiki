import { defineConfig } from "vitepress";

export default defineConfig({
  cleanUrls: true,
  srcDir: "content",
  base: "/knowledge-base",
  ignoreDeadLinks: false,
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
      { text: "Index", link: "/" },
      { text: "Categories", link: "/categories" },
      { text: "Authors", link: "/authors" },
      {
        text: "Submit via Discord",
        link: "https://beebs.dev/discord",
      },
    ],

    search: {
      provider: "local",
    },

    sidebar: [],

    socialLinks: [
      { icon: "discord", link: "https://beebs.dev/discord" },
      { icon: "github", link: "https://github.com/beebs.dev/knowledge-base" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025",
    },
  },

  lastUpdated: true,
});
