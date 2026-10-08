import { Fragment, useEffect, useState } from 'react'
import { useDishes } from '../hooks/useDishes'
import { Button } from './Button'
import { DishCarousel } from './DishCarousel'
import { Navbar } from './Navbar'
import { site } from '../data/site'

export function Hero() {
  const { dishes, loading, error } = useDishes()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeDish = dishes[activeIndex]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return
      setActiveIndex((current) => (current + (event.key === 'ArrowRight' ? 1 : -1) + dishes.length) % dishes.length)
    }
    if (dishes.length > 0) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dishes.length])

  return (
    <main>
      <section className="hero" id="home" aria-label={`Welcome to ${site.name}`}>
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <Navbar />
        <div className="hero-layout">
          <div className="intro-card">
            <p className="hours"><span className="hours-dot" /> {site.hours.open} – {site.hours.close} <span aria-hidden="true">•</span> {site.hours.days}</p>
            <p className="eyebrow">{site.hero.eyebrow}</p>
            <h1>
              {site.hero.headline.map((line, index) => (
                <Fragment key={index}>
                  {index > 0 && <br />}
                  {index === site.hero.headline.length - 1 ? <em>{line}</em> : line}
                </Fragment>
              ))}
            </h1>
            <p className="intro-copy">{site.hero.description}</p>
            <div className="hero-actions">
              <Button variant="outline" href="#menu">{site.cta.secondary} <span aria-hidden="true">↗</span></Button>
              <Button href="#reservation">{site.cta.primary} <span aria-hidden="true">→</span></Button>
            </div>
          </div>
          <div className="featured-area" aria-live="polite">
            {loading && <div className="dish-loading" role="status">{site.featured.loading}</div>}
            {error && <div className="dish-error" role="alert">{error}</div>}
            {activeDish && <div key={activeDish.id} className="featured-dish">
              <span className="featured-note"><span className="note-line" /> {site.featured.note}</span>
              <img className="featured-bowl" src={activeDish.imageUrl} alt={activeDish.name} width="600" height="600" fetchPriority="high" />
              <span className="dish-caption">{site.featured.caption} <b>✳</b></span>
            </div>}
          </div>
        </div>
        <div className="carousel-wrap" id="menu">
          {!loading && !error && <DishCarousel dishes={dishes} activeIndex={activeIndex} onSelect={setActiveIndex} />}
        </div>
      </section>
      <section className="reservation-anchor" id="reservation" aria-label="Reservations"><span className="reservation-kicker">{site.reservation.kicker}</span><h2>{site.reservation.heading}</h2><p>{site.reservation.description}</p></section>
    </main>
  )
}
