# TestNext · Operaciones

Aplicación de prueba técnica construida con Next.js 14 + TypeScript para gestionar flujos de incidencias y membresías en una interfaz operativa.

---

## ✨ Funcionalidades actuales

- Flujos operativos guiados por pasos desde el dashboard.
- Navegación lateral con opción de ocultar/mostrar sidebar.
- Header limpio sin barra de búsqueda y branding TestNext.
- Botones con estados `loading/disabled` y motivo sutil (`disabledReason`).
- Sidebars de operación con edición de estado, reasignación y carga de imágenes en sección de medios.

---

## 🛠️ Stack

- Next.js 14
- React 18
- TypeScript (strict)
- Tailwind CSS
- lucide-react

---

## 🚀 Ejecución

```bash
npm install
npm run dev
```

Servidor local: http://localhost:3000

---

## 📁 Estructura real

```text
.
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── operations/
│   │   └── product/
│   ├── features/
│   │   └── dashboard/
│   ├── hooks/
│   ├── styles/
│   ├── types/
│   └── utils/
├── public/
├── package.json
└── PLANNING.md
```

---

## 🧩 Componentes principales

### Base (`src/components/common`)

- `Button`, `Input`, `Select`, `Textarea`, `Checkbox`, `Card`, `Badge`.

### Layout (`src/components/layout`)

- `Sidebar`: navegación y flujos por query params.
- `Header`: acciones rápidas y toggle de visibilidad del sidebar.

### Operaciones (`src/components/operations`)

- `SidebarContainer`
- `ProductEditSidebar`
- `WorkOrderEditSidebar`
- `MembershipPlanSidebar`
- `MemberProfileSidebar`

---

## ⚙️ Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
npm run type-check
```

---

## 📖 Documentación

Para el detalle de planificación, decisiones de arquitectura y control de ejecución, ver [PLANNING.md](PLANNING.md).