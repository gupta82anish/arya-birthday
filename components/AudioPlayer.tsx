'use client'
import { useEffect, useRef, useState } from 'react'

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  // Set up audio properties on mount
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.loop = true
  }, [])

  const handlePlay = async () => {
    const a = audioRef.current
    if (!a) return
    try {
      a.muted = false
      await a.play()
      setPlaying(true)
    } catch (_) {
      // ignored — browser might still block until a second gesture
    }
  }

  const handleStop = () => {
    const a = audioRef.current
    if (!a) return
    a.pause()
    a.currentTime = 0
    setPlaying(false)
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <audio ref={audioRef} src={src} preload="auto" />
      <button
        onClick={handleStop}
        className="rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm shadow"
      >
        {playing ? 'Mute 🔇' : 'Unmute 🔊'}
      </button>
      <button
        onClick={handlePlay}
        className="rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm shadow"
      >
        {playing ? 'Playing 🔊' : 'Play ▶️'}
      </button>
    </div>
  )
}