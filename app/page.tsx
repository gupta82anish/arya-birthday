'use client'

import { RECIPIENT_NAME } from '@/lib/config'
import Countdown from '@/components/Countdown'
import ConfettiParty from '@/components/ConfettiParty'
import GlobalAudioControls from '@/components/GlobalAudioControls'
import { useGlobalAudio } from '@/components/GlobalAudioProvider'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [started, setStarted] = useState(false)
  const confettiRef = useRef<{ fire: () => void; startContinuous: () => void; stopContinuous: () => void }>(null)
  const { play } = useGlobalAudio()

  const start = async () => {
    setStarted(true)
    confettiRef.current?.fire() // Initial burst
    confettiRef.current?.startContinuous() // Start continuous confetti
    await play() // Start the music
  }

  // Cleanup continuous confetti when component unmounts
  useEffect(() => {
    return () => {
      confettiRef.current?.stopContinuous()
    }
  }, [])

  return (
    <main className="flex flex-col items-center justify-center text-center px-4 gap-6 py-10">
      <ConfettiParty ref={confettiRef} />

      <div className="mt-6 text-5xl font-semibold leading-tight">
        <div>Happy Birthday</div>
        <div className="mt-2 text-4xl">{RECIPIENT_NAME} 🎂🎈</div>
      </div>

      {/* <p className="text-sm opacity-80">Counting down to your big dayyy</p>
      <Countdown className="mt-2" /> */}

      <div className="mt-6 w-full max-w-sm">
        <GlobalAudioControls />
      </div>

      {!started && (
        <button
          onClick={start}
          className="mt-4 rounded-full bg-black/80 text-white px-6 py-3 text-base shadow-lg"
        >
          Tap to start the party ✨
        </button>
      )}

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-sm sm:max-w-none w-full">
        {/* <a href="/wish" className="rounded-xl bg-white/80 backdrop-blur p-4 shadow text-sm">
          ✍️ Send a Wish
        </a> */}
        <Link href="/wishes" className="rounded-xl bg-white/80 backdrop-blur p-4 shadow text-sm">
          💌 View Wishes
        </Link>
        {/* <Link href="/slideshow" className="rounded-xl bg-white/80 backdrop-blur p-4 shadow text-sm">
          🖼️ View Slideshow
        </Link> */}
      </div>
    </main>
  )
}