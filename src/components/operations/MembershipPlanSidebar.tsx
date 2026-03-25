'use client'

import React, { useMemo, useState } from 'react'
import { ChevronDown, Plus, X } from 'lucide-react'
import { Button, Card, Input, Select, Textarea } from '@/src/components/common'

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

const ToggleRow: React.FC<{ label: string; enabled?: boolean; onToggle?: () => void }> = ({
  label,
  enabled = true,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-300">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        className={`w-8 h-4 rounded-full relative transition-colors ${enabled ? 'bg-primary-600' : 'bg-dark-700'}`}
        aria-label={`Cambiar estado de ${label}`}
      >
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${enabled ? 'left-4' : 'left-0.5'}`}
        />
      </button>
    </div>
  )
}

interface MembershipPlanSidebarProps {
  onClose?: () => void;
  onCreatePlan?: () => void;
}

export const MembershipPlanSidebar: React.FC<MembershipPlanSidebarProps> = ({ onClose, onCreatePlan }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    active: true,
    basePrice: '5.00',
    cycle: 'mensual',
    limit: '4',
    prorationDays: '31',
    renewalDiscount: '15',
    maxPercent: '50',
    quotas: 'Todos los centros',
    facilities: 'Gimnasio, Piscina, Sauna',
    lockAllCenters: true,
    trainingPlan: true,
    nutritionPlan: false,
    evaluations: '2',
    access: 'Semana / Mañana / Preferente',
    notes: '',
  })

  const [schedules, setSchedules] = useState([
    { day: 'Lun', from: '00:00', to: '03:00' },
    { day: 'Mar', from: '00:00', to: '03:00' },
    { day: 'Mié', from: '00:00', to: '03:00' },
    { day: 'Jue', from: '00:00', to: '03:00' },
    { day: 'Vie', from: '00:00', to: '03:00' },
    { day: 'Sáb', from: '00:00', to: '03:00' },
    { day: 'Dom', from: '00:00', to: '03:00' },
  ])

  const isValid = useMemo(() => {
    return Boolean(form.name.trim() && form.description.trim() && Number(form.basePrice) >= 0)
  }, [form.basePrice, form.description, form.name])

  const updateField = <T extends keyof typeof form>(key: T, value: (typeof form)[T]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const addScheduleRow = () => {
    setSchedules((prev) => [...prev, { day: 'Extra', from: '00:00', to: '03:00' }])
  }

  const updateSchedule = (index: number, key: 'from' | 'to', value: string) => {
    setSchedules((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)))
  }

  const handleCreate = () => {
    if (!isValid) return
    onCreatePlan?.()
  }

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
          <Input
            label="Nombre del plan"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            required
          />
          <Textarea
            label="Descripción"
            placeholder="Descripción"
            rows={3}
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            required
          />
          <ToggleRow label="Activo" enabled={form.active} onToggle={() => updateField('active', !form.active)} />
        </div>
      </Section>

      <Section title="Precio y condiciones">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Precio base"
              type="number"
              min="0"
              step="0.01"
              value={form.basePrice}
              onChange={(e) => updateField('basePrice', e.target.value)}
            />
            <Select
              label="Ciclo"
              value={form.cycle}
              onChange={(e) => updateField('cycle', e.target.value)}
              options={[
                { label: 'Mensual', value: 'mensual' },
                { label: 'Trimestral', value: 'trimestral' },
                { label: 'Anual', value: 'anual' },
              ]}
            />
          </div>
          <Input
            label="Límite de semanas o servicios deportivos"
            type="number"
            min="0"
            value={form.limit}
            onChange={(e) => updateField('limit', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Periodo prorrateo en días"
              type="number"
              min="0"
              value={form.prorationDays}
              onChange={(e) => updateField('prorationDays', e.target.value)}
            />
            <Input
              label="Descuento de renovación (%)"
              type="number"
              min="0"
              max="100"
              value={form.renewalDiscount}
              onChange={(e) => updateField('renewalDiscount', e.target.value)}
            />
          </div>
          <Input
            label="Max % para cliente"
            type="number"
            min="0"
            value={form.maxPercent}
            onChange={(e) => updateField('maxPercent', e.target.value)}
          />
        </div>
      </Section>

      <Section title="Acceso y beneficios">
        <div className="space-y-3">
          <Input
            label="Cuotas permitidas"
            value={form.quotas}
            onChange={(e) => updateField('quotas', e.target.value)}
          />
          <Input
            label="Acceso a instalaciones"
            value={form.facilities}
            onChange={(e) => updateField('facilities', e.target.value)}
          />
          <ToggleRow
            label="Todos los centros e instalaciones tienen lock"
            enabled={form.lockAllCenters}
            onToggle={() => updateField('lockAllCenters', !form.lockAllCenters)}
          />

          <div className="space-y-2">
            <div className="grid grid-cols-[42px_1fr_1fr_20px] gap-2 text-[10px] text-gray-500 uppercase">
              <span>Día</span>
              <span>Hora de i</span>
              <span>Hora de f</span>
              <span />
            </div>
            {schedules.map((item, index) => (
              <div key={item.day} className="grid grid-cols-[42px_1fr_1fr_20px] gap-2 items-center">
                <div className="h-7 rounded-md bg-primary-600 text-white text-[11px] flex items-center justify-center">
                  {item.day}
                </div>
                <input
                  type="time"
                  value={item.from}
                  onChange={(e) => updateSchedule(index, 'from', e.target.value)}
                  className="h-7 rounded-md border border-dark-700 bg-dark-900 px-2 text-xs text-gray-300"
                />
                <input
                  type="time"
                  value={item.to}
                  onChange={(e) => updateSchedule(index, 'to', e.target.value)}
                  className="h-7 rounded-md border border-dark-700 bg-dark-900 px-2 text-xs text-gray-300"
                />
                <button type="button" className="text-gray-500 hover:text-gray-300" onClick={addScheduleRow}>
                  <Plus size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Beneficios adicionales">
        <div className="space-y-2">
          <ToggleRow
            label="Planes de entrenamiento"
            enabled={form.trainingPlan}
            onToggle={() => updateField('trainingPlan', !form.trainingPlan)}
          />
          <ToggleRow
            label="Planes de nutrición"
            enabled={form.nutritionPlan}
            onToggle={() => updateField('nutritionPlan', !form.nutritionPlan)}
          />
          <Input
            label="Evaluaciones & recordatorios"
            type="number"
            min="0"
            value={form.evaluations}
            onChange={(e) => updateField('evaluations', e.target.value)}
          />
        </div>
      </Section>

      <Section title="Accesos al centro">
        <div className="space-y-2">
          <Input
            label="Acceso"
            value={form.access}
            onChange={(e) => updateField('access', e.target.value)}
          />
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
        <Textarea
          rows={3}
          placeholder="Notas internas sobre el plan..."
          value={form.notes}
          onChange={(e) => updateField('notes', e.target.value)}
        />
      </Section>

      <div className="flex gap-2 pt-1">
        <Button variant="secondary" className="flex-1" onClick={onClose}>Cancelar</Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={handleCreate}
          disabled={!isValid}
          disabledReason="Completa los campos obligatorios para poder crear el plan."
        >
          Crear plan
        </Button>
      </div>
    </div>
  )
}