'use client'

import { useMemo, useState } from 'react'
import { SLIDE_INTERVAL } from '@/lib/config'
import type { LocalSlide } from '@/lib/localSlides'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, Keyboard, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import Image from 'next/image'

export type Slide = { src: string; caption?: string }

export default function Slideshow({ slides }: { slides: Slide[] | LocalSlide[] }) {
  const items = useMemo(() => slides ?? [], [slides])
  const [active, setActive] = useState(0)

  if (!items.length) return <p className="text-center opacity-70">No slides yet.</p>

  return (
    <div className="w-screen h-[100svh] flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl aspect-[3/4] sm:aspect-video rounded-2xl overflow-hidden shadow-lg bg-white/40 backdrop-blur">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, Keyboard, EffectFade]}
          loop
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: SLIDE_INTERVAL, disableOnInteraction: false, pauseOnMouseEnter: true }}
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          navigation
          onSwiper={(s) => setActive(s.realIndex ?? s.activeIndex ?? 0)}
          onSlideChange={(s) => setActive(s.realIndex ?? s.activeIndex ?? 0)}
          style={{ width: '100%', height: '100%' }}
        >
          {items.map((s, i) => (
            <SwiperSlide key={`${s.src}-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image src={s.src} alt={s.caption ?? `Slide ${i + 1}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {items[active]?.caption && (
        <div className="mt-3 text-center text-base bg-white/80 rounded-md px-3 py-1 max-w-2xl">
          {items[active].caption}
        </div>
      )}
    </div>
  )
}
