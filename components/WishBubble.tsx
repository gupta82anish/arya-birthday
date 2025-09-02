'use client'
import Image from 'next/image'
import { memo } from 'react'

type Wish = {
  id: string
  name: string
  message: string
  image_url?: string | null
  created_at?: string
}

export default memo(function WishBubble({ wish, onOpen }: { wish: Wish; onOpen: () => void }) {
  return (
    <div className="px-4 py-6">
      <div className="flex items-start gap-3 max-w-xl mx-auto">
        <div className="h-9 w-9 rounded-full bg-pastelLilac flex items-center justify-center text-sm shrink-0">
          {wish.name.trim().charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="inline-block relative rounded-2xl bg-white/90 shadow px-4 py-3 text-sm leading-relaxed">
            {/* speech tail */}
            <span className="absolute -left-1 bottom-3 h-3 w-3 rotate-45 bg-white/90 shadow -z-10" />
            <div className="font-medium text-[13px] opacity-80 mb-1">{wish.name}</div>
            <p className="whitespace-pre-wrap">{wish.message}</p>
            {wish.image_url && (
              <div className="mt-3 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image src={wish.image_url} alt={wish.name} className="w-full h-52 object-cover" width={100} height={100} />
              </div>
            )}
          </div>
          <div className="mt-3">
            <button onClick={onOpen} className="rounded-full bg-black text-white text-xs px-4 py-2 shadow">
              Open birthday card 🎉
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})