'use client'

import React from 'react'
import { AlertTriangle, ChevronDown, Plus, X } from 'lucide-react'
import { Badge, Button, Card } from '@/src/components/common'

interface SidebarContainerProps {
  onClose?: () => void;
  onCreateIncident?: () => void;
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({ onClose, onCreateIncident }) => {
  return (
    <div className="w-full max-w-[1200px] rounded-2xl bg-[#A5A5A5] border border-brand-border p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-title-24 text-brand-text">Detalle de la sala</h2>
        </div>
        <button
          className="text-brand-text hover:text-brand-black transition-colors"
          aria-label="Cerrar sidebar"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      <Card className="space-y-3 bg-[#EDEDED] border border-brand-border shadow-none">
        <p className="text-label-16 text-brand-text">Sala Fitness</p>
        <div className="rounded-xl bg-[#FCFCFC] border border-brand-soft p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-label-14 text-brand-textStrong">Planta</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] leading-6 font-normal text-brand-text">1</p>
            </div>
          </div>
          <div className="h-px bg-brand-soft" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-label-14 text-brand-textStrong">QR</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] leading-6 font-normal text-brand-text">S-001</p>
            </div>
          </div>
          <div className="h-px bg-brand-soft" />
          <div className="flex items-center justify-between">
            <p className="text-label-14 text-brand-textStrong">Estado</p>
            <Badge variant="warning">En revisión</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden rounded-xl bg-[#EDEDED] border border-brand-border shadow-none">
        <div className="px-5 py-3.5 bg-[#EDEDED] flex items-center justify-between">
          <h3 className="text-label-16 text-brand-text">Listado de ítems en la sala</h3>
          <div className="flex items-center gap-2 text-brand-text">
            <button type="button" className="w-8 h-8 rounded-full border border-dashed border-brand-text/60 flex items-center justify-center">
              <Plus size={14} />
            </button>
            <ChevronDown size={14} className="text-brand-text" />
          </div>
        </div>

        <div className="p-5 pt-4 bg-[#EDEDED]">
          <div className="rounded-xl border border-brand-soft bg-[#FCFCFC] overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr_80px_90px] gap-2 px-4 py-3 text-label-14 text-brand-textStrong">
              <span>Ítem</span>
              <span>Categoría</span>
              <span>Estado</span>
              <span>Último PM</span>
            </div>
            <div className="h-px bg-brand-soft" />
            <div className="grid grid-cols-[1fr_1fr_80px_90px] gap-2 px-4 py-3 text-[16px] leading-6 font-normal text-brand-text">
              <span>Cinta 03</span>
              <span className="truncate">Fitness Machines</span>
              <span><Badge variant="danger">Falla</Badge></span>
              <span>12/09/2025</span>
            </div>
            <div className="h-px bg-brand-soft" />
            <div className="grid grid-cols-[1fr_1fr_80px_90px] gap-2 px-4 py-3 text-[16px] leading-6 font-normal text-brand-text">
              <span>Aire 02</span>
              <span className="truncate">HVAC</span>
              <span><Badge variant="success">OK</Badge></span>
              <span>12/09/2025</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="rounded-xl border border-brand-border bg-[#EDEDED] p-3">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="neutral" size="lg" className="w-full bg-[#FFFFFF] hover:bg-[#FFFFFF] text-brand-text text-[16px] leading-6 font-semibold border-brand-border">
            <Plus size={14} />
            Añadir ítem
          </Button>
          <Button variant="primary" size="lg" className="w-full" onClick={onCreateIncident}>
            Crear incidencia
          </Button>
        </div>
      </div>
    </div>
  )
}