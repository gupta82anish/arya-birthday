'use client'
import { useState, useTransition } from 'react'
import PasscodeInput from './PasscodeInput'
import { submitSlide } from '@/app/actions'

export default function SlideUploader() {
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
            const res = await submitSlide(formData)
            if (res?.ok) setOk('Slide uploaded!')
          } catch (e: any) {
            setErr(e?.message ?? 'Something went wrong')
          }
        })
      }}
      className="space-y-3"
    >
      <PasscodeInput />

      <div>
        <label className="text-sm block mb-1">Image</label>
        <input type="file" name="image" accept="image/*" required className="block w-full" />
      </div>

      <div>
        <label className="text-sm block mb-1">Caption (optional)</label>
        <input name="caption" className="w-full rounded-md border border-black/10 px-3 py-2 bg-white/80" />
      </div>

      <button disabled={isPending} className="w-full rounded-md bg-black text-white py-2">
        {isPending ? 'Uploading…' : 'Upload Slide'}
      </button>

      {ok && <p className="text-green-700 text-sm">{ok}</p>}
      {err && <p className="text-red-700 text-sm">{err}</p>}
    </form>
  )
}