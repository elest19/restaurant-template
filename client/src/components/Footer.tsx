import { site } from '../data/site'
import { openLegal } from './LegalDialog'
import { Logo } from './Logo'

const socialIcons: Record<string, JSX.Element> = {
  Instagram: (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  Facebook: (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20">
      <path d="M13.3 21v-8.2h2.6l.4-3h-3V7.3c0-.9.2-1.5 1.5-1.5h1.7V2.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V9.8H7.2v3h2.8V21h3.3Z" fill="currentColor" />
    </svg>
  ),
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="section-shell section-shell--footer" aria-labelledby="footer-heading">
      <div className="section-shell__inner footer-shell">
        <div className="footer-grid" role="contentinfo" aria-label="Footer information">
          <div className="footer-panel footer-brand">
            <div className="footer-brand__mark" aria-label={site.name}>
              <Logo className="footer-brand__logo" />
            </div>
            <p className="footer-tagline">{site.tagline}</p>
          </div>

          <nav className="footer-panel footer-explore" aria-label="Footer">
            <h3 className="footer-heading">Explore</h3>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#menu">Menu</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#reservation">Reservation</a>
            </div>
          </nav>

          <div className="footer-panel footer-visit">
            <h3 className="footer-heading">Visit</h3>
            <address>
              <p>{site.contact.address.street}</p>
              <p>{site.contact.address.city}, {site.contact.address.postcode}</p>
            </address>
            <a className="footer-contact" href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}>
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20"><path d="M6.6 10.8a15.8 15.8 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3c1.3.4 2.8.7 4.2.7a1.2 1.2 0 0 1 1.2 1.2v4a1.2 1.2 0 0 1-1.2 1.2A18.8 18.8 0 0 1 3 4.1 1.2 1.2 0 0 1 4.2 3h4a1.2 1.2 0 0 1 1.2 1.2c0 1.4.3 2.9.7 4.2a1.2 1.2 0 0 1-.3 1.2L6.6 10.8Z" fill="currentColor" /></svg>
              {site.contact.phone}
            </a>
            <a className="footer-contact" href={`mailto:${site.contact.email}`}>
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20"><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.2.7 7.1 5.5 7.1-5.5H5.2Zm13.3 1.8-6.7 5.2a1 1 0 0 1-1.2 0L5.5 9v8.5c0 .3.2.5.5.5h12c.3 0 .5-.2.5-.5V9Z" fill="currentColor" /></svg>
              {site.contact.email}
            </a>
            <p className="footer-hours">{site.hours.open} – {site.hours.close}<br />{site.hours.days}</p>
          </div>

          <div className="footer-panel footer-follow">
            <h3 className="footer-heading">Follow</h3>
            <div className="footer-socials">
              {site.contact.socials.map((social) => {
                const Icon = socialIcons[social.label]
                if (!social.href || !Icon) return null
                return (
                  <a
                    key={social.label}
                    className="footer-social"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`The Green Table on ${social.label}`}
                    title={`The Green Table on ${social.label}`}
                  >
                    {Icon}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <p>© {currentYear} {site.name}. All rights reserved.</p>
          <div className="footer-bar__links">
            <button type="button" className="footer-bar__button" onClick={() => openLegal('terms')}>Terms of Service</button>
            <button type="button" className="footer-bar__button" onClick={() => openLegal('privacy')}>Privacy Policy</button>
            <a href="#home" className="footer-bar__back">
              <span aria-hidden="true">↑</span>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
