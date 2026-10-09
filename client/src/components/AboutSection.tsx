import { site } from '../data/site'

export function AboutSection() {
  return (
    <section className="section-shell section-shell--about" id="about" aria-labelledby="about-heading">
      <div className="section-shell__inner">
        <p className="section-shell__eyebrow">{site.about.label}</p>
        <h2 id="about-heading">{site.about.heading}</h2>
        <p>{site.about.intro}</p>

        <ul className="section-shell__list" aria-label="Owners and story">
          <li className="section-shell__item">
            <strong>{site.about.label}</strong>
            <span>Our approach</span>
            <p>{site.about.story}</p>
          </li>
          {site.about.owners.map((owner) => (
            <li key={owner.name} className="section-shell__item">
              <strong>{owner.role}</strong>
              <span>{owner.name}</span>
              <p>{owner.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
