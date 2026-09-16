---
approved_by: "ShresthaPrajwal"
approved_at: "2026-09-16"
approved_sha256: "3fd6e061b31fe25ceb8e00ebbf8f0249c6259ceb7997216cd6a971aa7b76f2dc"
---

# Briefing 0001 — Static Gym App MVP

> Scratch pad — flesh the idea out before committing to a PRD.
> ★ Gate: stakeholder (PM / SA / client) approves before any PRD work begins.
> Approve by running `lane approve` — lane writes the stamp after your y/N confirm.
> Do NOT edit the frontmatter fields by hand; a hand-typed stamp does not count.

## Why
<!--  -->
People starting a fitness journey don't know which routine fits their goal (abs, bulk,
cut/lean, etc.), how much protein/calories they need, or which exercise works which
muscle. Most gym apps require a backend, accounts, and hosting. This MVP is a
React + TypeScript app, built to a static bundle (no server/API at runtime) that can
be deployed to any static host (GitHub Pages, Netlify, S3, Vercel static) with zero
backend, and gives a cohesive, single design system across all three pages.

## Hypothesis

A static-built (Vite + React + TypeScript) single-page app with client-side routing,
three views:

1. A **Routine Builder** page — pick a goal (abs / bulk / cut-lean / general fitness /
   strength / endurance) → get a generated weekly workout routine.
2. A **Nutrition Plan** page — enter gender, age, height, weight, activity level →
   get calculated calories (BMR/TDEE via Mifflin-St Jeor), protein, carbs, fat, and key
   vitamin/mineral guidance.
3. An **Exercise Library** page — browse by target muscle/body part → see exercise list
   with embedded/linked YouTube demo videos.

All three share one Tailwind-based design system — Tailwind config as the design tokens
(colors, spacing, type scale) and a small library of reusable React components built on
top of them (Button, Card, Input, Select, Badge, etc.) — applied consistently, no
page-specific one-off CSS. All routine/nutrition/exercise logic is static, rule-based
data + pure functions — no backend calls. `npm run build` produces static files
deployable as-is to any static host.

## Mocks / references

- No existing mocks. Visual style: clean, modern fitness-app aesthetic (dark theme,
  single accent color, card-based layouts) — to be defined as the design system in the
  TSD/implementation.

## Scope hints

**Probably in:**

- React + TypeScript app (Vite), statically built — no server/API required at runtime
- Goal-based routine generator (rule-based, static data — no ML/backend)
- Nutrition calculator (BMR/TDEE formulas, macro split, vitamin reference table)
- Exercise library filterable by muscle group, with YouTube video links/embeds
- One shared Tailwind design system: token config + reusable component library, used on every page
- Client-side routing only (e.g. react-router), no server-side rendering

**Probably out:**

- User accounts, login, saved history/progress tracking (no backend to persist)
- Payment/subscription features
- Real-time tracking, wearable integration
- Custom video hosting (use YouTube links/embeds only)
- SSR/server components — must remain purely static output

## Open questions

(none — resolved by scope hints above; proceeding with rule-based static generation for v1,
React + TypeScript via Vite, static build output)

## Approval

Run `lane approve` — lane stamps the frontmatter (name, date, content hash) after you confirm.
Editing this file after approval invalidates the stamp and reopens the gate.
