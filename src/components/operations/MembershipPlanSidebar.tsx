'use client'

import React, { useMemo, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button, Card, Input, Select, Textarea } from '@/src/components/common'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <Card className="rounded-xl bg-brand-sectionBg border border-brand-border shadow-none p-5">
      <div className="mb-3">
        <h3 className="text-label-16 text-brand-text">{title}</h3>
      </div>
      <div>{children}</div>
    </Card>
  )
}

const ToggleRow: React.FC<{
  label: string;
  enabled?: boolean;
  onToggle?: () => void;
  stateText?: string;
  labelClassName?: string;
}> = ({
  label,
  enabled = true,
  onToggle,
  stateText,
  labelClassName,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className={labelClassName ?? 'text-label-14 text-brand-textStrong'}>{label}</span>
      <div className="flex items-center gap-2">
        {stateText && <span className="text-label-12 text-brand-toggle">{stateText}</span>}
        <button
          type="button"
          onClick={onToggle}
          className={`w-8 h-4 rounded-full relative transition-colors ${enabled ? 'bg-brand-toggle' : 'bg-brand-toggle/35'}`}
          aria-label={`Cambiar estado de ${label}`}
        >
          <span
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${enabled ? 'left-4' : 'left-0.5'}`}
          />
        </button>
      </div>
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
    periodicity: '30',
    limit: '4',
    prorationDays: '31',
    renewalDiscount: '15',
    maxPercent: '50',
    allowedCenters: 'todos',
    facilitiesAccess: 'gym-pool-sauna',
    defaultEnrollment: 'mensual',
    eventAccess: 'preferente',
    allAllowedAccesses: 'semana-manana-preferente',
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
    <div className="w-full max-w-[1200px] rounded-2xl bg-brand-sidebarBg border border-brand-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-title-24 text-brand-text">Crear nuevo plan</h2>
        <button
          className="text-brand-text hover:text-brand-black transition-colors"
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
          <ToggleRow
            label="Estado"
            stateText={form.active ? 'Activo' : 'Inactivo'}
            enabled={form.active}
            onToggle={() => updateField('active', !form.active)}
          />
        </div>
      </Section>

      <Section title="Precio y condiciones">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Select
              label="Precio base"
              value={form.basePrice}
              onChange={(e) => updateField('basePrice', e.target.value)}
              options={[
                { label: '5.00', value: '5.00' },
                { label: '10.00', value: '10.00' },
                { label: '15.00', value: '15.00' },
              ]}
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
            <Select
              label="Periodicidad"
              value={form.periodicity}
              onChange={(e) => updateField('periodicity', e.target.value)}
              options={[
                { label: '7 días', value: '7' },
                { label: '15 días', value: '15' },
                { label: '30 días', value: '30' },
              ]}
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
          <Select
            label="Centros permitidos"
            value={form.allowedCenters}
            onChange={(e) => updateField('allowedCenters', e.target.value)}
            options={[
              { label: 'Todos los centros', value: 'todos' },
              { label: 'Centro Norte', value: 'norte' },
              { label: 'Centro Sur', value: 'sur' },
            ]}
          />
          <Select
            label="Acceso a instalaciones"
            value={form.facilitiesAccess}
            onChange={(e) => updateField('facilitiesAccess', e.target.value)}
            options={[
              { label: 'Gimnasio, Piscina, Sauna', value: 'gym-pool-sauna' },
              { label: 'Solo gimnasio', value: 'gym-only' },
              { label: 'Gimnasio y piscina', value: 'gym-pool' },
            ]}
          />
          <Select
            label="Matrícula por defecto"
            value={form.defaultEnrollment}
            onChange={(e) => updateField('defaultEnrollment', e.target.value)}
            options={[
              { label: 'Mensual', value: 'mensual' },
              { label: 'Trimestral', value: 'trimestral' },
              { label: 'Anual', value: 'anual' },
            ]}
          />
          <Select
            label="Acceso a eventos"
            value={form.eventAccess}
            onChange={(e) => updateField('eventAccess', e.target.value)}
            options={[
              { label: 'Preferente', value: 'preferente' },
              { label: 'General', value: 'general' },
              { label: 'Sin acceso', value: 'none' },
            ]}
          />
          <ToggleRow
            label="Todos los centros e instalaciones tienen lock"
            enabled={form.lockAllCenters}
            onToggle={() => updateField('lockAllCenters', !form.lockAllCenters)}
          />

          <div className="space-y-2">
            <div className="grid grid-cols-[42px_1fr_1fr_20px] gap-2 text-[10px] text-brand-text uppercase">
              <span>Día</span>
              <span>Hora de i</span>
              <span>Hora de f</span>
              <span />
            </div>
            {schedules.map((item, index) => (
              <div key={item.day} className="grid grid-cols-[42px_1fr_1fr_20px] gap-2 items-center">
                <div className="h-7 rounded-md bg-brand-toggle text-white text-[11px] font-semibold flex items-center justify-center">
                  {item.day}
                </div>
                <input
                  type="time"
                  value={item.from}
                  onChange={(e) => updateSchedule(index, 'from', e.target.value)}
                  className="h-7 rounded-md border border-brand-soft bg-brand-white px-2 text-[16px] leading-6 font-normal text-brand-text"
                />
                <input
                  type="time"
                  value={item.to}
                  onChange={(e) => updateSchedule(index, 'to', e.target.value)}
                  className="h-7 rounded-md border border-brand-soft bg-brand-white px-2 text-[16px] leading-6 font-normal text-brand-text"
                />
                <button type="button" className="text-brand-text hover:text-brand-black" onClick={addScheduleRow}>
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
            labelClassName="text-[16px] leading-6 font-normal text-brand-text"
            enabled={form.trainingPlan}
            onToggle={() => updateField('trainingPlan', !form.trainingPlan)}
          />
          <ToggleRow
            label="Planes de nutrición"
            labelClassName="text-[16px] leading-6 font-normal text-brand-text"
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
          <Select
            label="Todos los accesos permitidos"
            value={form.allAllowedAccesses}
            onChange={(e) => updateField('allAllowedAccesses', e.target.value)}
            options={[
              { label: 'Semana / Mañana / Preferente', value: 'semana-manana-preferente' },
              { label: 'Semana / Tarde', value: 'semana-tarde' },
              { label: 'Fin de semana', value: 'fin-semana' },
            ]}
          />
          <div className="space-y-1">
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 text-text-12 font-normal text-brand-text">
              <span>Tipo</span>
              <span>Evento</span>
              <span>Acceso</span>
            </div>
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 text-text-12 font-normal text-brand-text">
              <span>AL</span>
              <span>Evento A</span>
              <span>Semana/Mañana/Preferente</span>
            </div>
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 text-text-12 font-normal text-brand-text">
              <span>ES</span>
              <span>Evento B</span>
              <span>Semana/Mañana/Preferente</span>
            </div>
            <div className="grid grid-cols-[50px_1fr_1fr] gap-2 text-text-12 font-normal text-brand-text">
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

      <div className="rounded-xl border border-brand-border bg-brand-white p-3">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handleCreate}
            disabled={!isValid}
            disabledReason="Completa los campos obligatorios para poder crear el plan."
          >
            Crear plan
          </Button>
        </div>
      </div>
    </div>
  )
}