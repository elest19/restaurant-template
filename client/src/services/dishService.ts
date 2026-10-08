import { dishes } from '../data/dishes'
import type { Dish } from '../types/dish'

// Swap this mock implementation for apiClient.get<Dish[]>('/dishes/featured') when the API is ready.
export async function getFeaturedDishes(): Promise<Dish[]> {
  return Promise.resolve(dishes)
}
