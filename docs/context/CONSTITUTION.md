# Engineering Constitution — Static Gym App MVP

> Human-maintained. No frontmatter baseline — update when conventions change, review when onboarding.

## Stack
- Runtime: Browser (static site), Node.js for local dev/build only
- Language: TypeScript
- Framework: React 18+ (Vite as build tool/dev server), Tailwind CSS for styling
- DB: none — static bundled data only (TypeScript/JSON modules)
- Test runner: Vitest (+ React Testing Library for component tests)

## Conventions
1. Domain logic (routine generator, nutrition calculator, exercise filters) lives in
   plain `.ts` modules with no React import, unit-tested directly — NOT: business logic
   written inline inside a component's render body or event handler.
2. All styling uses Tailwind utility classes driven by the shared `tailwind.config`
   tokens and the shared component library (`src/components/`) — NOT: inline `style={}`
   objects, hardcoded hex colors, or a page defining its own copy of a Button/Card/Input.
3. Shared, reusable UI primitives (Button, Card, Input, Select, Badge, PageLayout, etc.)
   live in one component library directory and are imported by every page — NOT:
   duplicating a near-identical component inside a page-specific folder.
4. Static reference data (routines, exercises, nutrition tables) lives in typed data
   modules under `src/data/`, imported by domain logic — NOT: data literals inline
   inside components.

## Hard Rules
- Never call an external HTTP API or backend service at runtime — the app must build
  and run as static files with the only outbound reference being YouTube video
  links/embeds.
- Always route styling through the Tailwind design system (tokens + shared components) —
  never introduce a second, parallel styling approach (CSS modules, styled-components,
  plain CSS files for components).
- Never put business logic (routine generation, BMR/TDEE math, exercise filtering)
  directly in a React component — always route it through a plain-TS domain function so
  it stays independently unit-testable.

## File Organization
- `src/pages/` → the three top-level views (RoutineBuilder, NutritionPlan, ExerciseLibrary)
- `src/components/` → shared Tailwind-based design-system components (Button, Card, etc.)
- `src/domain/` → pure TypeScript logic (routine generator, nutrition calculator, exercise filtering) — no React/DOM imports
- `src/data/` → static typed data (routines, exercises, nutrition reference tables)
- `src/domain/**/*.test.ts` → unit tests co-located with the domain logic they cover
- `docs/` → LANE artifacts (specs, tasks, context, ADRs)
