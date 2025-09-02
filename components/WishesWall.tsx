'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import WishCardModal from './WishCardModal'
import WishCard from './WishCard'
import WishCardCombined from './WishCardCombined'

type Wish = {
  id: string
  name: string
  message: string
  image_url: string | null
  created_at: string
}

function timeAgo(iso: string) {
  const then = new Date(iso).getTime()
  const diff = Math.max(0, Date.now() - then)
  const s = Math.floor(diff / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}d ago`
  if (h > 0) return `${h}h ago`
  if (m > 0) return `${m}m ago`
  return `${s}s ago`
}

export default function WishesWall({ initial }: { initial: Wish[] }) {
  const [wishes, setWishes] = useState<Wish[]>(initial)
  const [open, setOpen] = useState(false)
  const [wish, setWish] = useState<Wish | null>(null)

  const sorted = useMemo(
    () => [...wishes].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [wishes]
  )

  if (!sorted.length) return <p className="text-center opacity-70">No wishes yet. Be the first! ✨</p>

  return (
    <>
        <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((w) => (
            <article key={w.id} className="rounded-2xl bg-white/80 backdrop-blur shadow p-0 overflow-hidden border border-white/40" onClick={() => {
                setOpen(true)
                setWish(w)
            }}>

                {/* {w.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.image_url} alt={w.name} className="w-full h-56 object-cover" loading="lazy" />
                ) : (
                )} */}
                <div className="h-2 bg-gradient-to-r from-pastelLilac via-pastelSky to-pastelMint" />
                <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-pastelLilac flex items-center justify-center text-sm">
                        {w.name.trim().charAt(0).toUpperCase()}
                    </div>
                    <div className="font-medium">{w.name}</div>
                    </div>
                    {/* <div className="text-xs opacity-60">{timeAgo(w.created_at)}</div> */}
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {w.message.length > 20 ? `${w.message.substring(0, 20)}...` : w.message}
                </p>
                </div>

            </article>
            ))}
        </div>
        </div>
        {/* <WishCardModal open={open} onClose={() => setOpen(false)} wish={wish as Wish} /> */}
        {/* <WishCard open={open} onClose={() => setOpen(false)} wish={wish as Wish} /> */}
        <WishCardCombined open={open} onClose={() => setOpen(false)} wish={wish as Wish} />
    </>
  )
}