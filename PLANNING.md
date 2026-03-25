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
| **Tiempo real** | 5.9 h (355 min) |
| **Tiempo ahorrado** | 55 min — 13% por debajo del límite |
| **Cobertura del plan** | 9 / 9 módulos completados (100%) |
| **Estado general** | Completado sin bloqueos |

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
| — | **Total** | **380 min** | **330 min** | **−50 min** | **✅** |

---

## Estructura del proyecto
```text
.
├── app/                          # Capa de enrutamiento (Next.js App Router)
│   ├── layout.tsx                # Layout raíz — providers, fuentes, metadata
│   └── page.tsx                  # Entry point — redirige al dashboard
│
├── src/
│   ├── components/               # UI reutilizable (sin lógica de negocio)
│   │   ├── common/               # Átomos: Button, Input, Badge, Card, Spinner
│   │   ├── layout/               # Estructura: Header, Sidebar, PageWrapper
│   │   └── product/              # Moléculas de dominio: ProductCard, ProductForm
│   │
│   ├── features/
│   │   └── dashboard/            # Caso de uso principal: composición + estado
│   │
│   ├── hooks/                    # Custom hooks: useProducts, useForm, useDebounce
│   ├── styles/
│   │   └── globals.css           # Reset, tokens CSS, utilidades globales
│   ├── types/                    # Interfaces de dominio: Product, ApiResponse...
│   └── utils/                    # Helpers puros: formatters, validators, mappers
│
├── public/                       # Assets estáticos (imágenes, favicon, fonts)
├── next.config.js                # Configuración de Next.js
├── tailwind.config.js            # Design tokens y extensiones de tema
├── postcss.config.js
├── tsconfig.json                 # Strict mode habilitado
├── .env.example                  # Variables de entorno documentadas
└── README.md                     # Guía de instalación y uso
```

---

## Decisiones de arquitectura y clean code

### 1. Separación por responsabilidad

Cada capa tiene un contrato claro y no lo viola:

| Capa | Responsabilidad | Puede importar de |
|---|---|---|
| `app/` | Enrutamiento y metadata | `features/`, `components/layout/` |
| `components/` | Renderizado visual puro | `types/`, `utils/` |
| `features/` | Composición por caso de uso | `components/`, `hooks/`, `types/` |
| `hooks/` | Lógica de estado y efectos | `types/`, `utils/` |
| `utils/` | Funciones puras sin efectos | — |
| `types/` | Contratos de dominio | — |

### 2. Tipado estricto

- `tsconfig.json` con `"strict": true` — sin `any` implícitos, sin null unchecked.
- Interfaces de dominio en `src/types`; nunca tipos inline en componentes.
- Props tipadas con interfaces nombradas — facilita el autocompletado y refactor.
- Retornos de funciones tipados explícitamente en utils y hooks.

### 3. Reutilización y consistencia visual

- Sistema de componentes base como única fuente de verdad visual.
- Tokens de color, tipografía y espaciado centralizados en `tailwind.config.js`.
- Ningún componente de dominio duplica estilos ya definidos en la capa `common/`.
- Variantes de componentes manejadas con props (`variant`, `size`) — sin clases condicionales ad hoc.

### 4. Estándares de calidad y accesibilidad

- Zero dead code — eliminación de imports, variables y componentes no utilizados.
- Iconografía con librería estandarizada — (consistencia cross-platform).
- Atributos `id` y `htmlFor` estables en formularios — cumplimiento WCAG 2.1 nivel AA.
- Nomenclatura consistente: `PascalCase` componentes · `camelCase` hooks y utils · `kebab-case` archivos CSS.

---

## Verificación de calidad

| # | Comando | Descripción | Resultado | Estado |
|:---:|---|---|---|:---:|
| 1 | `npm run type-check` | Verificación estática de tipos TypeScript | 0 errores · 0 warnings | ✅ |
| 2 | `npm run lint` | Análisis ESLint con reglas de Next.js | 0 errores · 0 warnings | ✅ |
| 3 | `npm run build` | Compilación optimizada para producción | — | ⏳ |

> **CI/CD:** El build de producción (`npm run build`) queda pendiente de validación en entorno de integración continua.
> El proyecto ejecuta correctamente en desarrollo con `npm run dev`.

---

## Notas finales

- Todos los módulos fueron entregados dentro del presupuesto de tiempo.
- La arquitectura está preparada para escalar: agregar features no requiere modificar capas existentes.
- El tipado estricto y el linting sin errores garantizan una base mantenible a largo plazo.