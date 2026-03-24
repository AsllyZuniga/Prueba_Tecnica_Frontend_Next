'use client'

import React, { useState } from 'react'
import { Product, Status } from '@/src/types'
import { Button, Input, Select, Textarea } from '@/src/components/common'

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Product;
  isLoading?: boolean;
}

type ProductFormData = {
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: Status;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData, isLoading = false }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    sku: initialData?.sku || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    status: initialData?.status || 'active',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { label: 'Electrónica', value: 'electronics' },
    { label: 'Ropa', value: 'clothing' },
    { label: 'Alimentos', value: 'food' },
    { label: 'Libros', value: 'books' },
    { label: 'Otros', value: 'other' },
  ]

  const statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'Completado', value: 'completed' },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!formData.sku.trim()) newErrors.sku = 'El SKU es requerido'
    if (formData.price < 0) newErrors.price = 'El precio no puede ser negativo'
    if (formData.stock < 0) newErrors.stock = 'El stock no puede ser negativo'
    if (!formData.category) newErrors.category = 'La categoría es requerida'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit({
      ...formData,
      status: formData.status as Status,
    })
  }

  const handleChange = <FieldKey extends keyof ProductFormData>(field: FieldKey, value: ProductFormData[FieldKey]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre del Producto"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
          placeholder="Ej: Laptop Gaming"
        />
        <Input
          label="SKU"
          value={formData.sku}
          onChange={(e) => handleChange('sku', e.target.value)}
          error={errors.sku}
          required
          placeholder="Ej: LTP-001"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Precio"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={(e) => handleChange('price', Number(e.target.value))}
          error={errors.price}
          required
        />
        <Input
          label="Stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={(e) => handleChange('stock', Number(e.target.value))}
          error={errors.stock}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Categoría"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          error={errors.category}
          options={categories}
          required
        />
        <Select
          label="Estado"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value as Status)}
          options={statusOptions}
          required
        />
      </div>

      <Textarea
        label="Descripción"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Describe las características del producto..."
        rows={4}
      />

      <div className="flex gap-3 justify-end">
        <Button variant="secondary" type="button">
          Cancelar
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading}>
          {initialData ? 'Actualizar Producto' : 'Crear Producto'}
        </Button>
      </div>
    </form>
  )
}
