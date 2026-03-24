'use client'

import React from 'react'
import { ChevronDown, Plus, X } from 'lucide-react'
import { Button, Card } from '@/src/components/common'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-4 py-3 border-b border-dark-700 flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wide text-gray-300">{title}</h3>
        <ChevronDown size={14} className="text-gray-500" />
      </div>
      <div className="p-4">{children}</div>
    </Card>
  )
}

const Field: React.FC<{ label: string; value?: string; placeholder?: string; rightText?: string }> = ({
  label,
  value,
  placeholder,
  rightText,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-gray-500">{label}</label>
        {rightText && <span className="text-[10px] text-gray-500">{rightText}</span>}
      </div>
      <div className="h-8 rounded-md border border-dark-700 bg-dark-900 px-2 flex items-center text-xs text-gray-300">
        {value || <span className="text-gray-500">{placeholder}</span>}
      </div>
    </div>
  )
}

const ToggleRow: React.FC<{ label: string; enabled?: boolean }> = ({ label, enabled = true }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-300">{label}</span>
      <span
        className={`w-8 h-4 rounded-full relative transition-colors ${enabled ? 'bg-primary-600' : 'bg-dark-700'}`}
      >
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${enabled ? 'left-4' : 'left-0.5'}`}
        />
      </span>
    </div>
  )
}

interface MembershipPlanSidebarProps {
  onClose?: () => void;
  onCreatePlan?: () => void;
}

export const MembershipPlanSidebar: React.FC<MembershipPlanSidebarProps> = ({ onClose, onCreatePlan }) => {
  const schedules = [
    { day: 'Lun', from: '00:00', to: '03:00' },
    { day: 'Mar', from: '00:00', to: '03:00' },
    { day: 'Mié', from: '00:00', to: '03:00' },
    { day: 'Jue', from: '00:00', to: '03:00' },
    { day: 'Vie', from: '00:00', to: '03:00' },
    { day: 'Sáb', from: '00:00', to: '03:00' },
    { day: 'Dom', from: '00:00', to: '03:00' },
  ]

  return (
    <div className="w-full max-w-[1200px] rounded-2xl bg-dark-800 border border-dark-700 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-100">Crear nuevo plan</h2>
        <button
          className="text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Cerrar sidebar"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      <Section title="Datos generales">
        <div className="space-y-3">
          <Field label="Nombre del plan" placeholder="Nombre" />
          <Field label="Descripción" placeholder="Descripción" />
          <ToggleRow label="Activo" enabled />
        </div>
      </Section>

      <Section title="Precio y condiciones">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Field label="Precio base" value="$5.00" rightText="USD" />
            <Field label="Ciclo" value="Mensual" />
          </div>
          <Field label="Límite de semanas o servicios deportivos" value="4" />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Periodo prorrateo en días" value="31" />
            <Field label="Descuento de renovación" value="15%" />
          </div>
          <Field label="Max % para cliente" value="50.00" rightText="USD" />
        </div>
      </Section>

      <Section title="Acceso y beneficios">
        <div className="space-y-3">
          <Field label="Cuotas permitidas" value="Todos los centros" />
          <Field label="Acceso a instalaciones" value="Gimnasio, Piscina, Sauna" />
          <ToggleRow label="Todos los centros e instalaciones tienen lock" enabled />

          <div className="space-y-2">
            <div className="grid grid-cols-[42px_1fr_1fr_20px] gap-2 text-[10px] text-gray-500 uppercase">
              <span>Día</span>
              <span>Hora de i</span>
              <span>Hora de f</span>
              <span />
            </div>
            {schedules.map((item) => (
              <div key={item.day} className="grid grid-cols-[42px_1fr_1fr_20px] gap-2 items-center">
                <div className="h-7 rounded-md bg-primary-600 text-white text-[11px] flex items-center justify-center">
                  {item.day}
                </div>
                <div className="h-7 rounded-md border border-dark-700 bg-dark-900 px-2 text-xs text-gray-300 flex items-center">
                  {item.from}
                </div>
                <div className="h-7 rounded-md border border-dark-700 bg-dark-900 px-2 text-xs text-gray-300 flex items-center">
                  {item.to}
                </div>
                <button className="text-gray-500 hover:text-gray-300">
                  <Plus size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Beneficios adicionales">
        <div className="space-y-2">
          <ToggleRow label="Planes de entrenamiento" enabled />
          <ToggleRow label="Planes de nutrición" enabled={false} />
          <Field label="Evaluaciones & recordatorios" value="2" />
        </div>
      </Section>

      <Section title="Accesos al centro">
        <div className="space-y-2">
          <Field label="Acceso" value="Semana / Mañana / Preferente" />
          <div className="space-y-1">
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 text-[10px] text-gray-500 uppercase">
              <span>Tipo</span>
              <span>Evento</span>
              <span>Acceso</span>
            </div>
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 text-[11px] text-gray-300">
              <span>AL</span>
              <span>Evento A</span>
              <span>Semana/Mañana/Preferente</span>
            </div>
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 text-[11px] text-gray-300">
              <span>ES</span>
              <span>Evento B</span>
              <span>Semana/Mañana/Preferente</span>
            </div>
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 text-[11px] text-gray-300">
              <span>SS</span>
              <span>Evento C</span>
              <span>Semana/Mañana/Preferente</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Observaciones internas">
        <div className="h-16 rounded-md border border-dark-700 bg-dark-900 p-2 text-xs text-gray-500">
          Notas internas sobre el plan...
        </div>
      </Section>

      <div className="flex gap-2 pt-1">
        <Button variant="secondary" className="flex-1" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" className="flex-1" onClick={onCreatePlan}>Crear plan</Button>
      </div>
    </div>
  )
}