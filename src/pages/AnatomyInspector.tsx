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
  /** Secondary shape the asset paints over the region (the abdominal segmentation). */
  detail?: string
  /** Regions the asset draws as ellipses rather than paths (the knees). */
  ellipses?: { cx: number; cy: number; rx: number; ry: number }[]
}

// Coordinates are body-local: the asset nests each figure in a translate(), reproduced below.
// Order within each list follows the asset's own group order, so paint order is preserved.
const FRONT_REGIONS: RegionDef[] = [
  {
    muscle: 'neck',
    label: 'Neck',
    paths: ['M-22 61 L-28 88 L-52 104 L-31 119 L0 103 L31 119 L52 104 L28 88 L22 61Z'],
  },
  {
    muscle: 'shoulders',
    label: 'Shoulders',
    paths: [
      'M-32 93 Q-75 92 -103 123 Q-76 141 -48 132 L-24 108Z',
      'M32 93 Q75 92 103 123 Q76 141 48 132 L24 108Z',
    ],
  },
  {
    muscle: 'chest',
    label: 'Chest',
    paths: [
      'M-25 105 Q-70 106 -68 143 Q-45 158 0 148 L0 110Z',
      'M25 105 Q70 106 68 143 Q45 158 0 148 L0 110Z',
    ],
  },
  {
    muscle: 'biceps',
    label: 'Biceps',
    paths: [
      'M-70 132 Q-94 144 -92 190 Q-83 212 -65 194 L-50 150Z',
      'M70 132 Q94 144 92 190 Q83 212 65 194 L50 150Z',
    ],
  },
  {
    muscle: 'forearms',
    label: 'Forearms',
    paths: [
      'M-87 190 Q-105 205 -103 263 L-87 290 Q-72 272 -70 218Z',
      'M87 190 Q105 205 103 263 L87 290 Q72 272 70 218Z',
    ],
  },
  {
    muscle: 'core',
    label: 'Core',
    paths: ['M-40 149 Q-25 158 0 156 Q25 158 40 149 L45 242 Q23 256 0 251 Q-23 256 -45 242Z'],
    detail:
      'M-31 164 L-3 163 L-3 187 L-30 188Z M3 163 L31 164 L30 188 L3 187Z ' +
      'M-30 193 L-3 192 L-3 218 L-28 217Z M3 192 L30 193 L28 217 L3 218Z ' +
      'M-26 222 L-3 221 L-3 244 L-23 241Z M3 221 L26 222 L23 241 L3 244Z',
  },
  {
    muscle: 'obliques',
    label: 'Obliques',
    paths: ['M-43 161 L-62 169 L-52 232 L-43 242 L-34 210Z', 'M43 161 L62 169 L52 232 L43 242 L34 210Z'],
  },
  {
    muscle: 'hip-flexors',
    label: 'Hip Flexors',
    paths: ['M-44 241 Q-23 250 0 249 Q23 250 44 241 L35 276 Q0 291 -35 276Z'],
  },
  {
    muscle: 'quadriceps',
    label: 'Quadriceps',
    paths: [
      'M-35 270 Q-62 284 -61 344 L-50 415 Q-30 425 -8 406 L-3 294Z',
      'M35 270 Q62 284 61 344 L50 415 Q30 425 8 406 L3 294Z',
    ],
  },
  {
    muscle: 'knees',
    label: 'Knees',
    ellipses: [
      { cx: -30, cy: 426, rx: 22, ry: 25 },
      { cx: 30, cy: 426, rx: 22, ry: 25 },
    ],
    paths: [],
  },
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
    muscle: 'neck',
    label: 'Neck',
    paths: ['M-22 61 L-28 95 L-55 112 L-30 126 L0 105 L30 126 L55 112 L28 95 L22 61Z'],
  },
  {
    muscle: 'trapezius',
    label: 'Trapezius',
    paths: ['M-24 91 L0 106 L24 91 L61 120 L43 176 L0 159 L-43 176 L-61 120Z'],
  },
  {
    muscle: 'shoulders',
    label: 'Shoulders',
    paths: [
      'M-61 111 Q-94 112 -103 143 Q-82 158 -58 151 L-42 128Z',
      'M61 111 Q94 112 103 143 Q82 158 58 151 L42 128Z',
    ],
  },
  {
    muscle: 'lats',
    label: 'Lats',
    paths: [
      'M-42 145 L-61 151 Q-70 191 -48 245 L-12 265 L-7 164Z',
      'M42 145 L61 151 Q70 191 48 245 L12 265 L7 164Z',
    ],
  },
  {
    muscle: 'triceps',
    label: 'Triceps',
    paths: [
      'M-61 151 Q-83 166 -85 213 L-70 254 Q-56 235 -54 190Z',
      'M61 151 Q83 166 85 213 L70 254 Q56 235 54 190Z',
    ],
  },
  {
    muscle: 'forearms',
    label: 'Forearms',
    paths: [
      'M-84 210 Q-104 229 -101 278 L-86 302 Q-70 278 -69 238Z',
      'M84 210 Q104 229 101 278 L86 302 Q70 278 69 238Z',
    ],
  },
  {
    muscle: 'lower-back',
    label: 'Lower Back',
    paths: ['M-34 221 Q-20 234 0 232 Q20 234 34 221 L43 283 L0 302 L-43 283Z'],
  },
  {
    muscle: 'glutes',
    label: 'Glutes',
    paths: [
      'M-43 283 Q-20 270 0 286 L0 346 Q-30 357 -51 332Z',
      'M43 283 Q20 270 0 286 L0 346 Q30 357 51 332Z',
    ],
  },
  {
    muscle: 'hamstrings',
    label: 'Hamstrings',
    paths: [
      'M-49 340 Q-61 355 -57 416 L-46 454 Q-24 458 -7 440 L-5 355Z',
      'M49 340 Q61 355 57 416 L46 454 Q24 458 7 440 L5 355Z',
    ],
  },
  {
    muscle: 'calves',
    label: 'Calves',
    paths: [
      'M-45 452 Q-55 475 -49 532 L-37 586 L-12 586 L-7 532 L-12 458Z',
      'M45 452 Q55 475 49 532 L37 586 L12 586 L7 532 L12 458Z',
    ],
  },
]

// Display names for the legend readout. `full-body` has no region on the body (it is reachable
// only from the page's filter controls), but it can still be the page's current selection, so the
// legend must be able to name it.
const REGION_LABELS: Record<MuscleGroup, string> = {
  neck: 'Neck',
  trapezius: 'Trapezius',
  shoulders: 'Shoulders',
  chest: 'Chest',
  lats: 'Lats',
  'lower-back': 'Lower Back',
  biceps: 'Biceps',
  triceps: 'Triceps',
  forearms: 'Forearms',
  core: 'Core',
  obliques: 'Obliques',
  'hip-flexors': 'Hip Flexors',
  glutes: 'Glutes',
  quadriceps: 'Quadriceps',
  hamstrings: 'Hamstrings',
  knees: 'Knees',
  calves: 'Calves',
  'full-body': 'Full Body',
}

// Leader-line callouts, transcribed from the asset. Decorative: the region itself is the control,
// so these are hidden from assistive tech rather than duplicated as a second set of targets.
type Callout = { line: string; dot: { cx: number; cy: number }; text: string; x: number; y: number }

const FRONT_CALLOUTS: Callout[] = [
  { line: 'M-34 111 H-150 L-220 91', dot: { cx: -34, cy: 111 }, text: 'Shoulders', x: -226, y: 88 },
  { line: 'M-44 130 H-150 L-220 130', dot: { cx: -44, cy: 130 }, text: 'Chest', x: -226, y: 134 },
  { line: 'M-71 169 H-150 L-220 169', dot: { cx: -71, cy: 169 }, text: 'Biceps', x: -226, y: 173 },
  { line: 'M-88 224 H-150 L-220 208', dot: { cx: -88, cy: 224 }, text: 'Forearms', x: -226, y: 212 },
  { line: 'M-44 199 H-145 L-220 246', dot: { cx: -44, cy: 199 }, text: 'Core', x: -226, y: 250 },
  { line: 'M-52 205 H-130 L-220 286', dot: { cx: -52, cy: 205 }, text: 'Obliques', x: -226, y: 290 },
  { line: 'M-49 340 H-145 L-220 337', dot: { cx: -49, cy: 340 }, text: 'Quadriceps', x: -226, y: 341 },
  { line: 'M-49 520 H-145 L-220 520', dot: { cx: -49, cy: 520 }, text: 'Lower legs', x: -226, y: 524 },
]

const BACK_CALLOUTS: Callout[] = [
  { line: 'M30 105 H145 L220 88', dot: { cx: 30, cy: 105 }, text: 'Trapezius', x: 226, y: 91 },
  { line: 'M61 132 H150 L220 130', dot: { cx: 61, cy: 132 }, text: 'Shoulders', x: 226, y: 134 },
  { line: 'M45 190 H150 L220 177', dot: { cx: 45, cy: 190 }, text: 'Lats', x: 226, y: 181 },
  { line: 'M70 215 H150 L220 215', dot: { cx: 70, cy: 215 }, text: 'Triceps', x: 226, y: 219 },
  { line: 'M35 255 H150 L220 255', dot: { cx: 35, cy: 255 }, text: 'Lower back', x: 226, y: 259 },
  { line: 'M43 312 H150 L220 303', dot: { cx: 43, cy: 312 }, text: 'Glutes', x: 226, y: 307 },
  { line: 'M50 396 H150 L220 396', dot: { cx: 50, cy: 396 }, text: 'Hamstrings', x: 226, y: 400 },
  { line: 'M47 515 H150 L220 515', dot: { cx: 47, cy: 515 }, text: 'Calves', x: 226, y: 519 },
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
      {region.ellipses?.map((e) => (
        <ellipse key={`${e.cx},${e.cy}`} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} />
      ))}
      {region.detail && (
        <path className="fill-surface-container-highest stroke-surface-container-lowest" strokeWidth={1} d={region.detail} />
      )}
    </g>
  )
}

function BodyPanel({
  view,
  regions,
  silhouette,
  callouts,
  selected,
  onSelect,
}: {
  view: 'front' | 'back'
  regions: RegionDef[]
  silhouette: string
  callouts: Callout[]
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
      <g aria-hidden="true">
        {callouts.map((c) => (
          <g key={c.text}>
            <path className="fill-none stroke-primary-container/70" strokeWidth={1.2} d={c.line} />
            <circle className="fill-primary-container/70" cx={c.dot.cx} cy={c.dot.cy} r={3} />
            <text
              className="fill-on-surface-variant font-body text-[13px]"
              x={c.x}
              y={c.y}
              textAnchor={view === 'front' ? 'end' : 'start'}
            >
              {c.text}
            </text>
          </g>
        ))}
      </g>
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
      data-testid="anatomy-inspector"
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
          callouts={FRONT_CALLOUTS}
          selected={selected}
          onSelect={onSelect}
        />
        <BodyPanel
          view="back"
          regions={BACK_REGIONS}
          silhouette={BACK_SILHOUETTE}
          callouts={BACK_CALLOUTS}
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

        <text
          data-testid="anatomy-legend"
          className="fill-on-surface-variant font-body text-[12px]"
          x={600}
          y={735}
          textAnchor="middle"
        >
          {selected === 'all' ? 'Selected: none' : `Selected: ${REGION_LABELS[selected] ?? selected}`}
        </text>
      </svg>
    </div>
  )
}
