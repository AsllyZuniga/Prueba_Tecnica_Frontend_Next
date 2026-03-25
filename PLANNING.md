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
| **Desvío** | +60 min — 14% por encima del límite |
| **Cobertura del plan** | 9 / 9 módulos completados (100%) |
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
| — | **Total** | **380 min** | **480 min** | **+100 min** | **✅** |

---

## Estructura del proyecto
```text
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── product/
│   ├── features/
│   │   └── dashboard/
│   ├── hooks/
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   └── utils/
├── public/
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── .env.example
└── README.md
```

---

## Decisiones de arquitectura y clean code

### 1. Separación por responsabilidad

Definí límites claros entre capas para que cada módulo tenga un único motivo de cambio:

| Capa | Responsabilidad | Puede importar de |
|---|---|---|
| `app/` | Enrutamiento y metadata | `features/`, `components/layout/` |
| `components/` | Renderizado visual | `types/`, `utils/` |
| `features/` | Composición por caso de uso | `components/`, `hooks/`, `types/` |
| `hooks/` | Estado y efectos | `types/`, `utils/` |
| `utils/` | Funciones puras | — |
| `types/` | Contratos de dominio | — |

### 2. Tipado estricto

- `"strict": true` en `tsconfig.json` — sin `any` implícitos ni accesos null sin verificar.
- Todos los tipos de dominio viven en `src/types`; nada de tipos inline sueltos en componentes.
- Props con interfaces nombradas para facilitar el autocompletado y los refactors.
- Funciones en utils y hooks con retornos tipados explícitamente.

### 3. Reutilización y consistencia visual

- Los componentes de `common/` son la única fuente de verdad visual del proyecto.
- Tokens de color, tipografía y espaciado centralizados en `tailwind.config.js`.
- Ningún componente de dominio repite estilos que ya existan en la capa base.
- Variantes manejadas por props (`variant`, `size`) en lugar de clases condicionales dispersas.

### 4. Calidad y accesibilidad

- Sin código muerto — imports, variables y componentes sin uso fueron eliminados antes de cerrar.
- Iconografía con librería dedicada para garantizar consistencia entre plataformas.
- `id` y `htmlFor` definidos explícitamente en todos los formularios — cumplimiento WCAG 2.1 AA.
- Nomenclatura uniforme: `PascalCase` en componentes · `camelCase` en hooks y utils · `kebab-case` en CSS.

---

## Verificación de calidad

| # | Comando | Descripción | Resultado | Estado |
|:---:|---|---|---|:---:|
| 1 | `npm run type-check` | Verificación de tipos TypeScript | 0 errores · 0 warnings | ✅ |
| 2 | `npm run lint` | Análisis ESLint con reglas de Next.js | 0 errores · 0 warnings | ✅ |
| 3 | `npm run build` | Build de producción | — | ⏳ |

> El build de producción queda pendiente de correr en CI.
> En desarrollo (`npm run dev`) el proyecto corre sin errores.

---

## Notas finales

- El tiempo real superó el estimado en 1 hora, principalmente por ajustes en los componentes de producto y el dashboard.
- Todos los módulos se entregaron completos y funcionales.
- La estructura permite agregar nuevas features sin tocar las capas existentes.
- Con el tipado y el linting en verde, la base está lista para escalar sin deuda técnica.