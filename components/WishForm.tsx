'use client'
import { useState, useTransition } from 'react'
import PasscodeInput from './PasscodeInput'
import { submitWish } from '@/app/actions'
import { BIRTHDAY_GIRL } from '@/lib/config'

export default function WishForm() {
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <form
      action={(formData) => {
        setErr(null)
        setOk(null)
        startTransition(async () => {
          try {
            const res = await submitWish(formData, BIRTHDAY_GIRL)
            if (res?.ok) setOk('Thanks! Your wish has been submitted 💖')
          } catch (e: any) {
            setErr(e?.message ?? 'Something went wrong')
          }
        })
      }}
      className="space-y-3"
    >
      <PasscodeInput />

      <div>
        <label className="text-sm block mb-1">Your name</label>
        <input name="name" required className="w-full rounded-md border border-black/10 px-3 py-2 bg-white/80" />
      </div>

      <div>
        <label className="text-sm block mb-1">Message</label>
        <textarea name="message" required rows={4} className="w-full rounded-md border border-black/10 px-3 py-2 bg-white/80" />
      </div>

      <div>
        <label className="text-sm block mb-1">Optional image (JPG/PNG/HEIC)</label>
        <input type="file" name="image" accept="image/*" className="block w-full" />
      </div>

      <button disabled={isPending} className="w-full rounded-md bg-black text-white py-2">
        {isPending ? 'Submitting…' : 'Submit Wish'}
      </button>

      {ok && <p className="text-green-700 text-sm">{ok}</p>}
      {err && <p className="text-red-700 text-sm">{err}</p>}
    </form>
  )
}