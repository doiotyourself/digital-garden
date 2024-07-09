import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 * 
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "doiotyourself.com",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    discussion: {
      provider: "giscus",
      configuration: {
        dataRepo: "doiotyourself/digital-garden",
        dataRepoId: "R_kgDOMPURSQ",
        dataCategory: "Announcements",
        dataCategoryId: "DIC_kwDOMPURSc4CgoCL",
      },
    },
    locale: "en-AU",
    baseUrl: "doiotyourself.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "M PLUS Rounded 1c",
        body: "Inter Tight",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f4f4f4",
          lightgray: "#ebebeb",
          gray: "#806c44",
          darkgray: "#2d2d2d",
          dark: "#232323",
          secondary: "#44c608",
          tertiary: "#44c608",
          highlight: "rgba(128, 108, 68, 0.15)",
        },
        darkMode: {
          light: "#232323",
          lightgray: "#2d2d2d",
          gray: "#806c44",
          darkgray: "#bababa",
          dark: "#f4f4f4",
          secondary: "#44c608",
          tertiary: "#44c608",
          highlight: "rgba(128, 108, 68, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [
      Plugin.RemoveDrafts(),
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssFullHtml: true,
        rssLimit: 8,
        includeEmptyFiles: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
