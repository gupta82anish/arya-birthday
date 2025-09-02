'use server'

import { createAdminClient } from '@/lib/supabaseAdmin'
import { randomUUID } from 'crypto'

function checkPasscode(pass: string | null | undefined) {
  const expected = process.env.PASSCODE
  if (!expected || pass !== expected) {
    throw new Error('Invalid passcode')
  }
}

export async function submitWish(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const passcode = String(formData.get('passcode') || '')
  const file = formData.get('image') as File | null

  checkPasscode(passcode)
  if (!name || !message) throw new Error('Name and message are required')

  const supabase = createAdminClient()
  let image_url: string | null = null
  let image_path: string | null = null

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop() || 'jpg'
    const key = `${randomUUID()}.${ext}`
    const arrayBuf = await file.arrayBuffer()
    const { data: upload, error: upErr } = await supabase.storage
      .from('wishes')
      .upload(key, Buffer.from(arrayBuf), { contentType: file.type || 'image/jpeg', upsert: false })
    if (upErr) throw upErr
    image_path = upload.path
    const { data: pub } = supabase.storage.from('wishes').getPublicUrl(upload.path)
    image_url = pub.publicUrl
  }

  const { error: insErr } = await supabase
    .from('wishes')
    .insert({ name, message, image_path, image_url })
  if (insErr) throw insErr

  return { ok: true }
}

export async function submitSlide(formData: FormData) {
  const caption = String(formData.get('caption') || '').trim()
  const passcode = String(formData.get('passcode') || '')
  const file = formData.get('image') as File | null

  checkPasscode(passcode)
  if (!file || file.size === 0) throw new Error('Image is required')

  const supabase = createAdminClient()
  const ext = file.name.split('.').pop() || 'jpg'
  const key = `${randomUUID()}.${ext}`
  const arrayBuf = await file.arrayBuffer()

  const { data: upload, error: upErr } = await supabase.storage
    .from('slides')
    .upload(key, Buffer.from(arrayBuf), { contentType: file.type || 'image/jpeg', upsert: false })
  if (upErr) throw upErr

  const image_path = upload.path
  const { data: pub } = supabase.storage.from('slides').getPublicUrl(upload.path)
  const image_url = pub.publicUrl

  const { error: insErr } = await supabase
    .from('slides')
    .insert({ caption, image_path, image_url })
  if (insErr) throw insErr

  return { ok: true }
}