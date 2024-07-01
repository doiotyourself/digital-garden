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
          <li><a href="/licence"><i class="fa-brands fa-creative-commons-zero"></i> Licence</a></li>
          <li>|&nbsp;&nbsp;&nbsp;<a href="/about"><i class="fa-solid fa-address-card"></i> About</a></li>
          <li>|&nbsp;&nbsp;&nbsp;<a href="/privacy"><i class="fa-solid fa-user-ninja"></i> Privacy</a></li>
          {Object.entries(links).map(([text, detail]) => (
            <li>
              |&nbsp;&nbsp;&nbsp;<a href={detail.link}><i class={detail.icon}></i> {text}</a>
            </li>
          ))}
          <li>|&nbsp;&nbsp;&nbsp;<a href="/index.xml"><i class="fa-solid fa-square-rss"></i> RSS</a></li>
          <li>|&nbsp;&nbsp;&nbsp;{i18n(cfg.locale).components.footer.createdWith}{" "}<a href="https://quartz.jzhao.xyz/"> 🪴 Quartz {version}</a></li>
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
