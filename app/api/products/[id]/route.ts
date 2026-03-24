import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Mock: obtener un producto por ID
  return NextResponse.json({
    id: params.id,
    name: 'Producto',
    status: 'active',
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  return NextResponse.json({
    id: params.id,
    ...body,
    updatedAt: new Date(),
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: `Producto ${params.id} eliminado` })
}
