'use client'

import React from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
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
  <div className="grid grid-cols-[1fr_auto] gap-2">
    <p className="text-label-14 text-brand-textStrong">{label}</p>
    <p className="text-[16px] leading-6 font-normal text-brand-text text-right">{value}</p>
  </div>
)

export const MemberProfileSidebar: React.FC<MemberProfileSidebarProps> = ({ onClose, onComplete }) => {
  return (
    <div className="w-full max-w-[1200px] rounded-2xl bg-brand-sidebarBg border border-brand-border p-6 space-y-4">
      <div className="flex items-center justify-end">
        <button
          className="text-brand-text hover:text-brand-black transition-colors"
          aria-label="Cerrar sidebar"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex items-center gap-4 px-1">
        <div className="w-20 h-20 rounded-full border-2 border-brand-white overflow-hidden">
          <Image
            src="/figma/asset-2.png"
            alt="Foto del miembro"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[14px] leading-5 font-semibold text-brand-success">Activo</p>
          <Toggle enabled />
        </div>
      </div>

      <Card className="space-y-3 bg-brand-sectionBg border border-brand-border shadow-none">
        <h3 className="text-[20px] leading-7 font-semibold text-brand-textStrong">Pablo Victor</h3>
        <div className="h-px bg-brand-soft" />
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

      <Card className="space-y-3 bg-brand-sectionBg border border-brand-border shadow-none">
        <h3 className="text-[20px] leading-7 font-semibold text-brand-textStrong">Etiquetas</h3>
        <div className="space-y-2">
          <div className="h-px bg-brand-soft" />
          <p className="text-label-14 text-brand-textStrong">Cliente</p>
          <button className="w-full h-10 border border-brand-soft rounded-md bg-brand-white px-3 text-[16px] leading-6 font-normal text-brand-text flex items-center justify-between">
            <span>Prueba</span>
            <span className="flex flex-col leading-none text-brand-text">
              <ChevronUp size={12} />
              <ChevronDown size={12} />
            </span>
          </button>
        </div>
      </Card>

      <div className="rounded-xl border border-brand-border bg-brand-white p-3">
        <Button variant="primary" size="lg" className="w-full" onClick={onComplete}>Finalizar flujo</Button>
      </div>
    </div>
  )
}