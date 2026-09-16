import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-ds="card"
      className={`rounded-md border border-white/10 bg-surface-container-low p-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}
      {...props}
    />
  )
}
