import { useEffect, useState } from 'react'
import { site } from '../data/site'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const [heroInView, setHeroInView] = useState(true)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const hero = document.querySelector('#home')
    if (!hero) return
    const heroObserver = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), { threshold: 0 })
    heroObserver.observe(hero)
    return () => heroObserver.disconnect()
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = ['#home', '#menu', '#about', '#contact']
      .map((selector) => document.querySelector(selector))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    if (sections.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length === 0) {
        setActiveLink('')
        return
      }

      const nextSection = visible[0].target.id
      const nextLink = `#${nextSection}`
      const allowedLink = site.nav.some((link) => link.href === nextLink)
      setActiveLink(allowedLink ? nextLink : '#home')
    }, {
      threshold: [0, 0.2, 0.5, 0.8, 1],
      rootMargin: '-35% 0px -55% 0px',
    })

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header">
      <a className={`brand-mark${heroInView ? ' is-hidden' : ''}`} href="#home" aria-label={`${site.name} home`}>
        <img src={site.logo.src} alt={site.logo.alt} className="brand-mark__logo" />
      </a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      <nav className={`nav-panel ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="nav-links">
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeLink === link.href ? 'is-active' : ''}
              aria-current={activeLink === link.href ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a className="nav-book" href="#reservation" onClick={() => setMenuOpen(false)}>{site.cta.navBook} <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  )
}
