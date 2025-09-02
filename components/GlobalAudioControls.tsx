'use client'
import { useGlobalAudio } from './GlobalAudioProvider'

interface GlobalAudioControlsProps {
  className?: string
  variant?: 'default' | 'minimal' | 'floating'
}

export default function GlobalAudioControls({ 
  className = '', 
  variant = 'default' 
}: GlobalAudioControlsProps) {
  const { isPlaying, toggle } = useGlobalAudio()

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggle}
        className={`rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm shadow hover:bg-white/90 transition-colors ${className}`}
      >
        {isPlaying ? '🔇 Pause' : '🔊 Play Music'}
      </button>
    )
  }

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={toggle}
          className="rounded-full bg-black/80 text-white p-3 shadow-lg hover:bg-black/90 transition-colors"
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <button
        onClick={toggle}
        className="rounded-full bg-white/80 backdrop-blur px-6 py-3 text-sm shadow hover:bg-white/90 transition-colors"
      >
        {isPlaying ? '⏸️ Pause Music' : '▶️ Play Music'}
      </button>
    </div>
  )
}
