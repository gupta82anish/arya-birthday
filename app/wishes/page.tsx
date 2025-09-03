import { createReadClient } from '@/lib/supabaseRead'
import WishesWall from '@/components/WishesWall'
import { BIRTHDAY_GIRL } from '@/lib/config'
import PasscodeInput from '@/components/PasscodeInput'
import { unlockWishes } from '@/app/actions'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

async function fetchWishes() {
  const supabase = createReadClient()
  const { data, error } = await supabase
    .from('wishes')
    .select('id,name,message,image_url,created_at')
    .eq('birthday_girl', BIRTHDAY_GIRL)
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) throw error
  return data || []
}

export default async function WishesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = await cookies()
  const unlocked = cookieStore.get('wishes_unlocked')?.value === '1'

  if (!unlocked) {
    const hasError = (searchParams?.error || '') === 'invalid'
    return (
      <main className="max-w-md mx-auto pt-16">
        <header className="text-center pb-4">
          <h1 className="text-2xl font-semibold">🔒 Enter Passcode</h1>
          <p className="text-sm text-black/70">Access to wishes is passcode-protected.</p>
        </header>
        <form action={unlockWishes} className="bg-white/70 rounded-lg p-4 shadow-sm">
          {hasError && (
            <div className="mb-2 text-sm text-red-600">Wrong passcode. Please try again.</div>
          )}
          <PasscodeInput />
          <button type="submit" className="w-full mt-2 rounded-md bg-black text-white py-2">Unlock</button>
        </form>
      </main>
    )
  }

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