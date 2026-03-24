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
    <div className="w-full max-w-[1200px] rounded-2xl bg-dark-800 border border-dark-700 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-100">Detalle de la sala</h2>
          <p className="text-[11px] text-gray-500 mt-1">Resumen operativo</p>
        </div>
        <button
          className="text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Cerrar sidebar"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      <Card className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-500 mb-1">Sala Fitness</p>
            <p className="text-gray-100 font-medium">Planta</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 mb-1">GH</p>
            <p className="text-gray-300">S-001</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <p className="text-gray-500">Estado</p>
          <Badge variant="warning">En revisión</Badge>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-dark-700 flex items-center justify-between">
          <h3 className="text-xs font-semibold tracking-wide text-gray-300 uppercase">Listado de zonas con inasistencia</h3>
          <ChevronDown size={14} className="text-gray-500" />
        </div>

        <div className="p-4 pt-3 space-y-3">
          <div className="grid grid-cols-[70px_1fr_70px_70px] gap-2 text-[10px] text-gray-500 uppercase tracking-wide">
            <span>Zona</span>
            <span>Categoría</span>
            <span>Estado</span>
            <span>Última PM</span>
          </div>

          <div className="grid grid-cols-[70px_1fr_70px_70px] gap-2 text-xs text-gray-300 items-center">
            <span>GH-01</span>
            <span className="truncate">Fuerza</span>
            <span><Badge variant="danger">Falta</Badge></span>
            <span>12/02/2025</span>
          </div>

          <div className="grid grid-cols-[70px_1fr_70px_70px] gap-2 text-xs text-gray-300 items-center">
            <span>GH-02</span>
            <span className="truncate">Cardio</span>
            <span><Badge variant="warning">Alerta</Badge></span>
            <span>11/02/2025</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button variant="secondary" className="w-full">
              <Plus size={14} />
              Añadir ítem
            </Button>
            <Button variant="primary" className="w-full" onClick={onCreateIncident}>
              <AlertTriangle size={14} />
              Crear incidencia
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}