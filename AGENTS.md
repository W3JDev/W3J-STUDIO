# AGENTS.md

> **Attention AI Agents:** This file governs all automated interactions, code generation, and refactoring within the `W3J STUDIO` repository.

## 1. Header & Scope

*   **Project Name:** W3J STUDIO Portfolio (Brutalist Edition)
*   **Description:** An experimental, brutalist portfolio site featuring high-performance WebGL, kinetic typography, and noise textures.
*   **Primary Maintainer:** w3jdev (w3jdev.com)
*   **Repo URL:** github.com/w3jdev
*   **Audience:** AI Coding Agents (Cursor, Copilot, Windsurf) + Human Contributors.

## 2. Project Overview & Structure

This is a single-page React application (SPA) focused on visual impact and interaction design.

*   **Core Stack:** React 19, TypeScript, Vite (implied), Tailwind CSS, Framer Motion, Three.js / React Three Fiber.
*   **Architecture:** Component-based, functional, hooks-heavy.
*   **Key Directories:**
    *   `/components` - UI building blocks (atomic to organism level).
    *   `/docs` - Enterprise-grade documentation (PRD, Architecture, Standards).
    *   `App.tsx` - Main entry and routing logic (simplified state-based routing).
    *   `types.ts` - Shared TypeScript interfaces.

## 3. Commands

*   **Install:** `npm install`
*   **Dev Server:** `npm run start` (or `vite`)
*   **Build:** `npm run build`
*   **Test:** `npm run test` (if applicable)

## 4. Code Style & Patterns

*   **Language:** TypeScript (Strict mode).
*   **Styling:** Tailwind CSS for layout/typography. Custom CSS modules or inline styles only for complex animations not possible with Tailwind.
*   **Animation:** Use `framer-motion` for DOM animations. Use `@react-three/fiber` for 3D.
*   **Conventions:**
    *   Functional Components (`React.FC`).
    *   Named exports preferred over default exports for components.
    *   "Brutalist" aesthetic: Avoid rounded corners (unless specified), use high contrast, mix-blend-modes, and monospaced fonts.
*   **Error Handling:** Fail gracefully visually, but log errors to console in dev.

## 5. Git & Workflow Rules

*   **Commits:** Conventional Commits (e.g., `feat: add sticky header`, `fix: z-index issue on gallery`).
*   **Branching:** `main` is production. Feature branches `feat/feature-name`.
*   **Review:** All AI-generated code must be reviewed by a human (w3jdev) for aesthetic correctness, as "brutalism" is subjective.

## 6. Boundaries, Dos & Don'ts

*   **DO:**
    *   Optimize for performance (60fps targets).
    *   Use `React.memo` or `useMemo` for heavy 3D calculations.
    *   Maintain the `w3jdev` branding in footer and headers.
*   **DON'T:**
    *   Remove the "NoiseOverlay" or global cursor effects without permission.
    *    Introduce UI libraries (MUI, AntD, Bootstrap) – style from scratch or use Tailwind.
    *   Touch `metadata.json` unless adding hardware permissions.

## 7. Security & Compliance

*   No PII collection (Contact form is currently client-side mock or static).
*   External assets (images/fonts) should be optimized or served via reliable CDNs.

---
*Crafted by w3jdev · w3jdev.com*
