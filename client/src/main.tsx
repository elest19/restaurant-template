import React from 'react'
import ReactDOM from 'react-dom/client'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MenuSection } from './components/MenuSection'
import { Navbar } from './components/Navbar'
import { LegalDialogHost } from './components/LegalDialog'
import { ReservationSection } from './components/ReservationSection'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
    <main>
      <Hero />
      <MenuSection />
      <AboutSection />
      <ContactSection />
      <ReservationSection />
    </main>
    <Footer />
    <LegalDialogHost />
  </React.StrictMode>,
)
