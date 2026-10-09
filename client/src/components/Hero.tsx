import { Fragment, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { useDishes } from '../hooks/useDishes'
import { Button } from './Button'
import { site } from '../data/site'

export function Hero() {
  const { dishes, loading, error } = useDishes()
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

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
    <section className="hero" id="home" aria-label={`Welcome to ${site.name}`}>
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-body">
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
                        width="1024"
                        height="1024"
                        loading="eager"
                        fetchPriority={index === activeIndex ? 'high' : 'auto'}
                      />
                    ))}
                  </div>
                  {heroDishes.map((dish, index) => (
                    <span
                      key={`caption-${dish.id}`}
                      className={index === activeIndex ? 'dish-caption is-active' : 'dish-caption'}
                      aria-hidden={index !== activeIndex}
                    >
                      {dish.caption || site.featured.caption} <b>✳</b>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="dish-strip">
            <div className="dish-head">
              <h2 className="dish-head-label" id="dish-favorites-label">
                <span className="dish-head-line" aria-hidden="true" />
                {site.hero.favorites.label}
              </h2>
              <a className="dish-head-link" href="#menu">
                {site.hero.favorites.linkLabel} <span aria-hidden="true">→</span>
              </a>
            </div>
            {!loading && !error && heroDishes.length > 0 && (
              <div className="dish-tabs" role="tablist" aria-labelledby="dish-favorites-label" onKeyDown={handleTabKeyDown}>
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
                    <img src={dish.imageUrl} alt="" width="1024" height="1024" loading="lazy" />
                    <span className="dish-tab-label">{dish.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
    </section>
  )
}
