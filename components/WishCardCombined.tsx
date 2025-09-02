'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import SpriteLayer from './SpritesLayer'
import useIsSmall from './isSmall.hook'

type Wish = { id: string; name: string; message: string; image_url?: string | null }

export default function WishCardCombined({
  open,
  onClose,
  wish,
}: { open: boolean; onClose: () => void; wish: Wish }) {
  const seed = useMemo(() => Math.random(), [open])
  const isSmall = useIsSmall()

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50"  onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Container */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            {isSmall ? (
              <MobileCard open={open} wish={wish} seed={seed} onClose={onClose} />
            ) : (
            //   <DesktopBookCard wish={wish} seed={seed} onClose={onClose} />
            <DesktopBookCardClassic wish={wish} onClose={onClose} seed={seed} autoOpen={false} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ----------------- Mobile: stacked card ----------------- */
function MobileCard({ open, wish, seed, onClose }: { open: boolean; wish: Wish; seed: number; onClose: () => void }) {
    return (
        <AnimatePresence>
          {open && (
            <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
    
              {/* Card */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-4"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 20 }}
              >
                <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
                  {/* Gradient base */}
                  <div className="absolute inset-0 bg-gradient-to-b from-pastelSky/70 via-pastelPeach/70 to-pastelMint/70" />
    
                  {/* Edge sprites ABOVE gradient, visible in outer margin */}
                  <SpriteLayer count={18} seed={seed} variant="border" className="z-10" />
    
                  {/* Inner content block leaves a margin so sprites are visible around edges */}
                  <div className="relative z-20 m-5 sm:m-7 rounded-2xl p-4 sm:p-6 flex flex-col h-[calc(100vh-8rem)] max-h-[600px]">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-semibold">Happy Birthday 🎂</div>
                      <div className="mt-1 text-sm opacity-70">From {wish.name}</div>
                    </div>
    
                    {wish.image_url && (
                      <div className="mt-4 rounded-2xl overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={wish.image_url} alt={wish.name} className="w-full max-h-[30vh] object-cover" />
                      </div>
                    )}
    
                    <div className="flex-1 overflow-y-auto mt-4">
                      <p className="text-base leading-relaxed whitespace-pre-wrap text-center">
                        {wish.message}
                      </p>
                    </div>
    
                    {/* Bottom garland sits UNDER the text but inside the inner block */}
                    <div className="relative mt-4 flex-shrink-0">
                      {/* z-0 so it's below the surrounding text/content */}
                      <SpriteLayer count={12} seed={seed + 1} variant="bottom" className="z-0" />
                    </div>
    
                    <div className="mt-6 flex items-center justify-center flex-shrink-0">
                      <button onClick={onClose} className="rounded-full bg-black text-white px-5 py-2 text-sm shadow z-50">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )
}

/* ----------------- Desktop: 3D book layout ----------------- */
/* ----------------- Desktop: 3D book layout (pronounced) ----------------- */
/* ----------------- Desktop: spine-hinge book (no global tilt) ----------------- */
import { useMotionValue, useTransform } from 'framer-motion'
import { useCallback, useRef } from 'react'
import Image from 'next/image'

function DesktopBookCard({ wish, seed, onClose }: { wish: any; seed: number; onClose: () => void }) {
    const ref = useRef<HTMLDivElement | null>(null)
  
    // Hinge (mouse x) to flex pages around the spine
    const hinge = useMotionValue(0.5)
    const onMove = useCallback((e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      hinge.set(Math.min(1, Math.max(0, x)))
    }, [hinge])
    const onLeave = () => hinge.set(0.5)
  
    const leftRot  = useTransform(hinge, [0,   0.5, 1], [16, 9, 5])
    const rightRot = useTransform(hinge, [0,   0.5, 1], [-5, -9, -16])
  
    const Spine = () => (
      <>
        <div className="absolute inset-y-0 left-1/2 -ml-[1px] w-[2px] bg-black/20 z-30" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[40%] -translate-x-1/2 bg-gradient-to-l from-black/12 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[40%]  translate-x-1/2 bg-gradient-to-r from-black/12 to-transparent z-20" />
      </>
    )
  
    return (
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative overflow-visible"
        style={{
          perspective: 1400,
          width: 'min(95vw, 1280px)',   // wider
          height: 'min(82svh, 860px)',  // taller
        }}
      >
        {/* soft ground shadow */}
        <div className="absolute -inset-x-8 bottom-2 h-14 bg-black/20 blur-2xl rounded-[100%] opacity-35" />
  
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-pastelSky/70 via-pastelPeach/70 to-pastelMint/70" />
  
          {/* Edge sprite frame (more sprites for bigger canvas) */}
          <SpriteLayer count={26} seed={seed} variant="border" className="z-10" />
  
          {/* Book (preserve-3d) */}
          <div className="absolute inset-0 z-20" style={{ transformStyle: 'preserve-3d' as any }}>
            <Spine />
  
            {/* Left page (photo) */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full origin-right rounded-l-3xl overflow-hidden bg-white/85 backdrop-blur ring-1 ring-black/10"
              style={{
                transformStyle: 'preserve-3d' as any,
                rotateY: leftRot,
                boxShadow: 'inset -16px 0 28px -18px rgba(0,0,0,0.28)',
              }}
              initial={{ rotateY: 24 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.05 }}
            >
              {wish.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={wish.image_url} alt={wish.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-sm opacity-70">No photo provided</div>
              )}
            </motion.div>
  
            {/* Right page (text) — scrollable middle */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 h-full origin-left rounded-r-3xl overflow-hidden bg-white/95 backdrop-blur ring-1 ring-black/10"
              style={{
                transformStyle: 'preserve-3d' as any,
                rotateY: rightRot,
                boxShadow: 'inset 16px 0 28px -18px rgba(0,0,0,0.28)',
              }}
              initial={{ rotateY: -24 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 0.12 }}
            >
              <div className="absolute inset-0 flex flex-col">
                {/* Header (fixed) */}
                <div className="px-9 py-7 text-center shrink-0">
                  <div className="text-[clamp(22px,2.4vw,34px)] font-semibold">Happy Birthday 🎂</div>
                  <div className="mt-1 text-sm opacity-70">From {wish.name}</div>
                </div>
  
                {/* Scrollable message */}
                <div className="relative flex-1 min-h-0">
                  <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/95 to-transparent z-10" />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/95 to-transparent z-10" />
                  <div className="h-full overflow-y-auto px-9 pb-7 pr-7
                                  [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,.25)_transparent]">
                    <p className="text-[clamp(14px,1.15vw,18px)] leading-relaxed whitespace-pre-wrap text-center">
                      {wish.message}
                    </p>
                  </div>
                </div>
  
                {/* Bottom garland (fixed) */}
                <div className="relative h-24 shrink-0">
                  <SpriteLayer count={12} seed={seed + 1} variant="bottom" className="z-0" />
                </div>
  
                {/* Close */}
                <div className="px-9 pb-7 flex items-center justify-center shrink-0">
                  <button onClick={onClose} className="rounded-full bg-black text-white px-6 py-2.5 text-sm shadow">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
}



function DesktopBookCardClassic({
    wish,
    onClose,
    seed,
    autoOpen = true,
    }: {
    wish: Wish
    onClose: () => void
    seed: number
    autoOpen?: boolean
    }) {
    const [open, setOpen] = useState(false)

        // Auto open shortly after mount for a nice reveal
    useEffect(() => {
        if (!autoOpen) return
        const id = setTimeout(() => setOpen(true), 200)
        return () => clearTimeout(id)
    }, [autoOpen])

    return (
            <div
            className={`card ${open ? 'open' : ''}`}
            onMouseEnter={() => setOpen(true)}
            // keep open; comment next line if you want it to close on mouse leave
            // onMouseLeave={() => setOpen(false)}
            >
            <div className="outside">
                <div className="front">
                <p>Happy Birthday</p>
                <div className="cake">
                    <div className="top-layer"></div>
                    <div className="middle-layer"></div>
                    <div className="bottom-layer"></div>
                    <div className="candle"></div>
                </div>
                </div>
                <div className="back">
                {wish.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image
                        src={wish.image_url}
                        alt={wish.name}
                        className="photo"
                        width={500}
                        height={500}
                    />
                ) : null}
                </div>
            </div>

            <div className="inside">
                <div className="insideContent">
                <SpriteLayer count={26} seed={seed} variant="border" className="z-10" />
                <div className="title">Happy Birthday 🎂</div>
                {/* <p className="message">{wish.message}</p> */}
                <div className="scrollArea">
                    <p className="message">{wish.message}</p>
                    <div className="from">— {wish.name}</div>
                </div>
                <div className="relative h-24 shrink-0">
                  <SpriteLayer count={12} seed={seed + 1} variant="bottom" className="z-0" />
                </div>

                <button className="closeBtn z-50" onClick={onClose}>
                    Close
                </button>
                </div>
            </div>

            {/* Scoped styles (styled-jsx) */}
            <style jsx>{`
                .card {
                position: relative;
                width: min(95vw, 900px);
                height: min(95svh, 760px);
                margin: 0 auto;
                perspective: 1200px;
                transition: transform 1s ease;
                }
                .card:hover {
                transform: rotate(-3deg);
                }
                .outside,
                .inside {
                height: 100%;
                width: 50%;
                position: absolute;
                left: 50%;
                top: 0;
                }
                .inside {
                background: linear-gradient(to right, #e7e7e7, #ffffff 30%);
                display: flex;
                align-items: stretch;
                justify-content: center;
                padding: 0;
                line-height: 1.5;
                text-align: center;
                }
                .insideContent {
                /* create an inner page with padding and scrolling body */
                background: transparent;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 18px 18px 16px;
                gap: 12px;
                height: 100%;
                display: flex;
                flex-direction: column;
                }
                .photo {
                width: 100%;
                max-height: 42vh;
                object-fit: cover;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
                }
                .title {
                font-size: clamp(18px, 2.2vw, 28px);
                font-weight: 600;
                }
                .message {
                white-space: pre-wrap;
                padding: 0 6px;
                font-size: clamp(14px, 1.2vw, 18px);
                }
                .from {
                opacity: 0.7;
                font-size: 0.9em;
                }
                .closeBtn {
                margin-top: auto;
                border: none;
                border-radius: 999px;
                padding: 10px 16px;
                background: #000;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
                }

                .outside {
                transform-style: preserve-3d;
                z-index: 2;
                transform-origin: left;
                transition: transform 1.4s ease;
                cursor: pointer;
                }
                .front,
                .back {
                height: 100%;
                width: 100%;
                position: absolute;
                backface-visibility: hidden;
                }
                .front {
                background: #ffffff;
                }
                .back {
                transform: rotateY(180deg);
                background: linear-gradient(to left, #e7e7e7, #ffffff 30%);
                }

                /* Cover design */
                .front p {
                font-size: clamp(18px, 2vw, 23px);
                text-transform: uppercase;
                margin-top: 22px;
                text-align: center;
                letter-spacing: 6px;
                color: #000046;
                }
                .cake {
                width: 100%;
                position: absolute;
                bottom: 30px;
                }
                .top-layer,
                .middle-layer,
                .bottom-layer {
                height: 80px;
                width: 240px;
                background-repeat: repeat;
                background-size: 60px 100px;
                background-position: 28px 0;
                background-image: linear-gradient(
                    transparent 50px,
                    #fedbab 50px,
                    #fedbab 60px,
                    transparent 60px
                    ),
                    radial-gradient(circle at 30px 5px, #994c10 30px, #fcbf29 31px);
                border-radius: 10px 10px 0 0;
                position: relative;
                margin: auto;
                }
                .middle-layer {
                transform: scale(0.85);
                top: 6px;
                }
                .top-layer {
                transform: scale(0.7);
                top: 26px;
                }
                .candle {
                height: 45px;
                width: 15px;
                background: repeating-linear-gradient(
                    45deg,
                    #fd3018 0,
                    #fd3018 5px,
                    #ffa89e 5px,
                    #ffa89e 10px
                );
                position: absolute;
                margin: auto;
                left: 0;
                right: 0;
                bottom: 202px;
                }
                .candle:before {
                content: '';
                position: absolute;
                height: 16px;
                width: 16px;
                background-color: #ffa500;
                border-radius: 0 50% 50% 50%;
                bottom: 48px;
                transform: rotate(45deg);
                left: -1px;
                }

                /* Open states: by hover and programmatic (open class) */
                .card:hover .outside,
                .open .outside {
                transform: rotateY(-160deg);
                }
                .card:hover,
                .open {
               
                }

                /* Nice thin scrollbar in WebKit for long messages */
                .insideContent :global(.scrollable)::-webkit-scrollbar {
                width: 8px;
                height: 8px;
                }
                .insideContent :global(.scrollable)::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.25);
                border-radius: 8px;
                }
                .scrollArea {
                    flex: 1;        /* take the remaining height */
                    min-height: 0;  /* IMPORTANT so overflow works in flex layouts */
                    overflow-y: auto;
                    width: 100%;
                }

                @media (max-width: 1024px) {
                .card {
                    width: min(96vw, 760px);
                    height: min(70svh, 520px);
                }
                }
            `}</style>
            </div>
    )
}