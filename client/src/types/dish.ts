export interface Dish {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  price?: number
  isFeatured?: boolean
}
