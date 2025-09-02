'use client'
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { MUSIC_SRC } from '@/lib/config'

type AudioContextType = {
  isPlaying: boolean
  play: () => Promise<void>
  pause: () => void
  toggle: () => Promise<void>
  volume: number
  setVolume: (volume: number) => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function useGlobalAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useGlobalAudio must be used within a GlobalAudioProvider')
  }
  return context
}

export function GlobalAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)

  useEffect(() => {
    // Create audio element
    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.volume = volume
    audio.preload = 'auto'
    audioRef.current = audio

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [volume])

  const play = async () => {
    const audio = audioRef.current
    if (!audio) return
    
    try {
      await audio.play()
      setIsPlaying(true)
    } catch (error) {
      console.log('Audio play failed:', error)
      // Browser might block autoplay, this is normal
    }
  }

  const pause = () => {
    const audio = audioRef.current
    if (!audio) return
    
    audio.pause()
    setIsPlaying(false)
  }

  const toggle = async () => {
    if (isPlaying) {
      pause()
    } else {
      await play()
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const value: AudioContextType = {
    isPlaying,
    play,
    pause,
    toggle,
    volume,
    setVolume,
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}
