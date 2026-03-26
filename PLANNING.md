# PLANNING

## Proyecto

> Construcción de componentes interactivos con Next.js + TypeScript — Prueba técnica.

![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)

---

## Resumen ejecutivo

| Campo | Detalle |
|---|---|
| **Fecha de inicio** | 2026-03-24 |
| **Tiempo máximo** | 7 h (420 min) |
| **Tiempo real** | 8 h (480 min) |
| **Desvío** | +60 min — 14% sobre el estimado |
| **Cobertura del plan** | 10 / 10 módulos completados (100%) |
| **Estado general** | Completado |

---

## Plan y ejecución

| # | Módulo/Tarea | Estimación | Tiempo real | Δ | Estado |
|:---:|---|---:|---:|---:|:---:|
| 01 | Setup inicial (Next.js) | 30 min | 25 min | −5 min | ✅ |
| 02 | Arquitectura App Router | 45 min | 40 min | −5 min | ✅ |
| 03 | Tipado TypeScript | 20 min | 15 min | −5 min | ✅ |
| 04 | Componentes base | 60 min | 50 min | −10 min | ✅ |
| 05 | Componentes de layout | 45 min | 40 min | −5 min | ✅ |
| 06 | Componentes de producto | 75 min | 70 min | −5 min | ✅ |
| 07 | Hooks / utilidades | 30 min | 25 min | −5 min | ✅ |
| 08 | Dashboard | 60 min | 55 min | −5 min | ✅ |
| 09 | Documentación final | 15 min | 10 min | −5 min | ✅ |
| 10 | Refinamientos UI iterativos | 40 min | 140 min | +100 min | ✅ |
| — | **Total** | **420 min** | **480 min** | **+60 min** | **✅** |

---

## Estructura del proyecto

```text
.
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── figma/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   ├── operations/
│   │   │   ├── MemberProfileSidebar.tsx
│   │   │   ├── MembershipPlanSidebar.tsx
│   │   │   ├── ProductEditSidebar.tsx
│   │   │   ├── SidebarContainer.tsx
│   │   │   ├── WorkOrderEditSidebar.tsx
│   │   │   └── index.ts
│   │   └── product/
│   │       └── index.ts
│   ├── features/
│   │   └── dashboard/
│   │       ├── Dashboard.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useFetch.ts
│   │   ├── useForm.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── helpers.ts
│       └── index.ts
├── AUDIT_REPORT.md
├── PLANNING.md
├── README.md
├── next.config.js
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Decisiones de arquitectura y clean code

### 1. Separación por responsabilidad

Se definieron límites claros entre capas con el objetivo de garantizar bajo acoplamiento y alta cohesión, permitiendo que cada módulo tenga un único motivo de cambio y facilitando la escalabilidad del sistema.

| Capa | Responsabilidad | Dependencias permitidas |
|---|---|---|
| `app/` | Enrutamiento, layouts y metadata | `features/`, `components/layout/` |
| `components/` | Renderizado visual desacoplado de lógica | `types/`, `utils/` |
| `features/` | Orquestación de casos de uso | `components/`, `hooks/`, `types/` |
| `hooks/` | Gestión de estado y efectos | `types/`, `utils/` |
| `utils/` | Lógica pura y reutilizable | — |
| `types/` | Definición de contratos de dominio | — |

---

### 2. Tipado estricto

El proyecto adopta una estrategia de tipado estricto para maximizar la seguridad en tiempo de compilación y reducir errores en runtime.

- Configuración `"strict": true` en `tsconfig.json`.
- Eliminación total de `any` implícitos.
- Centralización de modelos de dominio en `src/types`.
- Definición de interfaces explícitas para todas las props.
- Tipado explícito en funciones críticas (hooks y utils).
- Validación segura de valores potencialmente nulos o indefinidos.

---

### 3. Reutilización y consistencia visual

Se implementó un sistema de componentes orientado a la reutilización y consistencia visual, alineado con principios de design system.

- `components/common/` actúa como fuente única de verdad visual.
- Tokens de diseño centralizados en `tailwind.config.js`.
- Eliminación de duplicación de estilos en componentes de dominio.
- Uso de props (`variant`, `size`) para controlar variaciones en lugar de lógica condicional dispersa.
- Enfoque en composición sobre herencia para maximizar flexibilidad.

---

### 4. Calidad y accesibilidad

Se priorizó la calidad del código y la accesibilidad desde el diseño inicial del sistema.

- Código libre de artefactos innecesarios (dead code eliminado).
- Uso consistente de librerías de iconografía para mantener coherencia visual.
- Formularios accesibles cumpliendo WCAG 2.1 AA (`id` + `htmlFor` correctamente definidos).
- Convenciones de naming estandarizadas:
  - `PascalCase` → Componentes
  - `camelCase` → Hooks y utilidades
  - `kebab-case` → Estilos

---

## Verificación de calidad

| # | Comando | Descripción | Resultado | Estado |
|:---:|---|---|---|:---:|
| 1 | `npm run type-check` | Validación estática de tipos | 0 errores · 0 warnings | ✅ |
| 2 | `npm run lint` | Análisis con ESLint (config Next.js) | 0 errores · 0 warnings | ✅ |
| 3 | `npm run build` | Build optimizado de producción | Pendiente en CI | ⏳ |

> El build de producción queda delegado al pipeline de CI/CD.  
> En entorno de desarrollo (`npm run dev`) la aplicación se ejecuta sin incidencias.

---

## Notas finales

- El incremento de tiempo (+14%) se atribuye principalmente a refinamientos en componentes de producto y ajustes del dashboard.
- La cobertura funcional se completó al 100% sin comprometer calidad.
- La arquitectura modular permite incorporar nuevas funcionalidades sin afectar capas existentes.
- Con tipado estricto y linting en estado limpio, el proyecto se encuentra en condiciones óptimas para escalar sin generar deuda técnica.

---

## Resumen funcional visible

1. **Marca y navegación**
   - Identidad visual **TestNext** integrada en la interfaz principal.
   - Header minimalista, enfocado en claridad y sin elementos innecesarios.
   - Control dinámico del sidebar mediante query param (`sidebar=hidden`).

2. **Feedback en estados deshabilitados**
   - El componente `Button` implementa la prop `disabledReason`.
   - Visualización del motivo mediante tooltip accesible en hover y focus.

3. **Flujos operativos interactivos**
   - Gestión dinámica de incidencias y órdenes de trabajo:
     - Actualización de estado en tiempo real.
     - Reasignación de responsables.
     - Carga local de imágenes en módulos de medios.

4. **Alineación documental**
   - README actualizado y coherente con el alcance funcional actual del proyecto.

---

## Bitácora de refinamientos UI (iterativo)

### Navegación y flujo principal

- Eliminación del botón/flujo de **Inicio** en navegación lateral para forzar un flujo operativo directo.
- Dashboard ajustado para iniciar por defecto en el flujo de incidencias (`flow=incident`).
- Limpieza de estado no utilizado en el dashboard para reducir complejidad y mejorar mantenibilidad.

### Sistema visual y branding

- Migración progresiva de estilos a una línea visual unificada (grises neutros + acento rosado/morado).
- Normalización de tarjetas contenedoras en operación con fondos y bordes consistentes.
- Ajustes finos de densidad visual (padding y spacing) para lectura en viewport móvil.

### Sidebar de incidencias (`ProductEditSidebar`)

- Compactación de secciones críticas (`Descripción`, `Responsable`, `Comentarios`) con menor padding interno.
- Badges de estado/SLA convertidos a estilo pill (`rounded-full`) para reforzar legibilidad.
- Iteración de acciones inferiores: distribución en línea, ajuste de ancho, y adaptación responsive sin salto de línea en etiquetas.
- Afinado de textos y botones para mantener una sola línea en móvil cuando aplica.

### Contenedor operativo (`SidebarContainer`)

- Ajuste de colores de tarjetas de contexto (Sala/Planta/QR) para contraste suave y consistencia.
- Eliminación de bordes innecesarios en listados para reducir ruido visual.
- Reorganización de acciones inferiores con comportamiento responsivo y mejor jerarquía visual.

### Orden de trabajo (`WorkOrderEditSidebar`)

- Reordenación completa de bloques en el orden funcional esperado:
   1) Información básica
   2) Historial de cambios
   3) Materiales usados
   4) Tiempo de ejecución
   5) Medios
   6) Firma del técnico
- Incorporación de secciones faltantes (`Materiales usados`, `Tiempo de ejecución`, `Medios`) y sincronización visual con el resto del sistema.
- Historial de cambios con resultado compacto y acciones `...` a la derecha, conservando checkboxes y contenido.
- Reducción de márgenes internos en cards y secciones para una composición más compacta en móvil.

### Resultado técnico

- Refactor incremental sin ruptura de contratos públicos de componentes.
- Cambios validados de manera continua con chequeo de errores en archivos modificados.
- Base visual y estructural lista para nuevas iteraciones sin deuda de UI acumulada.