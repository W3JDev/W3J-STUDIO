# Architecture Overview

**Project:** W3J STUDIO
**Architect:** w3jdev

## 1. System Context
The application is a client-side Single Page Application (SPA) deployed to a static host. It interacts with no backend services (currently) other than standard browser APIs.

## 2. Tech Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 19 | Standard, ecosystem support, concurrent features. |
| **Language** | TypeScript | Type safety, enterprise standard. |
| **Styling** | Tailwind CSS | Utility-first, rapid iteration, small bundle. |
| **2D Animation** | Framer Motion | Best-in-class declarative animation library. |
| **3D Graphics** | React Three Fiber (Three.js) | Declarative 3D, integration with React lifecycle. |
| **Bundler** | Vite (implied) | HMR speed, optimized builds. |

## 3. Directory Structure

```text
/
├── components/         # Reusable UI components
│   ├── LiquidHero.tsx  # R3F Scene
│   ├── SelectedWorks.tsx # Complex list interactions
│   └── ...
├── docs/               # Architecture & Process Docs
├── types.ts            # Global interfaces (Project, MousePosition)
├── App.tsx             # Root Layout & Routing Logic
├── index.tsx           # Entry Point
├── AGENTS.md           # AI Guidance
└── README.md           # Quickstart
```

## 4. Key Design Patterns

### 4.1. Context-Driven Cursor
We use a global `CursorContext` to manage the state of the custom cursor (Default, Hover, Text). Components consume `useCursor()` to request cursor state changes on `onMouseEnter` / `onMouseLeave`.

### 4.2. Declarative 3D
Three.js scenes are strictly declarative using `@react-three/fiber`. No imperative DOM manipulation of the canvas unless absolutely necessary for performance.

### 4.3. Prop Drilling vs Composition
For the "Home" vs "Project" view, we currently use conditional rendering in `App.tsx`. Project selection is handled via a callback `handleProjectSelect` passed down to `SelectedWorks`.

### 4.4. "Brutalist" CSS Strategy
We utilize standard CSS filters (`blur`, `contrast`) and mix-blend-modes (`difference`, `exclusion`) extensively to achieve the visual style. Tailwind is used for layout, but complex effects often require custom inline styles or framer-motion values.

## 5. Data Flow
*   **Projects Data:** Hardcoded in `SelectedWorks.tsx` (acting as a CMS stub). Passed to `ProjectDetail` upon selection.
*   **Navigation:** State-based (`view` state in `App.tsx`).

---
*Architected by w3jdev*
