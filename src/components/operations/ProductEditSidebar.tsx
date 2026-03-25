'use client'

import React, { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Plus, Upload, Video, X } from 'lucide-react'
import { Badge, Button, Card } from '@/src/components/common'

type IncidentStatus = 'En progreso' | 'Pendiente' | 'Resuelta'

interface MediaItem {
  id: string;
  src: string;
  alt: string;
}

const STATUS_OPTIONS: IncidentStatus[] = ['En progreso', 'Pendiente', 'Resuelta']

const TECHNICIAN_OPTIONS = [
  'Juan Pérez (Técnico mantenimiento)',
  'Ana Torres (Técnico mantenimiento)',
  'Luis Romero (Supervisor técnico)',
]

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-4 py-3 border-b border-dark-700 flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wide text-gray-300 uppercase">{title}</h3>
        <ChevronDown size={14} className="text-gray-500" />
      </div>
      <div className="p-4">{children}</div>
    </Card>
  )
}

interface ProductEditSidebarProps {
  onClose?: () => void;
  onAdvance?: () => void;
}

export const ProductEditSidebar: React.FC<ProductEditSidebarProps> = ({ onClose, onAdvance }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [status, setStatus] = useState<IncidentStatus>('En progreso')
  const [assignee, setAssignee] = useState(TECHNICIAN_OPTIONS[0])
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    { id: 'preset-1', src: '/figma/asset-1.png', alt: 'Evidencia de incidencia 1' },
    { id: 'preset-2', src: '/figma/asset-3.png', alt: 'Evidencia de incidencia 2' },
  ])

  const statusVariant = useMemo(() => {
    if (status === 'Resuelta') return 'success'
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
    const currentIndex = STATUS_OPTIONS.indexOf(status)
    const nextIndex = (currentIndex + 1) % STATUS_OPTIONS.length
    setStatus(STATUS_OPTIONS[nextIndex])
  }

  const handleReassign = () => {
    const currentIndex = TECHNICIAN_OPTIONS.indexOf(assignee)
    const nextIndex = (currentIndex + 1) % TECHNICIAN_OPTIONS.length
    setAssignee(TECHNICIAN_OPTIONS[nextIndex])
  }

  return (
    <div className="w-full max-w-[1200px] rounded-2xl bg-dark-800 border border-dark-700 p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-100">INCIDENCIA #INC-310</h2>
          <p className="text-[11px] text-gray-500 mt-1">Orden de trabajo asociada: OT-204</p>
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
            <p className="text-gray-100 font-medium">8 h</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 mb-1">Estado</p>
            <Badge variant={statusVariant}>{status}</Badge>
          </div>
        </div>
      </Card>

      <Section title="Descripción">
        <p className="text-xs leading-relaxed text-gray-300">
          El monitor reporta que la clínica NordiTrack 03 no enciende desde ayer. Al encender, muestra un pitido y pantalla negra. Posible falla eléctrica o fusible interno.
        </p>
      </Section>

      <Section title="Responsable">
        <div className="space-y-4 text-xs">
          <div>
            <p className="text-gray-500">Asignado a</p>
            <p className="text-gray-100 font-medium">{assignee}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-gray-500">
              Estado
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as IncidentStatus)}
                className="mt-1 w-full rounded-md border border-dark-700 bg-dark-900 px-2 py-1.5 text-xs text-gray-200 outline-none focus:border-primary-500"
              >
                {STATUS_OPTIONS.map((option) => (
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
                {TECHNICIAN_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500">Fecha de creación</p>
              <p className="text-gray-200">10/10/2025 - 09:41</p>
            </div>
            <div>
              <p className="text-gray-500">Fecha límite según SLA</p>
              <p className="text-gray-200">11/10/2025 - 17:00</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Comentarios">
        <div className="space-y-3 text-xs">
          <div className="border-b border-dark-700 pb-3">
            <div className="flex items-center justify-between text-gray-400">
              <span>Maria Gómez (Recepción)</span>
              <span>14/10/2025 - 09:45</span>
            </div>
            <p className="text-gray-200 mt-1">“Reporto incidencia y solicito que la cita no se reprograme”.</p>
          </div>
          <div className="border-b border-dark-700 pb-3">
            <div className="flex items-center justify-between text-gray-400">
              <span>Juan Pérez (Técnico)</span>
              <span>14/10/2025 - 11:20</span>
            </div>
            <p className="text-gray-200 mt-1">“Comprobando alimentación y fusible. Solicito repuesto motor interno”.</p>
          </div>
          <div>
            <div className="flex items-center justify-between text-gray-400">
              <span>María Gómez</span>
              <span>15/10/2025 - 11:15</span>
            </div>
            <p className="text-gray-200 mt-1">“Gracias Juan, deja aviso si necesitan cortar el suministro”.</p>
          </div>
          <textarea
            placeholder="Escribe un comentario..."
            className="w-full bg-dark-900 border border-dark-700 rounded-md px-3 py-2 text-xs text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary-500 resize-none"
            rows={3}
          />
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

      <Section title="Historial de cambios">
        <div className="space-y-2 text-[11px]">
          <div className="grid grid-cols-[90px_1fr_80px] gap-2 text-gray-500 uppercase tracking-wide">
            <span>Fecha</span>
            <span>Acción</span>
            <span>Usuario</span>
          </div>
          <div className="grid grid-cols-[90px_1fr_80px] gap-2 text-gray-300">
            <span>10/10/2025</span>
            <span>Creación de incidencia</span>
            <span>María</span>
          </div>
          <div className="grid grid-cols-[90px_1fr_80px] gap-2 text-gray-300">
            <span>13/10/2025</span>
            <span>Asignada a Juan P.</span>
            <span>Sistema</span>
          </div>
          <div className="grid grid-cols-[90px_1fr_80px] gap-2 text-gray-300">
            <span>14/10/2025</span>
            <span>Estado: En progreso</span>
            <span>Juan</span>
          </div>
          <div className="grid grid-cols-[90px_1fr_80px] gap-2 text-gray-300">
            <span>15/10/2025</span>
            <span>Comentario añadido</span>
            <span>María</span>
          </div>
        </div>
      </Section>

      <div className="flex gap-2 pt-1">
        <Button variant="secondary" className="flex-1" onClick={handleChangeStatus}>Cambiar estado</Button>
        <Button variant="secondary" className="flex-1" onClick={handleReassign}>Reasignar</Button>
        <Button variant="primary" className="flex-1" onClick={onAdvance}>Cerrar incidencia</Button>
      </div>
    </div>
  )
}