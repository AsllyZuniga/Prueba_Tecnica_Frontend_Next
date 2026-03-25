import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/src/styles/globals.css'
import { Sidebar } from '@/src/components/layout'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'TestNext - Operaciones',
  description: 'Gestión operativa de incidencias y membresías',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-dark-900`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
