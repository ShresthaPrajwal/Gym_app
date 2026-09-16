import type { SelectHTMLAttributes } from 'react'

export function Select({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      data-ds="select"
      className={`w-full rounded border border-outline-variant bg-surface-container-lowest px-md py-sm font-body text-sm text-on-surface focus:border-primary-container focus:shadow-[0_0_12px_rgba(195,244,0,0.25)] focus:outline-none ${className}`}
      {...props}
    />
  )
}
