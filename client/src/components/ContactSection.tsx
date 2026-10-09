import { site } from '../data/site'

export function ContactSection() {
  return (
    <section className="section-shell section-shell--contact" id="contact" aria-labelledby="contact-heading">
      <div className="section-shell__inner">
        <p className="section-shell__eyebrow">{site.contact.eyebrow}</p>
        <h2 id="contact-heading">{site.contact.heading}</h2>
        <p>{site.contact.address.street}, {site.contact.address.city}, {site.contact.address.postcode}</p>
        <p>
          <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}>{site.contact.phone}</a>
          {' · '}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </p>
        <p>{site.contact.hoursNote}</p>
      </div>
    </section>
  )
}
