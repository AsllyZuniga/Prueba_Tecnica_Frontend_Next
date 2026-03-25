'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Bell, PanelLeft, PanelLeftClose } from 'lucide-react'

export const Header: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isSidebarHidden = searchParams.get('sidebar') === 'hidden'

  const toggleSidebar = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (isSidebarHidden) {
      params.delete('sidebar')
    } else {
      params.set('sidebar', 'hidden')
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <header className="bg-dark-900 border-b border-dark-700 py-4 px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
            title={isSidebarHidden ? 'Mostrar sidebar' : 'Ocultar sidebar'}
          >
            {isSidebarHidden ? (
              <PanelLeft size={20} className="text-gray-400" />
            ) : (
              <PanelLeftClose size={20} className="text-gray-400" />
            )}
          </button>
          <p className="text-sm font-semibold text-gray-200">TestNext</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-400" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  )
}
