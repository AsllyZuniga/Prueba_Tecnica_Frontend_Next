'use client'

import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Menu,
  X,
  ShieldAlert,
  User,
} from 'lucide-react'

type SidebarFlow = 'incident' | 'membership'

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeFlow = searchParams.get('flow')
  const isSidebarHidden = searchParams.get('sidebar') === 'hidden'

  const menuItems = [
    { id: 'incident', label: 'Incidencias', Icon: ShieldAlert, flow: 'incident' },
    { id: 'membership', label: 'Membresías', Icon: User, flow: 'membership' },
  ] as const

  const handleNavigation = (flow: SidebarFlow) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('flow', flow)

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-brand-sectionBg rounded-lg border border-brand-border"
      >
        {isOpen ? <X size={20} className="text-brand-textStrong" /> : <Menu size={20} className="text-brand-textStrong" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 w-64 bg-brand-sidebarBg border-r border-brand-border
          transform transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isSidebarHidden ? 'lg:-translate-x-full' : 'lg:translate-x-0'}
        `}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-brand-textStrong mb-8">
            <span className="text-brand-primaryEnd">Test</span>Next
          </h1>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = activeFlow === item.flow

              return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.flow)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-colors duration-200
                  text-brand-textStrong flex items-center gap-3
                  ${isActive ? 'bg-brand-primary text-brand-white' : 'hover:bg-brand-sectionBg'}
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
