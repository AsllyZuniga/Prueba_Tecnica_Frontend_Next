# TestNext - Sistema de Componentes Next.js

Implementación técnica de componentes Next.js 14 + TypeScript para gestión de inventario de productos.

## 🎯 Características Principales

- **UI Pixel-Perfect:** Componentes diseñados con atención al detalle visual
- **TypeScript Strict:** Tipado completo para máxima seguridad
- **Next.js 14 App Router:** Últimas características de Next.js
- **Server Components:** Optimizados con Server Components donde sea posible
- **API Routes:** Endpoints REST integrados
- **Responsive Design:** Mobile-first, funciona en todos los dispositivos
- **Tema Oscuro:** Interfaz moderna y profesional
- **Validación Completa:** Formularios con validación integrada

## 📦 Stack Tecnológico

- **Next.js 14:** Framework React moderno
- **React 18:** Última versión estable
- **TypeScript:** Tipado estático
- **Tailwind CSS:** Estilización utility-first
- **lucide-react:** Iconos modernos
- **App Router:** Última arquitectura de Next.js

## 🚀 Inicio Rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura

```
.
├── app/                    # App Router (rutas y APIs)
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx           # Página principal
│   ├── api/products/      # API endpoints
│   └── globals.css
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── features/          # Módulos funcionales (dashboard)
│   ├── hooks/             # Custom hooks
│   ├── types/             # Tipos TypeScript
│   └── utils/             # Utilidades
├── public/                # Archivos estáticos
└── package.json
```

## 🎨 Componentes Disponibles

### UI Base (7)
- `Button` - Botones con múltiples variantes
- `Input` - Campos de texto
- `Select` - Dropdowns
- `Textarea` - Áreas de texto
- `Checkbox` - Checkboxes
- `Card` - Contenedores
- `Badge` - Etiquetas

### Producto (4)
- `ProductCard` - Tarjeta de producto
- `ProductTable` - Tabla de productos con sort
- `ProductForm` - Formulario CRUD
- `CategorySelector` - Selector de categorías

### Layout (3)
- `AppLayout` - Layout principal
- `Sidebar` - Navegación lateral responsiva
- `Header` - Barra superior con search

## 📡 API Endpoints

```
GET    /api/products         # Obtener todos
POST   /api/products         # Crear nuevo
GET    /api/products/[id]    # Obtener por ID
PUT    /api/products/[id]    # Actualizar
DELETE /api/products/[id]    # Eliminar
```

## 🔧 Scripts Disponibles

```bash
npm run dev         # Desarrollo (http://localhost:3000)
npm run build       # Build producción
npm start           # Iniciar servidor producción
npm run lint        # Linting con ESLint
npm run type-check  # Validación TypeScript
```

## 📖 Documentación

Ver [PLANNING.md](./PLANNING.md) para:
- Tabla detallada de estimaciones y tiempo real
- Decisiones arquitectónicas justificadas
- Detalles de implementación
- Guía de escalamiento futuro

## 💻 Variables de Entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Disponibles:
- `NEXT_PUBLIC_API_URL` - URL de la API (por defecto: http://localhost:3000/api)

## 📄 Licencia

Este proyecto es de propósito educativo/prueba técnica.
