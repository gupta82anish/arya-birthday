import '@/app/globals.css'
import type { Metadata } from 'next'
import { GlobalAudioProvider } from '@/components/GlobalAudioProvider'
import GlobalAudioControls from '@/components/GlobalAudioControls'

export const metadata: Metadata = {
  title: 'Happy Birthday',
  description: 'Birthday wishes for someone special 💖',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <GlobalAudioProvider>
          {children}
          <GlobalAudioControls variant="floating" />
        </GlobalAudioProvider>
      </body>
    </html>
  )
}