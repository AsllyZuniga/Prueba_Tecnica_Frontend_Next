import React from 'react'
import { Product } from '@/src/types'
import { Card, Badge } from '@/src/components/common'

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const statusColors = {
    active: 'success',
    inactive: 'danger',
    pending: 'warning',
    completed: 'success',
  } as const

  return (
    <Card onClick={onClick} className="cursor-pointer hover:border-pink-500">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-100">{product.name}</h3>
            <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
          </div>
          <Badge variant={statusColors[product.status]}>{product.status}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-gray-500">Precio</p>
            <p className="text-white font-semibold">${product.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Stock</p>
            <p className="text-white font-semibold">{product.stock} unidades</p>
          </div>
        </div>

        <div className="pt-2 border-t border-dark-700">
          <p className="text-xs text-gray-500">Categoría: {product.category}</p>
        </div>
      </div>
    </Card>
  )
}
