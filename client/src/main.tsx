import React from 'react'
import ReactDOM from 'react-dom/client'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MenuSection } from './components/MenuSection'
import { ReservationSection } from './components/ReservationSection'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Hero />
    <MenuSection />
    <AboutSection />
    <ContactSection />
    <ReservationSection />
    <Footer />
  </React.StrictMode>,
)
