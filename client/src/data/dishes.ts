import type { Dish } from '../types/dish'

const images = {
  tinola: '/images/dishes/tinolang-manok.webp',
  adobo: '/images/dishes/chicken-adobo.webp',
  kareKare: '/images/dishes/kare-kare.webp',
  pancit: '/images/dishes/pancit-bihon.webp',
}

export const dishes: Dish[] = [
  { id: '1', name: 'Tinolang Manok', slug: 'tinolang-manok', description: 'Ginger chicken broth with green papaya and fresh malunggay.', imageUrl: images.tinola, caption: 'Ginger broth, tender chicken', isFeatured: true },
  { id: '2', name: 'Chicken Adobo', slug: 'chicken-adobo', description: 'A beloved classic, slow-braised with soy, vinegar, and garlic.', imageUrl: images.adobo, caption: 'Slow-simmered in soy and vinegar' },
  { id: '3', name: 'Kare-Kare', slug: 'kare-kare', description: 'Rich peanut stew with garden vegetables and bagoong.', imageUrl: images.kareKare, caption: 'Rich peanut sauce, tender oxtail' },
  { id: '4', name: 'Pancit Bihon', slug: 'pancit-bihon', description: 'Rice noodles tossed with market vegetables and citrus.', imageUrl: images.pancit, caption: 'Light noodles, fresh vegetables' },
]
