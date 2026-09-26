import { Button } from './Button'

type ChipGroupProps<T extends string | number> = {
  /** Visible label above the chips. Omit when the surrounding UI already labels it. */
  label?: string
  /** Accessible name of the group; defaults to `label`. */
  name?: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}

// Single-choice selector: one swipeable row on phones, wrapping from md up.
export function ChipGroup<T extends string | number>({ label, name = label, options, value, onChange }: ChipGroupProps<T>) {
  return (
    <div className="flex min-w-0 flex-col gap-xs">
      {label && <span className="text-body-sm font-semibold text-on-surface-variant">{label}</span>}
      <div
        role="group"
        aria-label={name}
        className="flex gap-xs overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {options.map((opt) => {
          const active = opt.value === value
          return (
            <Button
              key={String(opt.value)}
              variant="pill"
              aria-pressed={active}
              onClick={() => onChange(opt.value)}
              className={`min-h-[44px] shrink-0 whitespace-nowrap border px-md ${
                active
                  ? 'border-primary-container bg-primary-container/15 text-primary-container'
                  : 'border-outline-variant text-on-surface-variant hover:border-outline hover:text-on-surface'
              }`}
            >
              {opt.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
