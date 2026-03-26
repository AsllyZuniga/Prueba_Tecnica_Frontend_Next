"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Plus, Upload, Video, X } from "lucide-react";
import { Badge, Button, Card } from "@/src/components/common";

type IncidentStatus = "En progreso" | "Pendiente" | "Resuelta";

interface MediaItem {
  id: string;
  src: string;
  alt: string;
}

const STATUS_OPTIONS: IncidentStatus[] = [
  "En progreso",
  "Pendiente",
  "Resuelta",
];

const TECHNICIAN_OPTIONS = [
  "Juan Pérez (Técnico mantenimiento)",
  "Ana Torres (Técnico mantenimiento)",
  "Luis Romero (Supervisor técnico)",
];

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  contentClassName?: string;
  className?: string;
  headerClassName?: string;
}> = ({ title, children, contentClassName, className, headerClassName }) => {
  return (
    <Card
      className={`p-0 overflow-hidden rounded-xl bg-[#EDEDED] border border-brand-soft shadow-none ${className ?? ""}`}
    >
      <div
        className={`bg-[#EDEDED] flex items-center justify-between ${
          headerClassName ?? "px-3 py-2"
        }`}
      >
        <h3 className="text-label-16 text-brand-text">{title}</h3>
        <ChevronDown size={14} className="text-brand-text" />
      </div>
      <div className={`bg-[#EDEDED] ${contentClassName ?? "p-3"}`}>
        {children}
      </div>
    </Card>
  );
};

interface ProductEditSidebarProps {
  onClose?: () => void;
  onAdvance?: () => void;
}

export const ProductEditSidebar: React.FC<ProductEditSidebarProps> = ({
  onClose,
  onAdvance,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<IncidentStatus>("En progreso");
  const [assignee, setAssignee] = useState(TECHNICIAN_OPTIONS[0]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "preset-1",
      src: "/figma/asset-1.png",
      alt: "Evidencia de incidencia 1",
    },
    {
      id: "preset-2",
      src: "/figma/asset-3.png",
      alt: "Evidencia de incidencia 2",
    },
  ]);

  const statusVariant = useMemo(() => {
    if (status === "Resuelta") return "success";
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
    const currentIndex = STATUS_OPTIONS.indexOf(status);
    const nextIndex = (currentIndex + 1) % STATUS_OPTIONS.length;
    setStatus(STATUS_OPTIONS[nextIndex]);
  };

  const handleReassign = () => {
    const currentIndex = TECHNICIAN_OPTIONS.indexOf(assignee);
    const nextIndex = (currentIndex + 1) % TECHNICIAN_OPTIONS.length;
    setAssignee(TECHNICIAN_OPTIONS[nextIndex]);
  };

  return (
    <div className="w-full max-w-[1200px] rounded-2xl bg-[#A5A5A5] border border-brand-soft p-3 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-title-24 text-brand-text">INCIDENCIA #INC-310</h2>
          <p className="text-text-12 font-normal text-brand-text mt-1">
            Cinta no arranca correctamente
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

      <Card className="space-y-2 bg-brand-sectionBg border border-brand-border shadow-none p-3">
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
              className="px-1.5 py-0 rounded-full text-[12px] leading-4 font-normal"
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
              className="px-1.5 py-0 rounded-full text-[12px] leading-4 font-normal"
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

      <Section
        title="Descripción"
        headerClassName="px-2.5 py-2"
        contentClassName="px-2.5 pb-2.5 pt-1"
      >
        <div className="rounded-xl border border-brand-soft bg-[#FFFFFF] p-2">
          <p className="text-text-12 font-normal leading-relaxed text-brand-text">
            El monitor reporta que la clínica NordiTrack 03 no enciende desde
            ayer. Al encender, muestra un pitido y pantalla negra. Posible falla
            eléctrica o fusible interno.
          </p>
        </div>
      </Section>

      <Section title="Responsable">
        <div className="space-y-2">
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
              10/10/2025 - 09:43
            </p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 items-start">
            <p className="text-text-12 font-semibold text-brand-textStrong">
              Fecha límite según SLA
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
              11/10/2025 - 10:15
            </p>
          </div>
        </div>
      </Section>

      <Section title="Comentarios">
        <div className="space-y-2 text-text-12 rounded-xl border border-brand-soft bg-[#EDEDED] p-2">
          <div className="pb-2">
            <div className="flex items-center justify-between text-text-12 font-semibold text-brand-textStrong gap-2">
              <span>Marta Gómez (Recepción)</span>
              <span className="text-[14px] leading-5 font-normal text-brand-text text-right">
                10/10/2025 - 09:45
              </span>
            </div>
            <p className="text-brand-text mt-1 font-normal bg-[#F5F6F8] rounded-md px-3 py-2">
              "Reporto incidencia tras ver que la cinta no responde."
            </p>
          </div>
          <div className="pb-2">
            <div className="flex items-center justify-between text-text-12 font-semibold text-brand-textStrong gap-2">
              <span>Juan Pérez (Técnico)</span>
              <span className="text-[14px] leading-5 font-normal text-brand-text text-right">
                10/10/2025 - 11:00
              </span>
            </div>
            <p className="text-brand-text mt-1 font-normal bg-[#F5F6F8] rounded-md px-3 py-2">
              "Comprobando alimentación y fusible. Solicito repuesto motor
              interno."
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between text-text-12 font-semibold text-brand-textStrong gap-2">
              <span>Marta Gómez</span>
              <span className="text-[14px] leading-5 font-normal text-brand-text text-right">
                10/10/2025 - 11:15
              </span>
            </div>
            <p className="text-brand-text mt-1 font-normal bg-[#F5F6F8] rounded-md px-3 py-2">
              "Gracias Juan, deja aviso si necesitas cortar el suministro."
            </p>
          </div>
          <textarea
            placeholder="Escribe un comentario..."
            className="w-full bg-[#FFFFFF] border border-brand-soft rounded-md px-3 py-3 text-text-12 font-normal text-brand-text placeholder:text-brand-text outline-none focus:border-brand-toggle resize-none"
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
          <div className="grid grid-cols-4 gap-2">
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
            <button className="h-10 rounded-md border border-brand-soft bg-brand-white flex items-center justify-center text-brand-text">
              <Video size={14} />
            </button>
            <button
              type="button"
              onClick={handleOpenFilePicker}
              className="h-10 rounded-md border border-brand-soft bg-brand-white flex items-center justify-center text-brand-text"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="text-text-12 font-semibold text-brand-textStrong">
            Video corto
          </p>
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

      <Section title="Historial de cambios">
        <div className="rounded-xl border border-brand-soft bg-[#FFFFFF] overflow-hidden">
          <div className="grid grid-cols-[1.3fr_1.6fr_1fr_auto] gap-3 px-3 py-3 text-[12px] leading-4 font-semibold text-[#111111]">
            <span>Fecha</span>
            <span>Acción</span>
            <span>Usuario</span>
            <span></span>
          </div>
          <div className="grid grid-cols-[1.3fr_1.6fr_1fr_auto] gap-3 px-3 py-3 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft">
            <span>10/10/2025 09:43</span>
            <span>Creación de incidencia</span>
            <span>Marta Gómez</span>
            <span className="font-semibold text-[#444444]">...</span>
          </div>
          <div className="grid grid-cols-[1.3fr_1.6fr_1fr_auto] gap-3 px-3 py-3 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft">
            <span>10/10/2025 09:43</span>
            <span>Asignada a Juan Pérez</span>
            <span>Sistema</span>
            <span className="font-semibold text-[#444444]">...</span>
          </div>
          <div className="grid grid-cols-[1.3fr_1.6fr_1fr_auto] gap-3 px-3 py-3 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft">
            <span>10/10/2025 09:43</span>
            <span>Estado → En progreso</span>
            <span>Juan Pérez</span>
            <span className="font-semibold text-[#444444]">...</span>
          </div>
          <div className="grid grid-cols-[1.3fr_1.6fr_1fr_auto] gap-3 px-3 py-3 text-[12px] leading-5 font-normal text-[#666666] border-t border-brand-soft">
            <span>10/10/2025 09:43</span>
            <span>Comentario añadido</span>
            <span>Sistema</span>
            <span className="font-semibold text-[#444444]">...</span>
          </div>
        </div>
      </Section>

      <div className="w-full rounded-2xl bg-[#EDEDED] p-2 flex flex-row gap-2 items-center">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 basis-0 min-w-0 !rounded-lg !px-2 md:!px-4 !py-3 !text-[10px] sm:!text-[11px] md:!text-[14px] !leading-4 !font-medium !bg-[#FFFFFF] !border !border-[#C0C0C0] !text-[#666666] hover:!bg-[#F5F5F5] !shadow-none whitespace-nowrap"
          onClick={handleChangeStatus}
        >
          Cambiar estado
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 basis-0 min-w-0 !rounded-lg !px-2 md:!px-4 !py-3 !text-[10px] sm:!text-[11px] md:!text-[14px] !leading-4 !font-medium !bg-[#FFFFFF] !border !border-[#C0C0C0] !text-[#666666] hover:!bg-[#F5F5F5] !shadow-none whitespace-nowrap"
          onClick={handleReassign}
        >
          Reasignar
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1 basis-0 min-w-0 !rounded-lg !px-2 md:!px-4 !py-3 !text-[10px] sm:!text-[11px] md:!text-[14px] !leading-4 !font-medium !bg-gradient-to-r !from-[#FF56B0] !to-[#8C4787] !border-0 !text-[#FFFFFF] hover:!opacity-95 !shadow-none whitespace-nowrap"
          onClick={onAdvance}
        >
          Cerrar incidencia
        </Button>
      </div>
    </div>
  );
};
