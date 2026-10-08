import { useRef, type TouchEvent } from 'react'
import type { Dish } from '../types/dish'
import { DishThumbnail } from './DishThumbnail'

interface DishCarouselProps {
  dishes: Dish[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function DishCarousel({ dishes, activeIndex, onSelect }: DishCarouselProps) {
  const touchStartX = useRef<number | null>(null)
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchStartX.current = event.touches[0]?.clientX ?? null }
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0]?.clientX
    if (touchStartX.current === null || endX === undefined || Math.abs(endX - touchStartX.current) < 40) return
    onSelect((activeIndex + (endX < touchStartX.current ? 1 : -1) + dishes.length) % dishes.length)
  }

  if (dishes.length === 0) return null

  return (
    <div className="carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-label="Featured dishes">
      <button className="carousel-arrow carousel-arrow--prev" type="button" aria-label="Previous dish" onClick={() => onSelect((activeIndex - 1 + dishes.length) % dishes.length)}>←</button>
      <div className="carousel-track" role="listbox" aria-label="Choose a featured dish">
        {dishes.map((dish, index) => (
          <div role="option" aria-selected={activeIndex === index} key={dish.id} className="carousel-item">
            <DishThumbnail dish={dish} active={activeIndex === index} onSelect={() => onSelect(index)} />
          </div>
        ))}
      </div>
      <button className="carousel-arrow carousel-arrow--next" type="button" aria-label="Next dish" onClick={() => onSelect((activeIndex + 1) % dishes.length)}>→</button>
    </div>
  )
}
