'use client'
import confetti from 'canvas-confetti'
import { forwardRef, useImperativeHandle } from 'react'

export default forwardRef(function ConfettiParty(_props, ref) {
  useImperativeHandle(ref, () => ({ fire, startContinuous, stopContinuous }))

  function fire() {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } })
  }

  function randomConfetti() {
    // Random position along the top and sides
    const origins = [
      { x: Math.random(), y: 0 }, // Top edge
      { x: 0, y: Math.random() }, // Left edge  
      { x: 1, y: Math.random() }, // Right edge
      { x: Math.random(), y: 0.1 }, // Near top
    ]
    
    const origin = origins[Math.floor(Math.random() * origins.length)]
    
    confetti({
      particleCount: Math.floor(Math.random() * 50) + 30, // 30-80 particles
      spread: Math.floor(Math.random() * 40) + 50, // 50-90 degree spread
      origin,
      colors: ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4d96ff', '#9c27b0', '#ff9800']
    })
  }

  let intervalId: NodeJS.Timeout | null = null

  function startContinuous() {
    if (intervalId) return // Already running
    
    // Fire immediately
    randomConfetti()
    
    // Then fire every 1.5-3 seconds randomly
    function scheduleNext() {
      const delay = Math.random() * 1500 + 1500 // 1.5-3 seconds
      intervalId = setTimeout(() => {
        randomConfetti()
        scheduleNext()
      }, delay)
    }
    
    scheduleNext()
  }

  function stopContinuous() {
    if (intervalId) {
      clearTimeout(intervalId)
      intervalId = null
    }
  }

  return null
})