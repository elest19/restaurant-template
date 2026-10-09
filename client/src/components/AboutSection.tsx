import { site } from '../data/site'

export function AboutSection() {
  return (
    <section className="section-shell section-shell--about" id="about" aria-labelledby="about-heading">
      <div className="section-shell__inner">
        <p className="section-shell__eyebrow">{site.about.eyebrow}</p>
        <h2 id="about-heading">{site.about.heading}</h2>
        <p>{site.about.story}</p>
        <p className="section-shell__eyebrow">{site.about.ownersEyebrow}</p>
        <p>{site.about.ownersText}</p>
      </div>
    </section>
  )
}
