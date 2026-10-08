export interface Dish {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  caption?: string
  price?: number
  isFeatured?: boolean
}
