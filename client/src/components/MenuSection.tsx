import { site } from '../data/site'

export function MenuSection() {
  return (
    <section className="section-shell section-shell--menu" id="menu" aria-labelledby="menu-heading">
      <div className="section-shell__inner menu-shell">
        <p className="section-shell__eyebrow menu-eyebrow">{site.menu.eyebrow}</p>
        <h2 id="menu-heading" className="menu-heading">{site.menu.heading}</h2>
        <p className="menu-description">{site.menu.description}</p>
        <div className="menu-grid">
          {site.menu.categories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className={category.id === 'food-bundles' ? 'menu-tile menu-tile--tall' : 'menu-tile'}
            >
              <img
                src={category.image}
                alt={category.alt}
                width="640"
                height={category.id === 'food-bundles' ? '960' : '640'}
                loading="lazy"
              />
              <span className="menu-tile__shade" aria-hidden="true" />
              <span className="menu-tile__label">
                {category.title}
                <span className="menu-tile__arrow" aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
