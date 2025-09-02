import WishForm from '@/components/WishForm'

export default function WishPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-1">Send a Wish ✍️</h1>
      <p className="text-sm opacity-70 mb-6">Name and message are required. Image is optional.</p>
      <div className="rounded-xl bg-white/80 backdrop-blur p-4 shadow">
        <WishForm />
      </div>
    </main>
  )
}