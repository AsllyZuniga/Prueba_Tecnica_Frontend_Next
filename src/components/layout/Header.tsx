'use client'

import React from 'react'
import { Bell, Search } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="bg-dark-900 border-b border-dark-700 py-4 px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg
                text-gray-100 placeholder-gray-500 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-400" />
          </button>
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  )
}
