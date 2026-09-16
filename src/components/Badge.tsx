import type { HTMLAttributes } from 'react'

export function Badge({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-ds="badge"
      className={`inline-flex items-center rounded-full bg-brand-100 px-sm py-xs text-xs font-medium text-brand-800 ${className}`}
      {...props}
    />
  )
}
