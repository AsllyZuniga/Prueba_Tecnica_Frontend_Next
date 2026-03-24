import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

// Mock data para productos
const products = [
  {
    id: '1',
    name: 'Laptop Gaming Pro',
    sku: 'LTP-001',
    category: 'electronics',
    price: 1299.99,
    stock: 15,
    status: 'active',
    description: 'Laptop de alto rendimiento para gaming',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Mouse Inalámbrico',
    sku: 'MUS-001',
    category: 'electronics',
    price: 29.99,
    stock: 45,
    status: 'active',
    description: 'Mouse de precisión para gaming',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET(request: NextRequest) {
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newProduct = {
    id: randomUUID(),
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return NextResponse.json(newProduct, { status: 201 })
}
