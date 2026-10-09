import { site } from '../data/site'

export function MenuSection() {
  return (
    <section className="section-shell section-shell--menu" id="menu" aria-labelledby="menu-heading">
      <div className="section-shell__inner">
        <p className="section-shell__eyebrow">{site.menu.label}</p>
        <h2 id="menu-heading">{site.menu.heading}</h2>
        <p>{site.menu.intro}</p>

        <ul className="section-shell__list" aria-label="Menu categories">
          {site.menu.categories.map((category) => (
            <li key={category.name} className="section-shell__item">
              <strong>{site.menu.label}</strong>
              <span>{category.name}</span>
              <p>{category.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
