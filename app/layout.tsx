import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-ibm-plex-mono' })

export const metadata: Metadata = {
  title: 'ACM GRIET Student Chapter',
  description: 'Where technology meets curiosity, ideas turn into action, and students come together to build what’s next.',
  generator: 'v0.app',
  icons: {
    icon: '/images/acm-logo-circle.png',
  },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#080f1c', width: 'device-width', initialScale: 1, userScalable: true }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background" data-scroll-behavior="smooth"><body className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
