import type { Dish } from '../types/dish'

const images = {
  tinola: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
  adobo: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85',
  kareKare: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
  pancit: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85',
  sinigang: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
}

export const dishes: Dish[] = [
  { id: '1', name: 'Tinolang Manok', slug: 'tinolang-manok', description: 'Ginger chicken broth with green papaya and fresh malunggay.', imageUrl: images.tinola, isFeatured: true },
  { id: '2', name: 'Chicken Adobo', slug: 'chicken-adobo', description: 'A beloved classic, slow-braised with soy, vinegar, and garlic.', imageUrl: images.adobo },
  { id: '3', name: 'Kare-Kare', slug: 'kare-kare', description: 'Rich peanut stew with garden vegetables and bagoong.', imageUrl: images.kareKare },
  { id: '4', name: 'Pancit Bihon', slug: 'pancit-bihon', description: 'Rice noodles tossed with market vegetables and citrus.', imageUrl: images.pancit },
  { id: '5', name: 'Sinigang na Baboy', slug: 'sinigang-na-baboy', description: 'A bright tamarind broth with tender pork and seasonal greens.', imageUrl: images.sinigang },
]
