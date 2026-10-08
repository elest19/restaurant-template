import { Fragment, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useDishes } from '../hooks/useDishes'
import { Button } from './Button'
import { Navbar } from './Navbar'
import { site } from '../data/site'

export function Hero() {
  const { dishes, loading, error } = useDishes()
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const heroRef = useRef<HTMLElement>(null)
  const [heroInView, setHeroInView] = useState(true)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), { threshold: 0 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const heroDishes = site.hero.dishSlugs.flatMap((slug) => dishes.filter((dish) => dish.slug === slug))
  const activeDish = heroDishes[activeIndex]

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    if (heroDishes.length === 0) return
    event.preventDefault()
    const nextIndex = (activeIndex + (event.key === 'ArrowRight' ? 1 : -1) + heroDishes.length) % heroDishes.length
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <main>
      <section ref={heroRef} className="hero" id="home" aria-label={`Welcome to ${site.name}`}>
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <Navbar heroInView={heroInView} />
        <div className="hero-body" id="menu">
          <div className="hero-layout">
            <div className="intro-card">
              <a className="card-logo" href="#home">
                <img src={site.logo.src} alt={site.logo.alt} />
              </a>
              <p className="hours"><span className="hours-dot" /> {site.hours.open} – {site.hours.close} <span aria-hidden="true">•</span> {site.hours.days}</p>
              <h1>
                {site.hero.headline.map((line, index) => (
                  <Fragment key={index}>
                    {index > 0 && <br />}
                    {index === site.hero.headline.length - 1 ? <em>{line}</em> : line}
                  </Fragment>
                ))}
              </h1>
              <div className="hero-actions">
                <Button variant="outline" href="#menu">{site.cta.secondary} <span aria-hidden="true">↗</span></Button>
                <Button href="#reservation">{site.cta.primary} <span aria-hidden="true">→</span></Button>
              </div>
            </div>
            <div className="featured-area" role="tabpanel" id="hero-dish-panel" aria-labelledby={activeDish ? `hero-tab-${activeDish.slug}` : undefined} aria-live="polite">
              {loading && <div className="dish-loading" role="status">{site.featured.loading}</div>}
              {error && <div className="dish-error" role="alert">{error}</div>}
              {!loading && !error && activeDish && (
                <div className="featured-dish">
                  <span className="featured-note"><span className="note-line" /> {site.featured.note}</span>
                  <div className="featured-frame">
                    {heroDishes.map((dish, index) => (
                      <img
                        key={dish.id}
                        className={index === activeIndex ? 'hero-photo is-active' : 'hero-photo'}
                        src={dish.imageUrl}
                        alt={index === activeIndex ? dish.name : ''}
                        width="600"
                        height="600"
                        loading="eager"
                        fetchPriority={index === activeIndex ? 'high' : 'auto'}
                      />
                    ))}
                  </div>
                  <span className="dish-caption">{site.featured.caption} <b>✳</b></span>
                </div>
              )}
            </div>
          </div>
          <div className="dish-strip">
            {!loading && !error && heroDishes.length > 0 && (
              <div className="dish-tabs" role="tablist" aria-label={site.dishTabs.regionLabel} onKeyDown={handleTabKeyDown}>
                {heroDishes.map((dish, index) => (
                  <button
                    key={dish.id}
                    ref={(element) => { tabRefs.current[index] = element }}
                    type="button"
                    role="tab"
                    id={`hero-tab-${dish.slug}`}
                    className="dish-tab"
                    aria-selected={index === activeIndex}
                    aria-controls="hero-dish-panel"
                    tabIndex={index === activeIndex ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                  >
                    <img src={dish.imageUrl} alt="" width="400" height="300" loading="eager" />
                    <span className="dish-tab-label">{dish.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="reservation-anchor" id="reservation" aria-label={site.reservation.sectionLabel}><span className="reservation-kicker">{site.reservation.kicker}</span><h2>{site.reservation.heading}</h2><p>{site.reservation.description}</p></section>
    </main>
  )
}
