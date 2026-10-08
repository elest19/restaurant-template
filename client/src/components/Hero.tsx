import { useEffect, useState } from 'react'
import { useDishes } from '../hooks/useDishes'
import { Button } from './Button'
import { DishCarousel } from './DishCarousel'
import { Navbar } from './Navbar'

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
      <section className="hero" id="home" aria-label="Welcome to The Green Table">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <Navbar />
        <div className="hero-layout">
          <div className="intro-card">
            <p className="hours"><span className="hours-dot" /> 8:00 AM – 5:00 PM <span aria-hidden="true">•</span> MONDAY – SUNDAY</p>
            <p className="eyebrow">GROWN WITH CARE · COOKED WITH LOVE</p>
            <h1>Good food.<br />Good roots.<br /><em>Good together.</em></h1>
            <p className="intro-copy">A little taste of home, made fresh with ingredients from our local farmers.</p>
            <div className="hero-actions">
              <Button variant="outline" href="#menu">View menu <span aria-hidden="true">↗</span></Button>
              <Button href="#reservation">Book a table <span aria-hidden="true">→</span></Button>
            </div>
          </div>
          <div className="featured-area" aria-live="polite">
            {loading && <div className="dish-loading" role="status">Setting the table…</div>}
            {error && <div className="dish-error" role="alert">{error}</div>}
            {activeDish && <div key={activeDish.id} className="featured-dish">
              <span className="featured-note"><span className="note-line" /> From our kitchen</span>
              <img className="featured-bowl" src={activeDish.imageUrl} alt={activeDish.name} width="600" height="600" fetchPriority="high" />
              <span className="dish-caption">A bowl full of comfort <b>✳</b></span>
            </div>}
          </div>
        </div>
        <div className="carousel-wrap" id="menu">
          {!loading && !error && <DishCarousel dishes={dishes} activeIndex={activeIndex} onSelect={setActiveIndex} />}
        </div>
      </section>
      <section className="reservation-anchor" id="reservation" aria-label="Reservations"><span className="reservation-kicker">A seat is waiting for you</span><h2>Come hungry. Leave happy.</h2><p>Reservations are coming soon. We can’t wait to welcome you.</p></section>
    </main>
  )
}
