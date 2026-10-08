export interface SiteConfig {
  name: string
  tagline: string
  hours: {
    open: string
    close: string
    days: string
  }
  hero: {
    eyebrow: string
    headline: string
    description: string
  }
  nav: {
    label: string
    href: string
  }[]
  cta: {
    primary: string
    secondary: string
  }
  reservation: {
    kicker: string
    heading: string
    description: string
  }
}

export const site: SiteConfig = {
  name: 'The Green Table',
  tagline: 'Fresh from our kitchen',
  hours: {
    open: '8:00 AM',
    close: '5:00 PM',
    days: 'MONDAY – SUNDAY',
  },
  hero: {
    eyebrow: 'GROWN WITH CARE · COOKED WITH LOVE',
    headline: 'Good food. Good roots. Good together.',
    description: 'A little taste of home, made fresh with ingredients from our local farmers.',
  },
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: {
    primary: 'Book a table',
    secondary: 'View menu',
  },
  reservation: {
    kicker: 'A seat is waiting for you',
    heading: 'Come hungry. Leave happy.',
    description: 'Reservations are coming soon. We can\'t wait to welcome you.',
  },
}
