import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'pill' | 'card'

// primary/secondary/ghost bundle full styling (structure + color) — append-only overrides via
// className are safe. pill/card are structure-only (no color): callers must supply complete,
// mutually-exclusive color classes per state via className so no two color utilities for the
// same property ever coexist in one render (avoids Tailwind specificity ties).
const variantClasses: Record<Variant, string> = {
  primary:
    'inline-flex items-center justify-center gap-sm rounded px-md py-sm font-display text-label-md font-bold uppercase tracking-wide transition-all duration-150 bg-primary-container text-surface hover:shadow-[0_0_20px_rgba(195,244,0,0.35)] hover:-translate-y-px',
  secondary:
    'inline-flex items-center justify-center gap-sm rounded px-md py-sm font-display text-label-md font-bold uppercase tracking-wide transition-all duration-150 bg-white/[0.04] border border-outline-variant text-white hover:border-secondary',
  ghost:
    'inline-flex items-center justify-center gap-sm rounded px-md py-sm font-display text-label-md font-bold uppercase tracking-wide transition-all duration-150 bg-primary-container/10 text-primary-container hover:bg-primary-container/20',
  // structure-only, no display/layout/color — the caller supplies layout (flex direction,
  // alignment) and complete per-state color classes via className.
  pill: 'rounded py-2 font-label-md text-label-md transition-colors',
  card: 'relative rounded p-md transition-all',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button data-ds="button" className={`${variantClasses[variant]} ${className}`} {...props} />
}
