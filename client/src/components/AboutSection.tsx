import { site } from '../data/site'

export function AboutSection() {
  return (
    <section className="section-shell section-shell--about" id="about" aria-labelledby="about-heading">
      <div className="section-shell__inner about-shell">
        <div className="about-grid">
          <div className="about-story">
            <p className="about-eyebrow">{site.about.eyebrow}</p>
            <h2 id="about-heading" className="about-heading">{site.about.heading}</h2>
            <p className="about-text">{site.about.story}</p>
          </div>
          <figure className="about-exterior">
            <div className="about-photo">
              <img
                src={site.about.photos.exterior.src}
                alt={site.about.photos.exterior.alt}
                width={site.about.photos.exterior.width}
                height={site.about.photos.exterior.height}
                loading="lazy"
              />
            </div>
            <figcaption className="about-caption"><span className="about-caption__text">{site.about.photos.exterior.caption}</span><span className="about-caption__line" aria-hidden="true"></span></figcaption>
          </figure>
          <div className="about-people">
            <figure className="about-person">
              <div className="about-photo">
                <img
                  src={site.about.photos.owners.src}
                  alt={site.about.photos.owners.alt}
                  width={site.about.photos.owners.width}
                  height={site.about.photos.owners.height}
                  loading="lazy"
                />
              </div>
              <figcaption className="about-caption"><span className="about-caption__text">{site.about.photos.owners.caption}</span><span className="about-caption__line" aria-hidden="true"></span></figcaption>
            </figure>
          </div>
          <div className="about-owners">
            <p className="about-eyebrow">{site.about.ownersEyebrow}</p>
            <p className="about-text">{site.about.ownersText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
