import { useState } from 'react'
import { site } from '../data/site'

type NavbarProps = {
  heroInView?: boolean
}

export function Navbar({ heroInView = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className={`brand-mark${heroInView ? ' is-hidden' : ''}`} href="#home" aria-label={`${site.name} home`}>Logo</a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      <nav className={`nav-panel ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="nav-links">
          {site.nav.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        </div>
        <a className="nav-book" href="#reservation" onClick={() => setMenuOpen(false)}>{site.cta.navBook} <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  )
}
