import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"


interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <ul>
          <li><a href="/licence"><svg xmlns="http://www.w3.org/2000/svg" style="height: 1em;" aria-hidden="true" focusable="false" viewBox="0 0 88 31" fill="currentColor"><use href="/static/cc-zero.svg#Layer_1"></use></svg> Licence</a></li>
          <li>|&nbsp;&nbsp;&nbsp;<a href="/about"><span style="font-size: 1em;vertical-align: -0.125em" class="material-icons">contact_page</span> About</a></li>
          <li>|&nbsp;&nbsp;&nbsp;<a href="/privacy"><span class="material-icons">fingerprint</span> Privacy</a></li>
          {Object.entries(links).map(([text, detail]) => (
            <li>|&nbsp;&nbsp;&nbsp;<a href={detail.link}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="icon" aria-hidden="true" focusable="false" ><use href={detail.icon}></use></svg> {text}</a></li>
          ))}
          <li>|&nbsp;&nbsp;&nbsp;<a href="/index.xml"><span class="material-icons">rss_feed</span> RSS</a></li>
          <li>|&nbsp;&nbsp;&nbsp;{i18n(cfg.locale).components.footer.createdWith}{" "}<a href="https://quartz.jzhao.xyz/"> 🪴 Quartz {version}</a></li>
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
