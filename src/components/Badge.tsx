import type { HTMLAttributes } from 'react'

export function Badge({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-ds="badge"
      className={`inline-flex items-center rounded-sm border border-primary-container/40 bg-primary-container/10 px-sm py-xs font-display text-label-caps uppercase tracking-wide text-primary-container ${className}`}
      {...props}
    />
  )
}
