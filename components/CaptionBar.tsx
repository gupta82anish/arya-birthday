import { useState } from 'react'
import { useSwiper } from 'swiper/react'
import { Slide } from './Slideshow';
  
  // Helper to sync caption with active slide
  function ActiveCaption({ slides }: { slides: Slide[] }) {
    const [active, setActive] = useState(0)
  
    // Access the Swiper instance from context and bind events
    const swiper = useSwiper()
    // When rendered the first time, swiper might be undefined until inside a slide—so we attach via effect if present
    if (swiper && !swiper.destroyed) {
      // Guard: avoid stacking listeners
      // @ts-ignore - Swiper types don't expose ._captionHook to us; attach once
      if (!(swiper as any)._captionHook) {
        swiper.on('slideChange', () => setActive(swiper.realIndex ?? swiper.activeIndex ?? 0))
        ;(swiper as any)._captionHook = true
      }
    }
  
    const caption = slides[active]?.caption
    if (!caption) return null
  
    return (
      <div className="mt-3 text-center text-base bg-white/80 rounded-md px-3 py-1 max-w-2xl">
        {caption}
      </div>
    )
  }


 export default function CaptionBar({ slides }: { slides: Slide[] }) {
    // Swiper renders only the active slide visibly; easiest caption is to overlay via CSS + Swiper's .swiper-slide-active
    // For simplicity, we’ll just show the caption below using the first slide’s caption on mount,
    // and let Swiper handle active slide accessibility (aria-live). For dynamic caption sync,
    // use Swiper's onSlideChange and local state (shown below).
  
    // Bonus: dynamic caption synced to active index
    // We’ll use a small client-only hook to read active index via Swiper events.
    return (
      <ActiveCaption slides={slides} />
    )
  }