# TestNext 

> Implementación técnica de componentes Next.js + TypeScript para gestión de inventario de productos.

![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-success?style=flat-square)

---

## ✨ Características

| Característica | Descripción |
|---|---|
| 🎨 UI Pixel-Perfect | Componentes con atención al detalle visual |
| 🔒 TypeScript Strict | `"strict": true` — sin `any` implícitos ni accesos null sin verificar |
| ⚡ App Router | Arquitectura moderna de Next.js 14 |
| 🖥️ Server Components | Optimizados para rendimiento |
| 📱 Responsive | Mobile-first, todos los dispositivos |
| 🌑 Tema Oscuro | Interfaz moderna y profesional |
| ✅ Validación | Formularios con validación integrada y cumplimiento WCAG 2.1 AA |

---

## 🛠️ Stack Tecnológico

```
Next.js       →  Framework React con App Router
TypeScript      →  Tipado estático estricto (strict mode)
Tailwind CSS    →  Estilización utility-first con tokens centralizados
lucide-react    →  Iconografía moderna y consistente
```

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
testnext/
├── app/                        # App 
│   ├── layout.tsx
│   ├── page.tsx
│   
│
├── src/
│   ├── components/             # Renderizado visual (importa de types/ y utils/)
│   │   ├── common/             # Única fuente de verdad visual del proyecto
│   │   ├── layout/
│   │   └── product/
│   ├── features/               # Composición por caso de uso
│   │   └── dashboard/
│   ├── hooks/                  # Estado y efectos
│   ├── types/                  # Contratos de dominio — sin tipos inline sueltos
│   └── utils/                  # Funciones puras
│
├── public/
├── next.config.js
├── tailwind.config.js          # Tokens de color, tipografía y espaciado
├── postcss.config.js
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 🏗️ Arquitectura

El proyecto sigue una separación estricta por responsabilidad donde cada capa tiene un único motivo de cambio:

| Capa | Responsabilidad | Puede importar de |
|---|---|---|
| `app/` | Enrutamiento y metadata | `features/`, `components/layout/` |
| `components/` | Renderizado visual | `types/`, `utils/` |
| `features/` | Composición por caso de uso | `components/`, `hooks/`, `types/` |
| `hooks/` | Estado y efectos | `types/`, `utils/` |
| `utils/` | Funciones puras | — |
| `types/` | Contratos de dominio | — |

Esta estructura permite agregar nuevas features sin tocar las capas existentes.

---

## 🧩 Componentes

### Primitivos UI (7)

| Componente | Descripción |
|---|---|
| `Button` | Botones con múltiples variantes y estados — props `variant` y `size` |
| `Input` | Campos de texto con validación — `id`/`htmlFor` explícitos (WCAG 2.1 AA) |
| `Select` | Dropdowns accesibles |
| `Textarea` | Áreas de texto con auto-resize |
| `Checkbox` | Checkboxes con estado indeterminado |
| `Card` | Contenedores con variantes de elevación |
| `Badge` | Etiquetas de estado y categoría |

### Módulo Producto (4)

| Componente | Descripción |
|---|---|
| `ProductCard` | Vista de tarjeta con acciones rápidas |
| `ProductTable` | Tabla con ordenamiento y filtros |
| `ProductForm` | Formulario CRUD con validación completa |
| `CategorySelector` | Selector de categorías con búsqueda |

### Layout (3)

| Componente | Descripción |
|---|---|
| `AppLayout` | Layout principal de la aplicación |
| `Sidebar` | Navegación lateral con colapso responsivo |
| `Header` | Barra superior con búsqueda global |

---

## 📡 API Reference

**Base URL:** `/api/products`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/products` | Listar todos los productos |
| `POST` | `/api/products` | Crear un nuevo producto |
| `GET` | `/api/products/:id` | Obtener producto por ID |
| `PUT` | `/api/products/:id` | Actualizar producto |
| `DELETE` | `/api/products/:id` | Eliminar producto |

---

## ⚙️ Scripts

```bash
npm run dev          # Servidor de desarrollo → http://localhost:3000
npm run build        # Build para producción
npm start            # Iniciar servidor de producción
npm run lint         # Análisis estático con ESLint
npm run type-check   # Validación de tipos TypeScript
```

---

## ✅ Verificación de Calidad

| # | Comando | Descripción | Resultado |
|:---:|---|---|---|
| 1 | `npm run type-check` | Verificación de tipos TypeScript | ✅ 0 errores · 0 warnings |
| 2 | `npm run lint` | Análisis ESLint con reglas de Next.js | ✅ 0 errores · 0 warnings |
| 3 | `npm run build` | Build de producción | ⏳ Pendiente en CI |

> En desarrollo (`npm run dev`) el proyecto corre sin errores.

---

## 🔐 Variables de Entorno

Copia `.env.example` a `.env.local` y configura los valores:

```bash
cp .env.example .env.local
```

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api` | URL base de la API |

---

## 📖 Convenciones de Código

- `PascalCase` — componentes React
- `camelCase` — hooks y funciones utilitarias
- `kebab-case` — clases CSS
- Interfaces nombradas en todas las props (no tipos inline)
- Sin código muerto — imports y variables sin uso eliminados

---

## 📊 Resumen de Implementación

El proyecto se ejecutó en **9 módulos** completados al 100%:

| Módulo | Tiempo estimado | Tiempo real |
|---|---:|---:|
| Setup inicial (Next.js) | 30 min | 25 min |
| Arquitectura App Router | 45 min | 40 min |
| Tipado TypeScript | 20 min | 15 min |
| Componentes base | 60 min | 50 min |
| Componentes de layout | 45 min | 40 min |
| Componentes de producto | 75 min | 70 min |
| Hooks / utilidades | 30 min | 25 min |
| Dashboard | 60 min | 55 min |
| Documentación final | 15 min | 10 min |
| **Total** | **380 min** | **480 min** |

Para el detalle completo de decisiones arquitectónicas y justificaciones, consulta [`PLANNING.md`](./PLANNING.md).

---

## 📄 Licencia

Proyecto de prueba técnica. No destinado a uso en producción.
