import type { HTMLAttributes } from 'react'

export function PageLayout({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-ds="page-layout"
      className={`mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-lg p-md sm:p-lg lg:p-xl ${className}`}
      {...props}
    />
  )
}
