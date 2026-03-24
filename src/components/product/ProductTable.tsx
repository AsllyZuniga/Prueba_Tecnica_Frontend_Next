'use client'

import React, { useState } from 'react'
import { Product } from '@/src/types'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Badge } from '@/src/components/common'

interface ProductTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const [sortKey, setSortKey] = useState<'name' | 'price' | 'stock'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: 'name' | 'price' | 'stock') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    const leftValue = a[sortKey]
    const rightValue = b[sortKey]

    const normalizedLeft = typeof leftValue === 'string' ? leftValue.toLowerCase() : leftValue
    const normalizedRight = typeof rightValue === 'string' ? rightValue.toLowerCase() : rightValue

    const comparison = normalizedLeft < normalizedRight ? -1 : normalizedLeft > normalizedRight ? 1 : 0
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const statusColors = {
    active: 'success',
    inactive: 'danger',
    pending: 'warning',
    completed: 'success',
  } as const

  const SortIcon = ({ column }: { column: 'name' | 'price' | 'stock' }) => {
    if (sortKey !== column) return <ChevronUp size={14} className="text-gray-600" />
    return sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-dark-800 border-b border-dark-700">
          <tr>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort('name')}
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-200"
              >
                Producto
                <SortIcon column="name" />
              </button>
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400">SKU</th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort('price')}
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-200"
              >
                Precio
                <SortIcon column="price" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort('stock')}
                className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-200"
              >
                Stock
                <SortIcon column="stock" />
              </button>
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400">Estado</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id} className="border-b border-dark-700 hover:bg-dark-800">
              <td className="px-4 py-3 text-sm text-gray-100 font-medium">{product.name}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{product.sku}</td>
              <td className="px-4 py-3 text-sm text-white font-semibold">${product.price.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm text-gray-100">{product.stock} unidades</td>
              <td className="px-4 py-3">
                <Badge variant={statusColors[product.status]}>{product.status}</Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(product)}
                      className="text-xs px-2 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded"
                    >
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-xs px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
