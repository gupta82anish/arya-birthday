'use client'
import { useEffect, useState } from 'react'
import { nextBirthdayISTUtcMs, breakdown } from '@/lib/time'

export default function Countdown({ className = '' }: { className?: string }) {
  const [left, setLeft] = useState(() => nextBirthdayISTUtcMs() - Date.now())

  useEffect(() => {
    const tick = () => setLeft(nextBirthdayISTUtcMs() - Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const { days, hours, minutes, seconds } = breakdown(left)

  return (
    <div className={`flex items-center justify-center gap-2 text-lg ${className}`}>
      <TimeBox label="Days" value={days} />
      <span>:</span>
      <TimeBox label="Hours" value={hours} />
      <span>:</span>
      <TimeBox label="Minutes" value={minutes} />
      <span>:</span>
      <TimeBox label="Seconds" value={seconds} />
    </div>
  )
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-semibold tabular-nums bg-white/70 rounded-md px-3 py-1 shadow">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] mt-1 opacity-70">{label}</div>
    </div>
  )
}