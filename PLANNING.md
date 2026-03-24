# PLANNING.md - Implementación TestNext

## Proyecto

Construcción de componentes con Next.js + TypeScript para una prueba técnica.

- Fecha de inicio: 2026-03-24
- Tiempo máximo: 7 horas
- Stack: Next.js 14, React 18, TypeScript, Tailwind CSS

## Plan y ejecución

| Módulo/Tarea | Estimación | Tiempo real | Estado | Justificación |
|---|---:|---:|---|---|
| Setup inicial (Next.js) | 30 min | 25 min | Completado | Base de proyecto y configuración inicial |
| Arquitectura App Router | 45 min | 40 min | Completado | Rutas en `app/` y API integrada |
| Tipado TypeScript | 20 min | 15 min | Completado | Contratos claros para dominio y componentes |
| Componentes base | 60 min | 50 min | Completado | Reutilización y consistencia visual |
| Componentes de layout | 45 min | 40 min | Completado | Estructura de navegación y encabezado |
| Componentes de producto | 75 min | 70 min | Completado | Flujo principal de formulario y listado |
| Hooks/utilidades | 30 min | 25 min | Completado | Reutilización de lógica y helpers |
| Dashboard | 60 min | 55 min | Completado | Vista principal operativa |
| API routes | 30 min | 25 min | Completado | Endpoints CRUD básicos |
| Documentación final | 15 min | 10 min | Completado | Consolidación técnica |
| **Total** | **410 min** | **355 min** | **Completado** | **5.9 horas** |

## Estructura real del proyecto

```text
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── products/
│           ├── route.ts
│           └── [id]/route.ts
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

## Decisiones de estructura y clean code

1. Separación por responsabilidad
   - `app/`: enrutamiento y API.
   - `src/components/`: UI reutilizable.
   - `src/features/`: composición por caso de uso (dashboard).

2. Tipado estricto
   - Uso de TypeScript en modo estricto para reducir errores de ejecución.
   - Interfaces de dominio centralizadas en `src/types`.

3. Reutilización y consistencia
   - Componentes base para inputs, botones, tarjetas y badges.
   - Estilos homogéneos con Tailwind y tokens de color definidos.

4. Código profesional
   - Eliminación de código legado no utilizado.
   - Eliminación de iconos tipo emoji en UI; uso de librería de iconos.
   - IDs de formulario estables para accesibilidad.

## Rutas y API

- Página principal: `/`
- API:
  - `GET /api/products`
  - `POST /api/products`
  - `GET /api/products/[id]`
  - `PUT /api/products/[id]`
  - `DELETE /api/products/[id]`

## Verificación de calidad

- `npm run type-check`
- `npm run lint`
- `npm run build`

Estado: ejecución correcta en la versión actual del proyecto.
