export interface SiteConfig {
  name: string
  tagline: string
  logo: {
    src: string
    alt: string
  }
  hours: {
    open: string
    close: string
    days: string
  }
  hero: {
    eyebrow: string
    headline: string[]
    description: string
    dishSlugs: string[]
  }
  nav: {
    label: string
    href: string
  }[]
  cta: {
    primary: string
    secondary: string
    navBook: string
  }
  reservation: {
    kicker: string
    heading: string
    description: string
    sectionLabel: string
  }
  contact: {
    phone: string
    email: string
    address: {
      street: string
      city: string
      postcode: string
    }
    socials: {
      label: string
      href: string
    }[]
  }
  featured: {
    note: string
    caption: string
    loading: string
  }
  dishTabs: {
    regionLabel: string
  }
}

export const site: SiteConfig = {
  name: 'The Green Table',
  tagline: 'Fresh from our kitchen',
  logo: {
    src: '/images/logo.svg',
    alt: 'The Green Table logo',
  },
  hours: {
    open: '8:00 AM',
    close: '5:00 PM',
    days: 'MONDAY – SUNDAY',
  },
  hero: {
    eyebrow: 'GROWN WITH CARE · COOKED WITH LOVE',
    headline: ['Good food. Good roots.', 'Good together.'],
    // Not rendered in markup; kept for reuse in later layouts.
    description: 'A little taste of home, made fresh with ingredients from our local farmers.',
    dishSlugs: ['tinolang-manok', 'chicken-adobo', 'kare-kare', 'pancit-bihon'],
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
    navBook: 'Book reservation',
  },
  reservation: {
    kicker: 'A seat is waiting for you',
    heading: 'Come hungry. Leave happy.',
    description: 'Reservations are coming soon. We can\'t wait to welcome you.',
    sectionLabel: 'Reservations',
  },
  contact: {
    phone: '+63 917 555 0142',
    email: 'hello@thegreentable.ph',
    address: {
      street: '128 Maginhawa Street',
      city: 'Quezon City',
      postcode: '1101',
    },
    socials: [
      { label: 'Instagram', href: '#' },
      { label: 'Facebook', href: '#' },
    ],
  },
  featured: {
    note: 'From our kitchen',
    caption: 'A bowl full of comfort',
    loading: 'Setting the table…',
  },
  dishTabs: {
    regionLabel: 'Featured dishes',
  },
}
