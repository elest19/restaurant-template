import type { Dish } from '../types/dish'

interface DishThumbnailProps {
  dish: Dish
  active: boolean
  onSelect: () => void
}

export function DishThumbnail({ dish, active, onSelect }: DishThumbnailProps) {
  return (
    <button type="button" className={`dish-thumbnail ${active ? 'is-active' : ''}`} aria-pressed={active} aria-label={`Show ${dish.name}`} onClick={onSelect}>
      <span className="thumbnail-shape">
        <img src={dish.imageUrl} alt="" width="112" height="112" loading="lazy" />
      </span>
      {active && <span className="thumbnail-label">{dish.name}</span>}
    </button>
  )
}
