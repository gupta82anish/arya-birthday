'use client'
import { useState } from 'react'

export default function PasscodeInput() {
  const [show, setShow] = useState(false)
  return (
    <div className="mb-3">
      <label className="text-sm block mb-1">Passcode</label>
      <div className="flex items-center gap-2">
        <input
          type={show ? 'text' : 'password'}
          name="passcode"
          required
          className="w-full rounded-md border border-black/10 px-3 py-2 bg-white/80"
          placeholder="Enter passcode"
        />
        <button type="button" onClick={() => setShow((s) => !s)} className="text-xs px-3 py-2 rounded bg-white/70">
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  )
}