import { site } from '../data/site'

export function ContactSection() {
  return (
    <section className="section-shell section-shell--contact" id="contact" aria-labelledby="contact-heading">
      <div className="section-shell__inner">
        <p className="section-shell__eyebrow">Contact</p>
        <h2 id="contact-heading">Find us, say hello, or plan your next meal.</h2>
        <p>{site.contact.address.street}, {site.contact.address.city}, {site.contact.address.postcode}</p>

        <div className="section-shell__meta">
          <article className="section-shell__meta-item">
            <strong>Phone</strong>
            <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}>{site.contact.phone}</a>
          </article>
          <article className="section-shell__meta-item">
            <strong>Email</strong>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </article>
          <article className="section-shell__meta-item">
            <strong>Hours</strong>
            <p>{site.hours.open} – {site.hours.close}</p>
            <p>{site.hours.days}</p>
          </article>
        </div>

        <ul className="section-shell__list" aria-label="Social profiles">
          {site.contact.socials.map((social) => (
            <li key={social.label} className="section-shell__item">
              <strong>{social.label}</strong>
              <a href={social.href} target="_blank" rel="noreferrer">{social.href}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
