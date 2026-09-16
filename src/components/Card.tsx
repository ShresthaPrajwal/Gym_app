import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-ds="card"
      className={`rounded-lg border border-slate-200 bg-white p-md shadow-sm ${className}`}
      {...props}
    />
  )
}
