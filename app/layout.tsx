import type { Metadata } from 'next'
import '@/src/styles/globals.css'
import { Sidebar } from '@/src/components/layout'

export const metadata: Metadata = {
  title: 'Mext - Operaciones',
  description: 'Gestión operativa de incidencias y membresías',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-dark-900">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
