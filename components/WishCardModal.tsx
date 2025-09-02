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

export default function WishCardModal({ open, onClose, wish }: { open: boolean; onClose: () => void; wish: Wish }) {
  const seed = useMemo(() => Math.random(), [open])

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
