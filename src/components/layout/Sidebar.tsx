'use client'

import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Menu,
  X,
  Home,
  ShieldAlert,
  User,
} from 'lucide-react'

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeFlow = searchParams.get('flow')

  const menuItems = [
    { id: 'home', label: 'Inicio', Icon: Home, flow: null },
    { id: 'incident', label: 'Incidencias', Icon: ShieldAlert, flow: 'incident' },
    { id: 'membership', label: 'Membresías', Icon: User, flow: 'membership' },
  ]

  const handleNavigation = (flow: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (flow) {
      params.set('flow', flow)
    } else {
      params.delete('flow')
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-dark-800 rounded-lg border border-dark-700"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 w-64 bg-dark-900 border-r border-dark-700
          transform transition-transform duration-300 z-40
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-white mb-8">
            <span className="text-pink-500">Me</span>xt
          </h1>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = item.flow ? activeFlow === item.flow : !activeFlow

              return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.flow)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-colors duration-200
                  hover:bg-dark-800 text-gray-200 flex items-center gap-3
                  ${isActive ? 'bg-pink-500 text-white' : ''}
                `}
              >
                <item.Icon size={16} aria-hidden="true" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
