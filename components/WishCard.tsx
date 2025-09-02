'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import SpriteLayer from './SpritesLayer'

type Wish = {
  id: string
  name: string
  message: string
  image_url?: string | null
}

export default function WishCard({
  open,
  onClose,
  wish,
}: {
  open: boolean
  onClose: () => void
  wish: Wish
}) {
  const seed = useMemo(() => Math.random(), [open])

  // Small helper for spine shading
  const Spine = () => (
    <>
      {/* center spine line */}
      <div className="absolute inset-y-0 left-1/2 -ml-[1px] w-[2px] bg-black/10 z-20" />
      {/* page fold shadows */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[35%] -translate-x-1/2 bg-gradient-to-l from-black/10 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[35%] translate-x-1/2 bg-gradient-to-r from-black/10 to-transparent z-10" />
    </>
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card container (with perspective for 3D book open) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            <div
              className="relative w-full max-w-3xl aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl"
              style={{ perspective: 1200 }}
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-pastelSky/70 via-pastelPeach/70 to-pastelMint/70" />

              {/* Edge sprites (frame) above gradient, below pages */}
              <SpriteLayer count={18} seed={seed} variant="border" className="z-10" />

              {/* Book wrapper with preserve-3d */}
              <div
                className="absolute inset-0 z-20"
                style={{ transformStyle: 'preserve-3d' as any }}
              >
                <Spine />

                {/* LEFT PAGE — photo */}
                <motion.div
                  className="absolute left-0 top-0 w-1/2 h-full origin-right rounded-l-3xl overflow-hidden bg-white/85 backdrop-blur"
                  style={{ transformStyle: 'preserve-3d' as any }}
                  initial={{ rotateY: 12 }}
                  animate={{ rotateY: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.05 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {wish.image_url ? (
                    <img
                      src={wish.image_url}
                      alt={wish.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-sm opacity-70">
                      No photo provided
                    </div>
                  )}
                </motion.div>

                {/* RIGHT PAGE — greeting text */}
                <motion.div
                  className="absolute right-0 top-0 w-1/2 h-full origin-left rounded-r-3xl overflow-hidden bg-white/90 backdrop-blur"
                  style={{ transformStyle: 'preserve-3d' as any }}
                  initial={{ rotateY: -12 }}
                  animate={{ rotateY: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.12 }}
                >
                  <div className="flex h-full flex-col">
                    <div className="px-5 py-4 sm:px-7 sm:py-6 text-center">
                      <div className="text-2xl sm:text-3xl font-semibold">Happy Birthday 🎂</div>
                      <div className="mt-1 text-xs sm:text-sm opacity-70">From {wish.name}</div>
                    </div>

                    <div className="flex-1 px-5 sm:px-7 overflow-y-auto">
                      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-center">
                        {wish.message}
                      </p>
                    </div>

                    {/* Bottom garland of sprites INSIDE the right page */}
                    <div className="relative h-16 sm:h-20">
                      <SpriteLayer
                        count={10}
                        seed={seed + 1}
                        variant="bottom"
                        className="z-0"
                      />
                    </div>

                    <div className="px-5 sm:px-7 pb-4 sm:pb-6 flex items-center justify-center">
                      <button
                        onClick={onClose}
                        className="rounded-full bg-black text-white px-5 py-2 text-xs sm:text-sm shadow"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
