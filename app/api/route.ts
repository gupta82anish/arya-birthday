import { NextResponse } from 'next/server'
import { createReadClient } from '@/lib/supabaseRead'

export async function GET() {
  try {
    const supabase = createReadClient()
    const { data, error } = await supabase
      .from('wishes')
      .select('id,name,message,image_url,created_at')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (e: any) {
    return new NextResponse(e?.message ?? 'Error', { status: 500 })
  }
}
