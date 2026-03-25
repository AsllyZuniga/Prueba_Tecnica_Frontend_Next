'use client'

import { useSearchParams } from 'next/navigation'
import { Header } from '@/src/components/layout'
import { Dashboard } from '@/src/features/dashboard'

export default function Home() {
  const searchParams = useSearchParams()
  const isSidebarHidden = searchParams.get('sidebar') === 'hidden'

  return (
    <div className={`flex-1 flex flex-col overflow-hidden ${isSidebarHidden ? 'lg:ml-0' : 'lg:ml-64'}`}>
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Dashboard />
        </div>
      </main>
    </div>
  )
}
