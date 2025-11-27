import { defineConfig } from "vitepress";

export default defineConfig({
  cleanUrls: true,
  srcDir: "content",
  base: "/wiki",
  ignoreDeadLinks: false,
  title: "Wiki",
  titleTemplate: "Wiki",
  description: "Beebles Laboratorium Wiki",

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
    aside: false,
    socialLinks: [
      { icon: "discord", link: "https://beebs.dev/discord" },
      { icon: "github", link: "https://github.com/beebs.dev/wiki" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025",
    },
  },

  lastUpdated: true,
});
