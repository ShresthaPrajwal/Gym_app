import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-container text-surface hover:shadow-[0_0_20px_rgba(195,244,0,0.35)] hover:-translate-y-px',
  secondary: 'bg-white/[0.04] border border-outline-variant text-white hover:border-secondary',
  ghost: 'bg-primary-container/10 text-primary-container hover:bg-primary-container/20',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      data-ds="button"
      className={`inline-flex items-center justify-center gap-sm rounded px-md py-sm font-display text-label-md font-bold uppercase tracking-wide transition-all duration-150 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
