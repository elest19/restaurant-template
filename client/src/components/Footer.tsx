import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="section-shell section-shell--footer" aria-labelledby="footer-heading">
      <div className="section-shell__inner">
        <p className="section-shell__eyebrow">{site.name}</p>
        <h2 id="footer-heading">{site.footer.heading}</h2>
        <p>{site.footer.note}</p>

        <div className="section-shell__meta">
          <article>
            <strong>Visit</strong>
            <p>{site.contact.address.street}</p>
            <p>{site.contact.address.city}, {site.contact.address.postcode}</p>
          </article>
          <article>
            <strong>Call</strong>
            <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}>{site.contact.phone}</a>
          </article>
          <article>
            <strong>Follow</strong>
            {site.contact.socials.map((social) => (
              <p key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
              </p>
            ))}
          </article>
        </div>
      </div>
    </footer>
  )
}
