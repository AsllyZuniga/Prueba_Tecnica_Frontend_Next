"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Camera, ChevronDown, Plus, Upload, Video, X } from "lucide-react";
import { Badge, Button, Card } from "@/src/components/common";

type WorkOrderStatus = "En progreso" | "Pendiente" | "Completada";

interface MediaItem {
  id: string;
  src: string;
  alt: string;
}

const WORK_ORDER_STATUS_OPTIONS: WorkOrderStatus[] = [
  "En progreso",
  "Pendiente",
  "Completada",
];

const ASSIGNEE_OPTIONS = [
  "Juan Pérez (Técnico mantenimiento)",
  "Ana Torres (Técnico mantenimiento)",
  "Luis Romero (Supervisor técnico)",
];

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Card className="p-0 overflow-hidden rounded-xl bg-[#EDEDED] border border-brand-soft shadow-none">
      <div className="px-4 py-3 bg-[#EDEDED] flex items-center justify-between">
        <h3 className="text-label-16 text-brand-text">{title}</h3>
        <ChevronDown size={14} className="text-brand-text" />
      </div>
      <div className="p-4 bg-[#EDEDED]">{children}</div>
    </Card>
  );
};

interface WorkOrderEditSidebarProps {
  onClose?: () => void;
  onComplete?: () => void;
}

export const WorkOrderEditSidebar: React.FC<WorkOrderEditSidebarProps> = ({
  onClose,
  onComplete,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<WorkOrderStatus>("En progreso");
  const [assignee, setAssignee] = useState(ASSIGNEE_OPTIONS[0]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    { id: "preset-1", src: "/figma/asset-1.png", alt: "Evidencia de OT 1" },
    { id: "preset-2", src: "/figma/asset-3.png", alt: "Evidencia de OT 2" },
  ]);

  const statusVariant = useMemo(() => {
    if (status === "Completada") return "success";
    if (status === "Pendiente") return "warning";
    return "warning";
  }, [status]);

  const handleSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const newItems: MediaItem[] = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

    if (!newItems.length) return;

    setMediaItems((previous) => [...previous, ...newItems]);
    event.target.value = "";
  };

  const handleOpenFilePicker = () => fileInputRef.current?.click();

  const handleChangeStatus = () => {
    const currentIndex = WORK_ORDER_STATUS_OPTIONS.indexOf(status);
    const nextIndex = (currentIndex + 1) % WORK_ORDER_STATUS_OPTIONS.length;
    setStatus(WORK_ORDER_STATUS_OPTIONS[nextIndex]);
  };

  const handleReassign = () => {
    const currentIndex = ASSIGNEE_OPTIONS.indexOf(assignee);
    const nextIndex = (currentIndex + 1) % ASSIGNEE_OPTIONS.length;
    setAssignee(ASSIGNEE_OPTIONS[nextIndex]);
  };

  return (
    <div className="w-full max-w-[1200px] rounded-2xl bg-[#A5A5A5] border border-brand-soft p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-title-24 text-brand-text">
            ORDEN DE TRABAJO #OT-204
          </h2>
          <p className="text-text-12 font-normal text-brand-text mt-1">
            Cinta no arricanza correctamente
          </p>
        </div>
        <button
          className="text-brand-text hover:text-brand-black transition-colors"
          aria-label="Cerrar sidebar"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>

      <Card className="space-y-2.5 bg-brand-sectionBg border border-brand-border shadow-none">
        <div className="grid grid-cols-2 gap-3">
          <p className="text-text-12 font-semibold text-brand-textStrong">
            Sala
          </p>

          <p className="text-right text-[14px] leading-5 font-normal text-brand-text">
            Sala Fitness
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <p className="text-text-12 font-semibold text-brand-textStrong">
            Técnico
          </p>
          <div className="text-right">
            <span
              className="px-2 py-0.5 rounded text-[12px] font-normal"
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                color: "#FF0000",
              }}
            >
              Crítica
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <p className="text-text-12 font-semibold text-brand-textStrong">
            SLA
          </p>
          <div className="text-right">
            <span
              className="px-2 py-0.5 rounded text-[12px] font-normal"
              style={{
                backgroundColor: "rgba(234, 88, 12, 0.2)",
                color: "#EA580C",
              }}
            >
              En progreso
            </span>
          </div>
        </div>
      </Card>

      <Section title="Información básica">
        <div className="space-y-3">
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Título
            </p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              Reparación motor cinta NordiTrack 03
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              Sala Fitness (1* planta)
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Creada por
            </p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              Marta Gómez (Recepción)
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Asignado a
            </p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              {assignee}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Fecha de creación
            </p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              10/10/2025 - 10:00
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Fecha límite (SLA)
            </p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              11/10/2025 - 17:00
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Última actualización
            </p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              11/10/2025 - 12:30
            </p>
          </div>
        </div>
      </Section>

      <Section title="Historial de cambios">
        <div className="space-y-4">
          <div className="rounded-xl border border-brand-soft bg-[#FFFFFF] overflow-hidden">
            <div className="grid grid-cols-[0.3fr_2fr_1.2fr] gap-2 px-2 py-2 text-[12px] leading-4 font-semibold text-[#111111]">
              <span>Paso</span>
              <span>Descripción</span>
              <span>Resultado</span>
            </div>
            <div className="grid grid-cols-[0.3fr_2fr_1.2fr] gap-2 px-2 py-2 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft items-center">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 cursor-pointer"
              />
              <span>Desconectar equipo y verificar alimentación</span>
              <div className="flex items-center justify-between w-full">
                <span className="px-1.5 py-0 bg-[#E8F5E9] text-[#32CD32] rounded-full text-[11px] leading-4 font-normal w-fit">
                  Correcto
                </span>
                <span className="font-semibold text-[#444444]">...</span>
              </div>
            </div>
            <div className="grid grid-cols-[0.3fr_2fr_1.2fr] gap-2 px-2 py-2 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft items-center">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 cursor-pointer"
              />
              <span>Medir voltaje del motor principal</span>
              <div className="flex items-center justify-between w-full">
                <span className="text-[#666666]">230V</span>
                <span className="font-semibold text-[#444444]">...</span>
              </div>
            </div>
            <div className="grid grid-cols-[0.3fr_2fr_1.2fr] gap-2 px-2 py-2 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft items-center">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 cursor-pointer"
              />
              <span>Sustituir fusible principal</span>
              <div className="flex items-center justify-between w-full">
                <span className="px-1.5 py-0 bg-[#E8F5E9] text-[#32CD32] rounded-full text-[11px] leading-4 font-normal w-fit">
                  Hecho
                </span>
                <span className="font-semibold text-[#444444]">...</span>
              </div>
            </div>
            <div className="grid grid-cols-[0.3fr_2fr_1.2fr] gap-2 px-2 py-2 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft items-center">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 cursor-pointer"
              />
              <span>Verificar velocidad tras encendido</span>
              <div className="flex items-center justify-between w-full">
                <span className="px-1.5 py-0 bg-[#FFF3E0] text-[#EA580C] rounded-full text-[11px] leading-4 font-normal w-fit">
                  Pendiente
                </span>
                <span className="font-semibold text-[#444444]">...</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-[#EDEDED] rounded-lg">
            <Camera size={16} className="text-[#000000]" />
            <span className="text-text-12 font-semibold text-brand-textStrong">
              Marta Gómez
            </span>
            <button className="ml-auto px-3 py-1 rounded-lg bg-[#FFFFFF] text-[14px] font-medium text-[#666666] hover:bg-[#F5F5F5]">
              +Añadir
            </button>
          </div>

          <div>
            <p className="text-text-12 font-semibold text-brand-textStrong mb-2">
              Notas adicionales:
            </p>
            <div className="rounded-xl border border-brand-soft bg-[#FFFFFF] p-4">
              <p className="text-text-12 font-normal leading-relaxed text-brand-text">
                "El motor respondía intermitentemente; se recomienda revisar
                conexiones internas."
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Materiales usados">
        <div className="rounded-xl border border-brand-soft bg-[#FFFFFF] overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_0.7fr_0.9fr_1fr] gap-2 px-3 py-3 text-[12px] leading-4 font-semibold text-[#111111]">
            <span>Código</span>
            <span>Descripción</span>
            <span>Cant.</span>
            <span>Unidad.</span>
            <span>Costo</span>
          </div>
          <div className="grid grid-cols-[1fr_1fr_0.7fr_0.9fr_1fr] gap-2 px-3 py-3 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft">
            <span>REP-045</span>
            <span>REP-045</span>
            <span>1</span>
            <span>ud</span>
            <span>3.50 USD</span>
          </div>
          <div className="grid grid-cols-[1fr_1fr_0.7fr_0.9fr_1fr] gap-2 px-3 py-3 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft">
            <span>REP-045</span>
            <span>REP-045</span>
            <span>2</span>
            <span>m</span>
            <span>3.50 USD</span>
          </div>
        </div>
      </Section>

      <Section title="Tiempo de ejecución">
        <div className="space-y-3">
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">Inicio</p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">10/10/2025 - 10:15</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">Fin</p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">11/10/2025 - 12:10</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">Duración total</p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">**1h 55m**</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">Técnico</p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">Juan Pérez</p>
          </div>
          <div className="flex justify-end pt-1">
            <Button
              variant="primary"
              size="sm"
              className="!rounded-lg !px-4 !py-1.5 !text-[14px] !leading-5 !font-medium !bg-gradient-to-r !from-[#FF56B0] !to-[#8C4787] !border-0 !text-[#FFFFFF] hover:!opacity-95 !shadow-none"
            >
              Registrar nuevo tiempo
            </Button>
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
            className="w-full border border-brand-soft rounded-lg py-4 px-3 bg-brand-white hover:bg-brand-surface transition-colors text-center"
          >
            <Upload size={18} className="mx-auto text-brand-text" />
            <p className="text-[14px] leading-5 font-normal text-brand-text mt-2">
              Arrastra imágenes aquí o
            </p>
            <p className="text-[14px] leading-5 font-medium text-[#15B4E9]">
              busca archivos
            </p>
          </button>
          <div className="grid grid-cols-3 gap-2">
            {mediaItems.slice(0, 2).map((item) => (
              <button
                key={item.id}
                className="h-10 rounded-md border border-brand-soft bg-brand-white overflow-hidden"
              >
                {item.src.startsWith("/figma/") ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
            <button
              type="button"
              onClick={handleOpenFilePicker}
              className="h-10 rounded-md border border-brand-soft bg-brand-white flex items-center justify-center text-brand-text"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="text-text-12 font-semibold text-brand-textStrong">Video corto</p>
          <button
            type="button"
            className="w-full border border-brand-soft rounded-lg py-3 px-3 bg-brand-white hover:bg-brand-surface transition-colors flex items-center justify-center gap-2"
          >
            <Video size={14} className="text-brand-text" />
            <span className="text-[14px] leading-5 font-medium text-brand-text">
              Subir video (máx. 30s)
            </span>
          </button>
        </div>
      </Section>

      <Card className="p-0 overflow-hidden rounded-xl bg-[#EDEDED] border border-brand-soft shadow-none space-y-0">

        <div className="p-4 bg-[#EDEDED] space-y-2.5">
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Firma del técnico
            </p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              10/10/2025 - 10:15
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Firma del responsable
            </p>
            <p className="text-[14px] leading-5 font-normal text-brand-text text-right">
              11/10/2025 - 12:10
            </p>
          </div>
          <div>
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Observaciones finales
            </p>
            <div className="rounded-md bg-[#FFFFFF] border border-brand-soft px-3 py-2 mt-2">
              <p className="text-text-12 font-normal text-brand-text">
                {"> Equipo probado y en funcionamiento normal."}
                <br />
                {"> Se recomienda mantenimiento preventivo en 30 días."}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="rounded-2xl bg-[#EDEDED] p-3 flex gap-2 items-center justify-center">
        <Button
          variant="primary"
          size="sm"
          className="!rounded-lg !px-4 !py-1.5 !text-[14px] !leading-5 !font-medium !bg-gradient-to-r !from-[#FF56B0] !to-[#8C4787] !border-0 !text-[#FFFFFF] hover:!opacity-95 !shadow-none"
          onClick={onComplete}
        >
          Completar y cerrar
        </Button>
      </div>
    </div>
  );
};
