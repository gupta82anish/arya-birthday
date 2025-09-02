'use client'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

// Pastel palette
const colors = ['#ffd1dc', '#ffedd5', '#d1fae5', '#e9d5ff', '#e0f2fe']

/** --- Tiny vector sprites --- */
function Balloon({ color = '#ffd1dc' }: { color?: string }) {
  return (
    <svg width="44" height="64" viewBox="0 0 44 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopOpacity="1" stopColor={color} />
          <stop offset="100%" stopOpacity="0.85" stopColor={color} />
        </linearGradient>
      </defs>
      <ellipse cx="22" cy="22" rx="20" ry="22" fill="url(#bgrad)" />
      <path d="M22 44c0 0-2 6-6 10" stroke="#666" strokeWidth="1" fill="none" />
      <path d="M19 43l6 0l-3 4z" fill={color} opacity="0.9" />
    </svg>
  )
}
function PartyHat({ color = '#e9d5ff' }: { color?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4 L44 44 H4 Z" fill={color} opacity="0.9" />
      <circle cx="24" cy="4" r="4" fill="#fff" opacity="0.9" />
      <path d="M16 26h16M14 30h20M12 34h24" stroke="#fff" strokeWidth="2" opacity="0.7" />
    </svg>
  )
}
function Streamer({ color = '#e0f2fe' }: { color?: string }) {
  return (
    <svg width="56" height="28" viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 14c8-10 18 10 26 0s18 10 26 0" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
function Confetti({ color = '#ffedd5' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="6" height="6" rx="2" fill={color} />
      <rect x="10" y="6" width="6" height="6" rx="2" fill={color} transform="rotate(15 13 9)" />
    </svg>
  )
}
function Sparkle({ color = '#d1fae5' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0l2.5 7.5L22 10l-7.5 2.5L12 20l-2.5-7.5L2 10l7.5-2.5L12 0z" fill={color} opacity="0.9" />
    </svg>
  )
}

const SPRITES = [Balloon, PartyHat, Streamer, Confetti, Sparkle]

/** deterministic-ish RNG so sprites don’t jump each render */
function rng(seed: number) {
  let s = Math.floor(seed * 1e9) || 1
  return () => (s = (s * 48271) % 0x7fffffff) / 0x7fffffff
}

type Variant = 'border' | 'bottom'

type Props = {
  count?: number
  seed?: number
  variant?: Variant
  className?: string
  /** % inset from each edge for border layout (prevents corner overlap) */
  edgeInset?: number
}

export default function SpriteLayer({
  count = 12,
  seed = Math.random(),
  variant = 'border',
  className = '',
  edgeInset = 7,
}: Props) {
  const rand = useMemo(() => rng(seed), [seed])

  const sprites = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const Cmp = SPRITES[i % SPRITES.length]

      let left = 50
      let top = 50
      const safe = edgeInset
      const cornerSafe = safe + 2

      if (variant === 'border') {
        // Pick a side: 0 top, 1 right, 2 bottom, 3 left
        const side = Math.floor(rand() * 4)
        if (side === 0) { // top
          top = safe
          left = cornerSafe + rand() * (100 - 2 * cornerSafe)
        } else if (side === 1) { // right
          left = 100 - safe
          top = safe + rand() * (100 - 2 * safe)
        } else if (side === 2) { // bottom
          top = 100 - safe
          left = cornerSafe + rand() * (100 - 2 * cornerSafe)
        } else { // left
          left = safe
          top = safe + rand() * (100 - 2 * safe)
        }
      } else {
        // Bottom garland: place across the lower band of the layer
        top = 72 + rand() * 18 // 72–90% of this layer’s height
        left = safe + rand() * (100 - 2 * safe)
      }

      const scale = 0.75 + rand() * 0.7
      const rotate = -10 + rand() * 20
      const float = variant === 'bottom' ? 5 + rand() * 6 : 10 + rand() * 10
      const delay = rand() * 0.8
      const duration = 3 + rand() * 2.5
      const color = colors[Math.floor(rand() * colors.length)]

      return { i, Cmp, left, top, scale, rotate, float, delay, duration, color }
    })
  }, [count, rand, variant, edgeInset])

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {sprites.map(({ i, Cmp, left, top, scale, rotate, float, delay, duration, color }) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${left}%`, top: `${top}%`, scale }}
          initial={{ y: 0, opacity: 0, rotate }}
          animate={{
            y: variant === 'bottom' ? [0, -float, 0] : [-float, float, -float],
            opacity: [0, 1, 0.95],
            rotate: [rotate, -rotate, rotate],
          }}
          transition={{ repeat: Infinity, duration, delay, ease: 'easeInOut' }}
        >
          <Cmp color={color} />
        </motion.div>
      ))}
    </div>
  )
}
