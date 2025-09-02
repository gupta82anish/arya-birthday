'use client'
import { useState } from 'react'
import WishBubble from './WishBubble'
import WishCardModal from './WishCardModal'

type Wish = { id: string; name: string; message: string; image_url?: string | null; created_at?: string }

export default function WishExperience({ wish }: { wish: Wish }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-pastelPink via-pastelPeach to-pastelMint">
      <header className="pt-6 pb-2 text-center">
        <h1 className="text-xl font-semibold">💌 A Message for the Birthday Girl</h1>
      </header>
      <WishBubble wish={wish} onOpen={() => setOpen(true)} />
      <WishCardModal open={open} onClose={() => setOpen(false)} wish={wish} />
    </div>
  )
}