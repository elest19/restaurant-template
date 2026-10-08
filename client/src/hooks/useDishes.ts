import { useEffect, useState } from 'react'
import { getFeaturedDishes } from '../services/dishService'
import type { Dish } from '../types/dish'

interface UseDishesResult {
  dishes: Dish[]
  loading: boolean
  error: string | null
}

export function useDishes(): UseDishesResult {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    getFeaturedDishes()
      .then((result) => { if (mounted) setDishes(result) })
      .catch(() => { if (mounted) setError('We could not load the menu. Please try again.') })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return { dishes, loading, error }
}
