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
    eyebrow: string
    heading: string
    description: string
    categories: {
      id: string
      title: string
      image: string
      alt: string
      href: string
      items?: string[]
    }[]
  }
  about: {
    eyebrow: string
    heading: string
    story: string
    ownersEyebrow: string
    ownersText: string
  }
  contact: {
    eyebrow: string
    heading: string
    phone: string
    email: string
    address: {
      street: string
      city: string
      postcode: string
    }
    hoursNote: string
    socials: {
      label: string
      href: string
    }[]
  }
  reservation: {
    eyebrow: string
    heading: string
    description: string
  }
  footer: {
    blurb: string
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
    eyebrow: 'Our menu',
    heading: 'Menu',
    description: 'Seasonal plates and slow-cooked comfort, made for sharing around the table.',
    categories: [
      {
        id: 'best-sellers',
        title: 'Best Sellers',
        image: '/images/menu/Meals.webp',
        alt: 'Signature shared plates from The Green Table kitchen',
        href: '#menu',
      },
      {
        id: 'meals',
        title: 'Meals',
        image: '/images/menu/Soups.webp',
        alt: 'Hearty bowls of soup and slow-cooked comfort food',
        href: '#menu',
      },
      {
        id: 'drinks',
        title: 'Drinks',
        image: '/images/menu/Drinks.webp',
        alt: 'Fresh calamansi coolers and house-made drinks',
        href: '#menu',
      },
      {
        id: 'desserts',
        title: 'Desserts',
        image: '/images/menu/Desserts.webp',
        alt: 'Coconut desserts and sweet afternoon treats',
        href: '#menu',
      },
      {
        id: 'food-bundles',
        title: 'Food Bundles',
        image: '/images/menu/Food-Bundles.webp',
        alt: 'Family bundles for sharing, packed with rice, mains, and sides',
        href: '#menu',
      },
    ],
  },
  about: {
    eyebrow: 'Our story',
    heading: 'About us',
    story: 'The Green Table began as a small lunch counter for neighbors and the farmers who taught us to cook with care.',
    ownersEyebrow: 'Meet the owners',
    ownersText: 'Full story and portraits arrive in the next phase.',
  },
  reservation: {
    eyebrow: 'Reservations',
    heading: 'Book a table',
    description: 'Reservations open here soon. Call us and we will save you a seat.',
  },
  contact: {
    eyebrow: 'Find us',
    heading: 'Visit The Green Table',
    phone: '+63 917 555 0142', // PLACEHOLDER: fictional phone, replace per client.
    email: 'hello@thegreentable.ph', // PLACEHOLDER: fictional email, replace per client.
    address: {
      street: '128 Greenway Lane', // PLACEHOLDER: fictional street, replace per client.
      city: 'Quezon City', // PLACEHOLDER: fictional city district, replace per client.
      postcode: '1101', // PLACEHOLDER: fictional postcode, replace per client.
    },
    hoursNote: 'Open daily, 8:00 AM – 5:00 PM.',
    socials: [
      { label: 'Instagram', href: 'https://instagram.com/thegreentable.ph' },
      { label: 'Facebook', href: 'https://facebook.com/thegreentable.ph' },
    ],
  },
  footer: {
    blurb: 'A neighborhood kitchen serving seasonal plates and slow afternoons.',
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
