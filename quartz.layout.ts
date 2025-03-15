import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      "About": {link: "/about", icon: "svg-icon about",},
      "Contact": {link: "/contact", icon: "svg-icon contact",},
      "RSS Feed": {link: "/index.xml", icon: "svg-icon rss",},
      "Licence": {link: "/licence", icon: "svg-icon cc-zero",},
      "GitHub": {link: "https://github.com/doiotyourself/digital-garden/", icon: "svg-icon github",},
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({
      spacerSymbol: "❯", // symbol between crumbs
      rootName: "Home", // name of first/root element
      resolveFrontmatterTitle: true, // whether to resolve folder names through frontmatter titles
      hideOnRoot: true, // whether to hide breadcrumbs on root `index.md` page
      showCurrentPage: false, // whether to display the current page in the breadcrumbs
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        repo: "doiotyourself/digital-garden",
        repoId: "R_kgDOMPURSQ",
        category: "Announcements",
        categoryId: "DIC_kwDOMPURSc4CgoCL",
        themeUrl: "https://doiotyourself.com/static/giscus", // corresponds to quartz/static/giscus/
        lightTheme: "light-theme", // corresponds to light-theme.css in quartz/static/giscus/
        darkTheme: "dark-theme", // corresponds to dark-theme.css quartz/static/giscus/
      },
    }),
    Component.Explorer({
      filterFn: (node) => {
        // set containing names of everything you want to filter out
        const omit = new Set(["about", "contact", "licence", "privacy", "gone"])
        return !omit.has(node.data?.title.toLowerCase())
      },
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  right: [],
  afterBody: [],
}
