'use client'

import React from 'react'
import { Category } from '@/src/types'

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory?: string;
  onSelect: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-200 mb-3">Categorías</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`
              w-full text-left px-3 py-2 rounded-lg transition-colors duration-200
              flex items-center justify-between text-sm
              ${
                selectedCategory === category.id
                  ? 'bg-pink-500 text-white'
                  : 'bg-dark-800 text-gray-200 hover:bg-dark-700'
              }
            `}
          >
            <span>{category.name}</span>
            {category.count && (
              <span className="text-xs opacity-75">({category.count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
