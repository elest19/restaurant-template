import { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { Dish } from '../types/dish'
import { DishThumbnail } from './DishThumbnail'
import { site } from '../data/site'

interface DishCarouselProps {
  dishes: Dish[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function DishCarousel({ dishes, activeIndex, onSelect }: DishCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const handleEmblaSelect = useCallback(() => {
    if (emblaApi) onSelect(emblaApi.selectedScrollSnap())
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', handleEmblaSelect)
    return () => { emblaApi.off('select', handleEmblaSelect) }
  }, [emblaApi, handleEmblaSelect])

  useEffect(() => {
    if (!emblaApi) return
    if (emblaApi.selectedScrollSnap() !== activeIndex) emblaApi.scrollTo(activeIndex)
  }, [emblaApi, activeIndex])

  if (dishes.length === 0) return null

  return (
    <div className="carousel" aria-label={site.carousel.regionLabel}>
      <button className="carousel-arrow carousel-arrow--prev" type="button" aria-label={site.carousel.previousLabel} onClick={() => emblaApi?.scrollPrev()}>←</button>
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-track" role="listbox" aria-label={site.carousel.trackLabel}>
          {dishes.map((dish, index) => (
            <div role="option" aria-selected={activeIndex === index} key={dish.id} className="carousel-item">
              <DishThumbnail dish={dish} active={activeIndex === index} onSelect={() => onSelect(index)} />
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-arrow carousel-arrow--next" type="button" aria-label={site.carousel.nextLabel} onClick={() => emblaApi?.scrollNext()}>→</button>
    </div>
  )
}
