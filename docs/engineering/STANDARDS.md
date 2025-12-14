# Engineering Standards

**Maintainer:** w3jdev

## 1. Code Style

### 1.1 TypeScript
*   **Strict Mode:** Enabled. No `any` unless absolutely unavoidable (e.g., legacy libraries).
*   **Interfaces:** Use `interface` for object definitions, `type` for unions/intersections.
*   **Props:** Define `ComponentProps` interface for every component.

### 1.2 Naming Conventions
*   **Components:** PascalCase (e.g., `LiquidHero.tsx`).
*   **Hooks:** camelCase, prefixed with `use` (e.g., `useScrollVelocity`).
*   **Constants:** SCREAMING_SNAKE_CASE for config values.

### 1.3 React Patterns
*   **Functional Components:** Only. No Class components.
*   **Hooks:** Follow rules of hooks strictly.
*   **Fragments:** Use `<>` short syntax.

## 2. CSS / Tailwind
*   **Ordering:** Layout > Box Model > Typography > Visuals > Misc.
*   **Arbitrary Values:** Use sparingly (e.g., `top-[45%]`). Prefer theme tokens.
*   **Z-Index:** Manage carefully. Use a conceptual z-index map:
    *   Noise Overlay: 50
    *   Cursor: 9999
    *   Preloader: 9999
    *   Nav/Header: 60

## 3. Performance
*   **Images:** Lazy load off-screen images.
*   **3D:** Dispose of geometries/materials when unmounting (R3F handles this mostly, but be aware of manual resource creation).
*   **Animations:** Animate `transform` and `opacity` only. Avoid animating `width`, `height`, `top`, `left`.

## 4. Git Strategy
*   **Branching:** `main` (protected) <- `dev` <- `feature/*`.
*   **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

---
*Standards defined by w3jdev*
