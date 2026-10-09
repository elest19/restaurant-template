import { site } from '../data/site'

export function MenuSection() {
  return (
    <section className="section-shell section-shell--menu" id="menu" aria-labelledby="menu-heading">
      <div className="section-shell__inner">
        <p className="section-shell__eyebrow">{site.menu.eyebrow}</p>
        <h2 id="menu-heading">{site.menu.heading}</h2>
        <p>{site.menu.description}</p>
      </div>
    </section>
  )
}
