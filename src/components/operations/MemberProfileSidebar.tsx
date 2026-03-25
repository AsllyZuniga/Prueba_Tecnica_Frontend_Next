'use client'

import React from 'react'
import Image from 'next/image'
import { ChevronDown, X } from 'lucide-react'
import { Button, Card } from '@/src/components/common'

interface MemberProfileSidebarProps {
  onClose?: () => void;
  onComplete?: () => void;
}

const Toggle: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  return (
    <span className={`w-8 h-4 rounded-full relative transition-colors ${enabled ? 'bg-brand-toggle' : 'bg-brand-toggle/35'}`}>
      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${enabled ? 'left-4' : 'left-0.5'}`} />
    </span>
  )
}

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="grid grid-cols-[1fr_auto] gap-2 text-xs">
    <p className="text-gray-500">{label}</p>
    <p className="text-gray-300 text-right">{value}</p>
  </div>
)

export const MemberProfileSidebar: React.FC<MemberProfileSidebarProps> = ({ onClose, onComplete }) => {
  return (
    <div className="w-full max-w-[1200px] rounded-2xl bg-dark-800 border border-dark-700 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-100">Perfil del miembro</h2>
        <button
          className="text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Cerrar sidebar"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      <Card>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-dark-600 bg-dark-900 overflow-hidden">
            <Image
              src="/figma/asset-2.png"
              alt="Foto del miembro"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium text-green-500">Activo</p>
            <Toggle enabled />
          </div>
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Pablo Victor</h3>
        <div className="space-y-2">
          <Row label="Filial/centro habitual" value="Reparto" />
          <Row label="E-mail" value="usuariodeprueb@gmail.com" />
          <Row label="Teléfono" value="123" />
          <Row label="Registrado" value="04-10-2024" />
          <Row label="Fecha de nacimiento" value="21-07-2004" />
          <Row label="Sexo" value="Masculino" />
          <Row label="Objetivo" value="Incremento de masa muscular" />
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="text-base font-semibold text-white">Etiquetas</h3>
        <div className="space-y-2">
          <div className="h-px bg-dark-700" />
          <p className="text-xs text-gray-500">Cliente</p>
          <button className="w-full h-8 border border-dark-700 rounded-md bg-dark-900 px-2 text-xs text-gray-300 flex items-center justify-between">
            <span>Prueba</span>
            <ChevronDown size={12} className="text-gray-500" />
          </button>
        </div>
      </Card>

      <Button variant="primary" className="w-full" onClick={onComplete}>Finalizar flujo</Button>
    </div>
  )
}