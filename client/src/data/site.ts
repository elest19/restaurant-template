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
    favorites: {
      label: string
      linkLabel: string
    }
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
  menu: {
    label: string
    heading: string
    intro: string
    categories: {
      name: string
      description: string
    }[]
  }
  about: {
    label: string
    heading: string
    intro: string
    story: string
    owners: {
      name: string
      role: string
      bio: string
    }[]
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
  footer: {
    heading: string
    note: string
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
    favorites: {
      label: 'Guest Favorites',
      linkLabel: 'View full menu',
    },
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
  menu: {
    label: 'Menu',
    heading: 'Seasonal plates and slow-cooked comfort.',
    intro: 'The menu shifts with the market, with bright vegetables, grilled meats, and the kind of dishes that gather everyone around the table.',
    categories: [
      {
        name: 'Small Plates',
        description: 'Charred greens, crisp fritters, and shareable bites made for lingering conversation.',
      },
      {
        name: 'Rice & Noodle Bowls',
        description: 'Comforting foundations layered with broth, herbs, and a little heat from the kitchen.',
      },
      {
        name: 'Chef Specials',
        description: 'House favorites built for family-style dinners, generous portions, and second helpings.',
      },
    ],
  },
  about: {
    label: 'Our story',
    heading: 'A neighborhood kitchen rooted in gratitude and good ingredients.',
    intro: 'The Green Table started as a simple lunch counter for friends, neighbors, and the farmers who taught us how to cook with care.',
    story: 'We still work the same way: thoughtful sourcing, slow prep, and a menu that feels like home while celebrating the rhythm of the season.',
    owners: [
      {
        name: 'Mila Santos',
        role: 'Co-founder & culinary lead',
        bio: 'Mila brings a love of market produce and family recipes shaped by years of weekend cooking at her grandmother’s table.',
      },
      {
        name: 'Mateo Rivera',
        role: 'Co-founder & host',
        bio: 'Mateo keeps the room warm and welcoming, balancing service, music, and thoughtful details that make guests want to stay awhile.',
      },
    ],
  },
  reservation: {
    kicker: 'A seat is waiting for you',
    heading: 'Come hungry. Leave happy.',
    description: 'Reservations are coming soon. We can\'t wait to welcome you.',
    sectionLabel: 'Reservations',
  },
  contact: {
    phone: '+63 917 555 0142', // PLACEHOLDER
    email: 'hello@thegreentable.ph', // PLACEHOLDER
    address: {
      street: '128 Greenway Lane', // PLACEHOLDER
      city: 'Quezon City',
      postcode: '1101',
    },
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/thegreentable.ph' },
      { label: 'Facebook', href: 'https://facebook.com/thegreentable.ph' },
    ],
  },
  footer: {
    heading: 'Drop by for lunch, dinner, or a slow afternoon coffee.',
    note: 'We keep the lights warm, the table full, and the welcome easy.',
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
