import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-white text-brand-700 border border-brand-600 hover:bg-brand-50',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      data-ds="button"
      className={`inline-flex items-center justify-center rounded-md px-md py-sm text-sm font-medium transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
