'use client'

import React, { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Plus, Upload, Video, X } from 'lucide-react'
import { Badge, Button, Card } from '@/src/components/common'

type WorkOrderStatus = 'En progreso' | 'Pendiente' | 'Completada'

interface MediaItem {
  id: string;
  src: string;
  alt: string;
}

const WORK_ORDER_STATUS_OPTIONS: WorkOrderStatus[] = ['En progreso', 'Pendiente', 'Completada']

const ASSIGNEE_OPTIONS = [
  'Juan Pérez (Técnico mantenimiento)',
  'Ana Torres (Técnico mantenimiento)',
  'Luis Romero (Supervisor técnico)',
]

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <Card className="p-0 overflow-hidden rounded-xl bg-dark-700/40">
      <div className="px-5 py-3.5 bg-dark-700/60 flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wide text-gray-300 uppercase">{title}</h3>
        <ChevronDown size={14} className="text-gray-500" />
      </div>
      <div className="p-5 bg-dark-800/50">{children}</div>
    </Card>
  )
}

interface WorkOrderEditSidebarProps {
  onClose?: () => void;
  onComplete?: () => void;
}

export const WorkOrderEditSidebar: React.FC<WorkOrderEditSidebarProps> = ({ onClose, onComplete }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [status, setStatus] = useState<WorkOrderStatus>('En progreso')
  const [assignee, setAssignee] = useState(ASSIGNEE_OPTIONS[0])
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    { id: 'preset-1', src: '/figma/asset-1.png', alt: 'Evidencia de OT 1' },
    { id: 'preset-2', src: '/figma/asset-3.png', alt: 'Evidencia de OT 2' },
  ])

  const statusVariant = useMemo(() => {
    if (status === 'Completada') return 'success'
    if (status === 'Pendiente') return 'warning'
    return 'warning'
  }, [status])

  const handleSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files?.length) return

    const newItems: MediaItem[] = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        src: URL.createObjectURL(file),
        alt: file.name,
      }))

    if (!newItems.length) return

    setMediaItems((previous) => [...previous, ...newItems])
    event.target.value = ''
  }

  const handleOpenFilePicker = () => fileInputRef.current?.click()

  const handleChangeStatus = () => {
    const currentIndex = WORK_ORDER_STATUS_OPTIONS.indexOf(status)
    const nextIndex = (currentIndex + 1) % WORK_ORDER_STATUS_OPTIONS.length
    setStatus(WORK_ORDER_STATUS_OPTIONS[nextIndex])
  }

  const handleReassign = () => {
    const currentIndex = ASSIGNEE_OPTIONS.indexOf(assignee)
    const nextIndex = (currentIndex + 1) % ASSIGNEE_OPTIONS.length
    setAssignee(ASSIGNEE_OPTIONS[nextIndex])
  }

  return (
    <div className="w-full max-w-[1200px] rounded-2xl bg-dark-800 border border-dark-700 p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-100">ORDEN DE TRABAJO #OT-204</h2>
          <p className="text-[11px] text-gray-500 mt-1">Vinculada a incidencia #INC-310</p>
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
            <p className="text-gray-500 mb-1">Sala</p>
            <p className="text-gray-100 font-medium">Técnico</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 mb-1">Sala Privada</p>
            <Badge variant="danger">Crítico</Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-500 mb-1">SLA</p>
            <p className="text-gray-100 font-medium">6 h</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 mb-1">Estado</p>
            <Badge variant={statusVariant}>{status}</Badge>
          </div>
        </div>
      </Card>

      <Section title="Información básica">
        <div className="space-y-3 text-xs">
          <div>
            <p className="text-gray-500">Título</p>
            <p className="text-gray-100">Reparación motor cinta NordiTrack 03</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500">Sala</p>
              <p className="text-gray-200">Clínica Norte / Planta baja</p>
            </div>
            <div>
              <p className="text-gray-500">Código de activo</p>
              <p className="text-gray-200">CINTA-FN03 (Equipamiento)</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500">Asignado a</p>
              <p className="text-gray-200">{assignee}</p>
            </div>
            <div>
              <p className="text-gray-500">Fecha de creación</p>
              <p className="text-gray-200">10/10/2025 - 12:00</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-gray-500">
              Estado
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as WorkOrderStatus)}
                className="mt-1 w-full rounded-md border border-dark-700 bg-dark-900 px-2 py-1.5 text-xs text-gray-200 outline-none focus:border-primary-500"
              >
                {WORK_ORDER_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="text-gray-500">
              Reasignar a
              <select
                value={assignee}
                onChange={(event) => setAssignee(event.target.value)}
                className="mt-1 w-full rounded-md border border-dark-700 bg-dark-900 px-2 py-1.5 text-xs text-gray-200 outline-none focus:border-primary-500"
              >
                {ASSIGNEE_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500">Fecha límite SLA</p>
              <p className="text-gray-200">11/10/2025 - 17:00</p>
            </div>
            <div>
              <p className="text-gray-500">Última actualización</p>
              <p className="text-gray-200">17/10/2025 - 12:30</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Historial de cambios">
        <div className="space-y-2 text-[11px]">
          <div className="grid grid-cols-[20px_1fr_70px] gap-2 text-gray-400">
            <span>○</span>
            <span>Creación OT #203 y vínculo</span>
            <span>Completo</span>
          </div>
          <div className="grid grid-cols-[20px_1fr_70px] gap-2 text-gray-400">
            <span>○</span>
            <span>Motor retirado en banco principal</span>
            <span>25%</span>
          </div>
          <div className="grid grid-cols-[20px_1fr_70px] gap-2 text-gray-400">
            <span>○</span>
            <span>Cambio fusible principal</span>
            <span>50%</span>
          </div>
          <div className="grid grid-cols-[20px_1fr_70px] gap-2 text-gray-300">
            <span>●</span>
            <span>Verificar velocidad tras encendido</span>
            <span>En curso</span>
          </div>
          <div className="flex items-center justify-between text-gray-400 pt-1">
            <span>⚠ Alertas de mantenimiento</span>
            <button className="px-2 py-1 rounded bg-dark-900 border border-dark-700 text-[10px]">Ver</button>
          </div>
        </div>
      </Section>

      <Section title="Notas adicionales">
        <textarea
          rows={3}
          placeholder="El motor respondió intermitentemente, se recomiendan revisar conexiones internas."
          className="w-full bg-dark-900 border border-dark-700 rounded-md px-3 py-2 text-xs text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary-500 resize-none"
        />
      </Section>

      <Section title="Materiales usados">
        <div className="space-y-2 text-[11px] text-gray-300">
          <div className="grid grid-cols-[80px_1fr_30px_45px_65px] gap-2 text-gray-500 uppercase">
            <span>Código</span>
            <span>Descripción</span>
            <span>Cant.</span>
            <span>Unidad</span>
            <span>Costo</span>
          </div>
          <div className="grid grid-cols-[80px_1fr_30px_45px_65px] gap-2">
            <span>MTT-013</span>
            <span>FSP 40-4</span>
            <span>1</span>
            <span>Und</span>
            <span>3.50 USD</span>
          </div>
          <div className="grid grid-cols-[80px_1fr_30px_45px_65px] gap-2">
            <span>MTT-015</span>
            <span>FSP 40-5</span>
            <span>1</span>
            <span>Und</span>
            <span>3.30 USD</span>
          </div>
        </div>
      </Section>

      <Section title="Tiempo de ejecución">
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500">Inicio</p>
              <p className="text-gray-200">10/10/2025 - 10:15</p>
            </div>
            <div>
              <p className="text-gray-500">Fin</p>
              <p className="text-gray-200">11/10/2025 - 17:30</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">Duración total</p>
            <p className="text-gray-200">~31.5 horas</p>
          </div>
          <div className="pt-1">
            <Button variant="primary" className="w-full">Registrar horas y piezas</Button>
          </div>
        </div>
      </Section>

      <Section title="Medios">
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleSelectFiles}
          />
          <button
            type="button"
            onClick={handleOpenFilePicker}
            className="w-full border border-dark-700 rounded-lg py-4 px-3 bg-dark-900 hover:bg-dark-800 transition-colors text-center"
          >
            <Upload size={18} className="mx-auto text-gray-300" />
            <p className="text-[11px] text-gray-300 mt-2">Arrastra imágenes aquí o</p>
            <p className="text-[11px] text-primary-500 mt-0.5">busca archivos</p>
          </button>
          <div className="grid grid-cols-4 gap-2">
            {mediaItems.slice(0, 2).map((item) => (
              <button key={item.id} className="h-10 rounded-md border border-dark-700 bg-dark-900 overflow-hidden">
                {item.src.startsWith('/figma/') ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                )}
              </button>
            ))}
            <button className="h-10 rounded-md border border-dark-700 bg-dark-900 flex items-center justify-center text-gray-500">
              <Video size={14} />
            </button>
            <button type="button" onClick={handleOpenFilePicker} className="h-10 rounded-md border border-dark-700 bg-dark-900 flex items-center justify-center text-gray-300">
              <Plus size={14} />
            </button>
          </div>
          <div className="text-center text-[11px] text-gray-400 border border-dark-700 rounded-md py-2">Subir video (máx. 30s)</div>
        </div>
      </Section>

      <Card className="text-xs space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Firma del técnico</p>
          <p className="text-gray-300">10/10/2025 - 17:05</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Firma del responsable</p>
          <p className="text-gray-300">11/10/2025 - 12:10</p>
        </div>
        <div>
          <p className="text-gray-500">Observaciones finales</p>
          <p className="text-gray-200 mt-1">Equipo probado y en funcionamiento normal. Se recomienda mantenimiento preventivo en 30 días.</p>
        </div>
      </Card>

      <div className="flex gap-2 pt-1">
        <Button variant="secondary" className="flex-1" onClick={handleChangeStatus}>Cambiar estado</Button>
        <Button variant="secondary" className="flex-1" onClick={handleReassign}>Reasignar</Button>
        <Button variant="secondary" className="flex-1" onClick={onComplete}>Completar y cerrar</Button>
      </div>
    </div>
  )
}