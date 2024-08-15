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
          light: "#f0f0f0",
          lightgray: "#e2e1dd",
          gray: "#937600",
          darkgray: "#292822",
          dark: "#282823",
          secondary: "#44c608",
          tertiary: "#e62629",
          highlight: "#e2e1dd",
        },
        darkMode: {
          light: "#1c1c1c",
          lightgray: "#262729",
          gray: "#937600",
          darkgray: "#ede6d6",
          dark: "#ebe5d8",
          secondary: "#44c608",
          tertiary: "#e62629",
          highlight: "#262729",
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
