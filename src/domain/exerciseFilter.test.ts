import { MUSCLE_GROUPS, filterExercises, type MuscleGroup } from './exerciseFilter'

const YOUTUBE_URL_RE = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/

// B-1 (tracer bullet): AC-1 + AC-3: filtering returns only exercises matching every
// active filter, each with a well-formed video reference and non-empty cues.
test('search + anatomy group narrows to matching exercises only', () => {
  const results = filterExercises({ search: 'press', muscle: 'chest' })

  expect(results.length).toBeGreaterThan(0)
  for (const exercise of results) {
    expect(exercise.targetMuscle).toBe('chest')
    expect(exercise.name.toLowerCase()).toContain('press')
    expect(exercise.videoUrl).toMatch(YOUTUBE_URL_RE)
    expect(exercise.cues.length).toBeGreaterThan(0)
  }
})

test('anatomy group + difficulty narrows to matching exercises only', () => {
  const results = filterExercises({ muscle: 'core', difficulty: 'beginner' })

  expect(results.length).toBeGreaterThan(0)
  for (const exercise of results) {
    expect(exercise.targetMuscle).toBe('core')
    expect(exercise.difficulty).toBe('beginner')
  }
})

test('equipment + mechanics narrows to matching exercises only', () => {
  const results = filterExercises({ equipment: 'bodyweight', mechanics: 'isolation' })

  expect(results.length).toBeGreaterThan(0)
  for (const exercise of results) {
    expect(exercise.equipment).toBe('bodyweight')
    expect(exercise.mechanics).toBe('isolation')
  }
})

// B-2: AC-2: a filter combination with no matching exercises returns an empty list.
// 0002: was core+barbell, which became a real match once the catalogue grew (Weighted Plank).
// core+dumbbell carries the same "valid pair, nothing tagged to it" intent.
test('a filter combination with no matches returns an empty list', () => {
  const results = filterExercises({ muscle: 'core', equipment: 'dumbbell' })
  expect(results).toEqual([])
})

test('no filters returns the full exercise set', () => {
  const all = filterExercises({})
  const withAll = filterExercises({ muscle: 'all', difficulty: 'all', equipment: 'all', mechanics: 'any' })
  expect(withAll).toEqual(all)
  expect(all.length).toBeGreaterThan(0)
})

// ── 0002 S-0002.01 ────────────────────────────────────────────────────────────
// B-1 (tracer bullet): AC-1: filtering by a single muscle returns only exercises
// tagged to that muscle. Driven against `calves` — one of the specific anatomical
// regions this task introduces — so it proves the widened vocabulary, the re-tagged
// data and the filter line up, not merely that filtering works at all.
test("filtering by a specific muscle region returns only that region's exercises", () => {
  const results = filterExercises({ muscle: 'calves' })

  expect(results.length).toBeGreaterThan(0)
  for (const exercise of results) {
    expect(exercise.targetMuscle).toBe('calves')
  }
})

// B-2: AC-2: no selectable region is a dead end. The regions are spelled out here rather
// than read back out of MUSCLE_GROUPS on purpose — looping the vocabulary would assert
// "whatever we shipped is non-empty", which passes vacuously and proves nothing. This list
// is the contract: the clickable regions of the Bio-Anatomy Inspector diagram, plus
// 'full-body' for conditioning work that belongs to no single region.
const DIAGRAM_REGIONS: MuscleGroup[] = [
  'neck',
  'trapezius',
  'shoulders',
  'chest',
  'lats',
  'lower-back',
  'biceps',
  'triceps',
  'forearms',
  'core',
  'obliques',
  'hip-flexors',
  'glutes',
  'quadriceps',
  'hamstrings',
  'knees',
  'calves',
  'full-body',
]

test('the muscle vocabulary is exactly the diagram regions, and nothing else', () => {
  expect([...MUSCLE_GROUPS].sort()).toEqual([...DIAGRAM_REGIONS].sort())
})

test('every selectable muscle region returns at least one exercise', () => {
  const dead = DIAGRAM_REGIONS.filter((muscle) => filterExercises({ muscle }).length === 0)
  expect(dead).toEqual([])
})

// Off-ledger regression guard (AC-2 review follow-up). The pre-existing URL-shape check used
// `[\w-]+`, which accepts an ID of any length, and only ran over three chest records — so a
// batch of 10-character placeholder IDs reached review undetected. A YouTube video ID is
// ALWAYS exactly 11 characters, so length is the cheap structural signal that catches a
// placeholder. Asserted over EVERY record, not a filtered subset.
//
// This guard is deliberately structural, not a liveness check: the ledger replay runs in a
// fresh worktree and must stay hermetic (no network), and the spec's Boundaries are empty.
// That each ID actually resolves was verified out-of-band against YouTube's oEmbed endpoint
// (166/166 at the time of writing) — a test cannot own that without taking a network dependency.
const YOUTUBE_ID_RE = /^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}$/

test('every exercise has a structurally valid YouTube video reference', () => {
  const all = filterExercises({})

  // guard the guard: without this the assertion below passes vacuously on an empty catalogue
  expect(all.length).toBeGreaterThan(0)

  const malformed = all
    .filter((exercise) => !YOUTUBE_ID_RE.test(exercise.videoUrl))
    .map((exercise) => `${exercise.name}: ${exercise.videoUrl}`)

  expect(malformed).toEqual([])
})

// Two exercises pointing at the same demo video means either a copy-paste slip or two records
// describing the same movement — both of which a shape check happily accepts.
test('no two exercises share the same demo video', () => {
  const byVideo = new Map<string, string[]>()
  for (const exercise of filterExercises({})) {
    const names = byVideo.get(exercise.videoUrl) ?? []
    names.push(exercise.name)
    byVideo.set(exercise.videoUrl, names)
  }

  const shared = [...byVideo.entries()]
    .filter(([, names]) => names.length > 1)
    .map(([url, names]) => `${names.join(' + ')} -> ${url}`)

  expect(shared).toEqual([])
})
