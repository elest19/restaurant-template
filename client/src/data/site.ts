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
    photos: {
      exterior: SitePhoto
      owners: SitePhoto
    }
  }
  contact: {
    eyebrow: string
    heading: string
    intro: string
    phone: string
    email: string
    address: {
      street: string
      city: string
      postcode: string
    }
    hours: {
      days: string
      hours: string
    }[]
    map: {
      label: string
      loading: string
      embedUrl: string
    }
    socials: {
      label: string
      href: string
    }[]
  }
  reservation: {
    eyebrow: string
    heading: string
    description: string
    steps: {
      heading: string
      items: {
        title: string
        text: string
      }[]
    }
    expect: {
      heading: string
      items: {
        text: string
        linkLabel?: string
        linkHref?: string
      }[]
    }
    form: {
      labels: {
        name: string
        phone: string
        email: string
        date: string
        time: string
        guests: string
        notes: string
      }
      optional: string
      phonePlaceholder: string
      timePlaceholder: string
      guestsHint: string
      consent: {
        agreeBefore: string
        termsLabel: string
        agreeBetween: string
        privacyLabel: string
        agreeAfter: string
        requiredError: string
        version: string
      }
      nextLine: string
      submit: string
      submitting: string
      errorPrefix: string
      successLead: string
      makeAnother: string
      honeypotLabel: string
    }
    legal: {
      closeLabel: string
      updatedLabel: string
      terms: LegalDoc
      privacy: LegalDoc
    }
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

interface SitePhoto {
  src: string
  alt: string
  width: number
  height: number
  caption: string
}

interface LegalSection {
  heading: string
  body: string[]
  link?: {
    label: string
    href: string
  }
}

interface LegalDoc {
  title: string
  updated: string
  sections: LegalSection[]
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
    eyebrow: 'Our Story',
    heading: 'About Us',
    story: 'The Green Table started as a small lunch counter for neighbors, market vendors, and the farmers who taught us to cook with whatever the season brings. We still plan the menu around the morning market, slow down for shared plates and hot soup, and keep the room easy for long catch-ups, family lunches, and quiet merienda breaks. Come hungry, stay a while, and eat like you are home.',
    ownersEyebrow: 'Meet the Owners',
    ownersText: 'The Green Table is run by two home cooks who grew up on lutong-bahay weekends and market mornings. One leads the kitchen and keeps the classics tasting familiar, while the other looks after the dining room and makes sure every table feels welcome. Around them is a small crew of neighbors and friends who prep, serve, and clean up like family.',
    photos: {
      exterior: {
        src: '/images/about/Restaurant.webp',
        alt: 'The Green Table dining room, seen from the street, wooden tables and warm afternoon light',
        width: 1200,
        height: 750,
        caption: 'The Green Table, from the street',
      },
      owners: {
        src: '/images/about/Owners.webp',
        alt: 'The two owners of The Green Table standing together behind the counter',
        width: 800,
        height: 600,
        caption: 'The owners',
      },
    },
  },
  reservation: {
    eyebrow: 'Reservations',
    heading: 'Book a Table',
    description: 'Send us your preferred date and time, and we will call or email to confirm your table.',
    steps: {
      heading: 'How it works',
      items: [
        { title: 'Send your request', text: 'Choose your date, time, and party size.' },
        { title: 'We confirm', text: 'We will call or email you to confirm your table.' },
        { title: 'Enjoy your visit', text: 'Arrive at your time and we will have your table ready.' },
      ],
    },
    expect: {
      heading: 'What to expect',
      items: [
        { text: 'No payment or deposit is needed to request a table.' },
        { text: 'We hold your table for 15 minutes after your reservation time.' },
        { text: 'Need to change or cancel?', linkLabel: 'Contact us.', linkHref: '#contact' },
      ],
    },
    form: {
      labels: {
        name: 'Full name',
        phone: 'Phone',
        email: 'Email',
        date: 'Date',
        time: 'Time',
        guests: 'Guests',
        notes: 'Notes',
      },
      optional: 'optional',
      phonePlaceholder: '09XX XXX XXXX',
      timePlaceholder: 'Choose a time',
      guestsHint: '13 or more? Please call us.',
      consent: {
        agreeBefore: 'I agree to the',
        termsLabel: 'Terms of Service',
        agreeBetween: 'and',
        privacyLabel: 'Privacy Policy',
        agreeAfter: '.',
        requiredError: 'Please agree to the terms and privacy policy to continue.',
        version: '2026-10-10',
      },
      nextLine: 'Next: we will contact you to confirm your table.',
      submit: 'Request reservation',
      submitting: 'Sending your request…',
      errorPrefix: 'We couldn’t send your request. Please try again, or call us at',
      successLead: 'Request received. We will confirm by phone or email.',
      makeAnother: 'Make another request',
      honeypotLabel: 'Company',
    },
    legal: {
      closeLabel: 'Close',
      updatedLabel: 'Last updated',
      terms: {
        title: 'Terms of Service',
        updated: 'October 10, 2026',
        sections: [
          {
            heading: 'Reservation requests',
            body: [
              'A reservation request sent through this form is not a confirmed booking.',
              'Your table is confirmed only after the restaurant confirms your request by phone or email.',
            ],
          },
          {
            heading: 'Table hold',
            body: [
              'Confirmed tables are held for 15 minutes after the reservation time.',
              'If you are running late, contact us and we will do our best to keep your table.',
            ],
          },
          {
            heading: 'Changes, cancellations, and large groups',
            body: [
              'To change or cancel a request, contact the restaurant directly.',
              'Requests for groups of 10 or more may need to be arranged by phone.',
              'The restaurant may decline or reschedule a request when the dining room is full or for operational reasons.',
            ],
          },
          {
            heading: 'Your information',
            body: [
              'Please give accurate contact details so we can reach you about your request.',
              'The restaurant handles your details as described in the Privacy Policy.',
            ],
          },
        ],
      },
      privacy: {
        title: 'Privacy Policy',
        updated: 'October 10, 2026',
        sections: [
          {
            heading: 'What we collect',
            body: [
              'When you send a reservation request, we collect the details you provide: your name, phone number, email address (if given), notes (if given), and your requested date, time, and party size.',
            ],
          },
          {
            heading: 'Why we collect it',
            body: [
              'We use these details to handle your reservation request and to contact you about it.',
              'We do not use your details for marketing unless you ask us to.',
            ],
          },
          {
            heading: 'Who can see it',
            body: [
              'Only the restaurant team members who handle reservations and service can see your details.',
              'We do not sell your details to anyone.',
            ],
          },
          {
            heading: 'How long we keep it',
            body: [
              'We keep reservation details for 12 months after your visit, then delete them.',
              'Details from a request that was never confirmed are deleted after 3 months.',
            ],
          },
          {
            heading: 'Your rights',
            body: [
              'You may ask to see, correct, or delete your details at any time.',
              'To make a request about your details, contact us through the details below.',
            ],
          },
          {
            heading: 'How to contact us',
            body: ['For anything about your details or this policy, get in touch with the restaurant.'],
            link: { label: 'Contact us', href: '#contact' },
          },
        ],
      },
    },
  },
  contact: {
    eyebrow: 'Find us',
    heading: 'Visit The Green Table',
    intro: 'Stop by for lunch or a long merienda — the dining room is easy to find, and the kitchen will keep you comfortable all afternoon.',
    phone: '+63 917 555 0142', // PLACEHOLDER: fictional phone, replace per client.
    email: 'hello@thegreentable.ph', // PLACEHOLDER: fictional email, replace per client.
    address: {
      street: '128 Greenway Lane', // PLACEHOLDER: fictional street, replace per client.
      city: 'Quezon City', // PLACEHOLDER: fictional city district, replace per client.
      postcode: '1101', // PLACEHOLDER: fictional postcode, replace per client.
    },
    hours: [{ days: 'MONDAY – SUNDAY', hours: '8:00 AM to 5:00 PM' }],
    map: {
      label: 'Quezon City, Philippines',
      loading: 'Loading map…',
      embedUrl:
        'https://www.openstreetmap.org/export/embed.html?bbox=120.9782,14.5935,120.9902,14.6055&layer=mapnik&marker=14.5995,120.9842',
    },
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
