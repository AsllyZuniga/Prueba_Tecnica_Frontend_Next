# TestNext · Sistema de Inventario

> Implementación técnica de componentes Next.js 14 + TypeScript para gestión de inventario de productos.

---

## ✨ Características

| Característica | Descripción |
|---|---|
| 🎨 UI Pixel-Perfect | Componentes con atención al detalle visual |
| 🔒 TypeScript Strict | Tipado completo para máxima seguridad |
| ⚡ App Router | Arquitectura moderna de Next.js 14 |
| 🖥️ Server Components | Optimizados para rendimiento |
| 🔌 API Routes | Endpoints REST integrados |
| 📱 Responsive | Mobile-first, todos los dispositivos |
| 🌑 Tema Oscuro | Interfaz moderna y profesional |
| ✅ Validación | Formularios con validación integrada |

---

## 🛠️ Stack Tecnológico

```
Next.js 14      →  Framework React con App Router
React 18        →  Última versión estable
TypeScript      →  Tipado estático estricto
Tailwind CSS    →  Estilización utility-first
lucide-react    →  Iconografía moderna
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
├── app/                        # App Router
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Página principal
│   ├── globals.css             # Estilos globales
│   └── api/
│       └── products/           # Endpoints REST
│           ├── route.ts        # GET, POST
│           └── [id]/
│               └── route.ts   # GET, PUT, DELETE
│
├── src/
│   ├── components/             # Componentes reutilizables
│   │   └── ui/                 # Primitivos UI
│   ├── features/               # Módulos funcionales
│   │   └── dashboard/          # Vista de inventario
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # Definiciones TypeScript
│   └── utils/                  # Funciones de utilidad
│
├── public/                     # Archivos estáticos
├── .env.example                # Plantilla de variables de entorno
└── package.json
```

---

## 🧩 Componentes

### Primitivos UI (7)

| Componente | Descripción |
|---|---|
| `Button` | Botones con múltiples variantes y estados |
| `Input` | Campos de texto con validación |
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

## 🔐 Variables de Entorno

Copia `.env.example` a `.env.local` y configura los valores:

```bash
cp .env.example .env.local
```

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api` | URL base de la API |

---

## 📖 Documentación Adicional

Consulta [`PLANNING.md`](./PLANNING.md) para:

- Tabla de estimaciones y tiempos reales de implementación
- Decisiones arquitectónicas y su justificación
- Detalles de implementación por componente
- Guía de escalamiento y próximos pasos

---

## 📄 Licencia

Proyecto de propósito educativo / prueba técnica. No destinado a uso en producción.