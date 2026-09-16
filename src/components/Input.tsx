import type { InputHTMLAttributes } from 'react'

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      data-ds="input"
      className={`w-full rounded border border-outline-variant bg-surface-container-lowest px-md py-sm font-body text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary-container focus:shadow-[0_0_12px_rgba(195,244,0,0.25)] focus:outline-none ${className}`}
      {...props}
    />
  )
}
