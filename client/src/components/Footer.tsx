import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="section-shell section-shell--footer" aria-labelledby="footer-heading">
      <div className="section-shell__inner">
        <p className="section-shell__eyebrow">{site.name}</p>
        <h2 id="footer-heading">{site.tagline}</h2>
        <p>{site.footer.blurb}</p>
      </div>
    </footer>
  )
}
