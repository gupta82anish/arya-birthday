import { createReadClient } from '@/lib/supabaseRead'
import WishesWall from '@/components/WishesWall'

export const dynamic = 'force-dynamic'

async function fetchWishes() {
  const supabase = createReadClient()
  const { data, error } = await supabase
    .from('wishes')
    .select('id,name,message,image_url,created_at')
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) throw error
  return data || []
}

export default async function WishesPage() {
  const initial = await fetchWishes()
  return (
    <main>
      <header className="text-center pt-8 pb-2">
        <h1 className="text-3xl font-semibold">💌 Birthday Wishes</h1>
      </header>
      <WishesWall initial={initial as any} />
    </main>
  )
}