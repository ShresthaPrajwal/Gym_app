import type { KeyboardEvent } from 'react'
import type { MuscleGroup } from '../domain/exerciseFilter'

// Geometry is transcribed verbatim from the supplied `human_muscle_system_clickable.svg`
// (paths, coordinates, leader lines, labels). Two things in that asset are deliberately NOT
// carried over: its embedded <style> block of literal hex colours, replaced here by design
// tokens so styling flows through the design system (BLUEPRINT boundary rule); and its
// embedded <script>, dropped because selection state belongs to the host page — this
// component holds none of its own.

type RegionDef = {
  muscle: MuscleGroup
  /** Label as the asset writes it; the accessible name is `${label} region`. */
  label: string
  /** `d` attributes exactly as authored, in the asset's own group order. */
  paths: string[]
}

// Coordinates are body-local: the asset nests each figure in a translate(), reproduced below.
const FRONT_REGIONS: RegionDef[] = [
  {
    muscle: 'calves',
    label: 'Calves / Lower Legs',
    paths: [
      'M-48 448 Q-54 480 -49 532 L-38 586 L-13 586 L-7 532 L-12 454Z',
      'M48 448 Q54 480 49 532 L38 586 L13 586 L7 532 L12 454Z',
    ],
  },
]

const BACK_REGIONS: RegionDef[] = [
  {
    muscle: 'calves',
    label: 'Calves',
    paths: [
      'M-45 452 Q-55 475 -49 532 L-37 586 L-12 586 L-7 532 L-12 458Z',
      'M45 452 Q55 475 49 532 L37 586 L12 586 L7 532 L12 458Z',
    ],
  },
]

const FRONT_SILHOUETTE =
  'M-103 123 Q-112 150 -105 205 L-103 264 L-87 290 L-70 263 L-65 194 L-48 154 L-35 276 L-45 300 ' +
  'L-48 415 L-52 430 L-48 448 L-38 584 L-13 584 L-7 448 L0 420 L7 448 L13 584 L38 584 L48 448 ' +
  'L52 430 L48 415 L45 300 L35 276 L48 154 L65 194 L70 263 L87 290 L103 264 L105 205 ' +
  'Q112 150 103 123 Q76 94 32 93 L22 61 L-22 61 L-32 93 Q-76 94 -103 123Z'

const BACK_SILHOUETTE =
  'M-103 143 Q-112 170 -104 218 L-101 278 L-86 302 L-69 278 L-54 238 L-43 176 L-51 254 L-43 283 ' +
  'L-51 332 L-57 416 L-49 452 L-37 584 L-12 584 L-7 452 L0 430 L7 452 L12 584 L37 584 L49 452 ' +
  'L57 416 L51 332 L43 283 L51 254 L54 176 L69 238 L86 302 L101 278 L104 218 Q112 170 103 143 ' +
  'Q94 112 61 111 L24 91 L0 106 L-24 91 L-61 111 Q-94 112 -103 143Z'

function Region({
  region,
  selected,
  onSelect,
}: {
  region: RegionDef
  selected: MuscleGroup | 'all'
  onSelect: (muscle: MuscleGroup) => void
}) {
  const active = selected === region.muscle

  function activate() {
    onSelect(region.muscle)
  }

  function onKeyDown(event: KeyboardEvent<SVGGElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    activate()
  }

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${region.label} region`}
      aria-pressed={active}
      onClick={activate}
      onKeyDown={onKeyDown}
      strokeWidth={active ? 2.5 : 1.5}
      className={`cursor-pointer outline-none transition-colors ${
        active
          ? 'fill-primary-container/40 stroke-primary-container'
          : 'fill-surface-bright stroke-surface-container-lowest hover:fill-outline'
      }`}
    >
      {region.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  )
}

function BodyPanel({
  view,
  regions,
  silhouette,
  selected,
  onSelect,
}: {
  view: 'front' | 'back'
  regions: RegionDef[]
  silhouette: string
  selected: MuscleGroup | 'all'
  onSelect: (muscle: MuscleGroup) => void
}) {
  // The asset also draws a head and feet, but with its silhouette style rather than its muscle
  // style — they are presented and never selectable, so they carry no control and no highlight.
  return (
    <g transform={view === 'front' ? 'translate(302,125)' : 'translate(898,125)'}>
      <path className="fill-surface-container-highest" d={silhouette} opacity={0.12} />
      <ellipse className="fill-surface-container-highest" cx={0} cy={34} rx={34} ry={42} />
      {regions.map((region) => (
        <Region
          key={`${view}-${region.muscle}`}
          region={region}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </g>
  )
}

export function AnatomyInspector({
  selected,
  onSelect,
}: {
  selected: MuscleGroup | 'all'
  onSelect: (muscle: MuscleGroup) => void
}) {
  return (
    <div
      data-ds="anatomy-inspector"
      className="rounded-md border border-white/10 bg-surface-container-lowest p-md"
    >
      <svg
        viewBox="0 0 1200 760"
        className="h-auto w-full"
        role="img"
        aria-label="Human muscular system"
      >
        <rect className="fill-surface-container-lowest" width={1200} height={760} />

        <text className="fill-white font-display text-[28px] font-bold" x={42} y={48}>
          Bio-Anatomy Inspector
        </text>
        <text className="fill-on-surface-variant font-display text-[12px] tracking-[4px]" x={43} y={72}>
          HUMAN MUSCULAR SYSTEM
        </text>

        <rect
          className="fill-surface-container-low stroke-white/10"
          strokeWidth={1.5}
          x={25}
          y={100}
          width={555}
          height={610}
          rx={8}
        />
        <rect
          className="fill-surface-container-low stroke-white/10"
          strokeWidth={1.5}
          x={620}
          y={100}
          width={555}
          height={610}
          rx={8}
        />

        <BodyPanel
          view="front"
          regions={FRONT_REGIONS}
          silhouette={FRONT_SILHOUETTE}
          selected={selected}
          onSelect={onSelect}
        />
        <BodyPanel
          view="back"
          regions={BACK_REGIONS}
          silhouette={BACK_SILHOUETTE}
          selected={selected}
          onSelect={onSelect}
        />

        <text
          className="fill-on-surface-variant font-display text-[12px] tracking-[3px]"
          x={302}
          y={694}
          textAnchor="middle"
        >
          FRONT VIEW
        </text>
        <text
          className="fill-on-surface-variant font-display text-[12px] tracking-[3px]"
          x={898}
          y={694}
          textAnchor="middle"
        >
          BACK VIEW
        </text>

        <rect
          className="fill-surface-container stroke-white/10"
          strokeWidth={1.2}
          x={885}
          y={35}
          width={270}
          height={43}
          rx={7}
        />
        <rect className="fill-primary-container/40" x={898} y={47} width={18} height={18} rx={3} />
        <text className="fill-on-surface-variant font-body text-[12px]" x={928} y={61}>
          Click a muscle group to select
        </text>
      </svg>
    </div>
  )
}
