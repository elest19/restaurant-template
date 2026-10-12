import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'

const MAP_RESIZE_DEBOUNCE_MS = 250

function useMapCardSize(cardRef: React.RefObject<HTMLDivElement | null>) {
  const [ready, setReady] = useState(false)
  const [sizeKey, setSizeKey] = useState('')

  useEffect(() => {
    const card = cardRef.current
    if (typeof ResizeObserver === 'undefined' || !card) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const measure = () => {
      const rect = card.getBoundingClientRect()
      const width = Math.round(rect.width)
      const height = Math.round(rect.height)
      if (width <= 0 || height <= 0) return
      const key = `${width}x${height}`
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        setSizeKey((previous) => (previous === key ? previous : key))
        setReady(true)
      }, MAP_RESIZE_DEBOUNCE_MS)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(card)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [cardRef])

  return { ready, sizeKey }
}

function ContactMapEmbed() {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const { ready, sizeKey } = useMapCardSize(cardRef)
  const [mapLoaded, setMapLoaded] = useState(false)

  // The placeholder keeps the same box so the card already has its final
  // measured size before the map document first initializes.
  return (
    <div className="contact-map" ref={cardRef}>
      {ready ? (
        <iframe
          key={sizeKey}
          data-size-key={sizeKey}
          title={`Map of ${site.contact.map.label}`}
          src={site.contact.map.embedUrl}
          referrerPolicy="no-referrer"
          allow="geolocation"
          onLoad={() => setMapLoaded(true)}
        />
      ) : null}
      {!mapLoaded && (
        <p className="contact-map__loading" aria-hidden={ready ? undefined : true}>
          {site.contact.map.loading}
        </p>
      )}
    </div>
  )
}

export function ContactSection() {
  const firstHour = site.contact.hours[0]

  return (
    <section className="section-shell section-shell--contact" id="contact" aria-labelledby="contact-heading">
      <div className="section-shell__inner">
        <div className="contact-shell">
          <div className="contact-shell__details">
            <p className="about-eyebrow contact-eyebrow">{site.contact.eyebrow}</p>
            <h2 id="contact-heading" className="about-heading">{site.contact.heading}</h2>
            <p className="contact-intro">{site.contact.intro}</p>

            <address className="contact-address">
              {site.contact.address.street}
              <br />
              {site.contact.address.city}, {site.contact.address.postcode}
            </address>

            <div className="contact-links">
              <a
                className="contact-row"
                href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}
                aria-label={`Call ${site.contact.phone}`}
              >
                <svg
                  className="icon icon--stroke"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {site.contact.phone}
              </a>
              <a
                className="contact-row"
                href={`mailto:${site.contact.email}`}
                aria-label={`Email ${site.contact.email}`}
              >
                <svg
                  className="icon icon--stroke"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
                {site.contact.email}
              </a>
            </div>

            <dl className="contact-hours">
              <dt>{firstHour?.days ?? ''}</dt>
              <dd>{firstHour?.hours ?? ''}</dd>
            </dl>

            <div className="contact-socials">
              {site.contact.socials.map((social) => (
                <a
                  key={social.label}
                  className="contact-social"
                  href={social.href}
                  aria-label={social.label}
                >
                  <svg
                    className={social.label === 'Instagram' ? 'icon icon--stroke' : 'icon icon--solid'}
                    viewBox="0 0 24 24"
                    fill={social.label === 'Instagram' ? 'none' : 'currentColor'}
                    stroke={social.label === 'Instagram' ? 'currentColor' : 'none'}
                    strokeWidth={social.label === 'Instagram' ? 1.75 : undefined}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="20"
                    height="20"
                    aria-hidden="true"
                    focusable="false"
                  >
                    {social.label === 'Instagram' ? (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <path d="M17.5 6.5h.01" />
                      </>
                    ) : (
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    )}
                  </svg>
                  {social.label}
                </a>
              ))}
            </div>

            <div className="contact-actions">
              <a
                className="contact-btn contact-btn--primary"
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${site.contact.address.street}, ${site.contact.address.city}, ${site.contact.address.postcode}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <span aria-hidden="true">↗</span>
              </a>
              <a
                className="contact-btn contact-btn--secondary"
                href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}
              >
                <svg
                  className="icon icon--stroke"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call us
              </a>
            </div>
          </div>

          <div className="contact-shell__map">
            <ContactMapEmbed />
          </div>
        </div>
      </div>
    </section>
  )
}
