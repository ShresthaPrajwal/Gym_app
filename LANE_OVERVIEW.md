# LANE Overview

## Beginner — Day-to-Day Commands

| Command | What it does |
|---|---|
| `lane` | Oracle — tells you exactly what to do next |
| `lane status` | Lists all tasks and their current state |
| `lane ready` | Shows tasks you can start right now |
| `lane map` | Visual pipeline diagram of the current feature |

## Intermediate — Starting & Building a Feature

```bash
# 1. Create a new feature/fix/patch
lane new

# 2. Claim a task and get a worktree
lane start <T-ID>

# 3. TDD cycle — repeat per behavior
lane red <T-ID>      # commit failing test
lane green <T-ID>    # commit passing impl
lane refactor <T-ID> # optional cleanup

# 4. Review & verification
lane review <T-ID>

# 5. Merge when done
lane land <T-ID>
```

## Advanced — Spec, Gates & Architecture

```bash
# Spec pipeline (human must approve each gate)
lane plan <T-ID>         # scaffold execution plan
lane approve <T-ID>      # human stamps an artifact (run at a real terminal)
lane done <T-ID>         # close a task after verified

# Architecture snapshot
lane fold                # regenerate context docs from codebase
lane fold status         # check if docs are stale

# Playbook reference
lane philosophy          # WHY the rules exist
lane playbook sections   # list manual sections
lane playbook <section>  # e.g. lane playbook tdd, lane playbook cli
```

## Quick Patches & Moderate Changes

LANE has a ceremony ladder you pick at `lane new`:

| Kind | Use for | Stamps required |
| --- | --- | --- |
| `patch` | Small known-scope fix | 2 (one combined SPEC.md + verification) |
| `fix` | Moderate change | More artifacts, still scoped |
| `enhancement` | New feature | Full spec pipeline |
| `master` | Large structural change | Maximum ceremony |

```bash
lane new   # pick: patch / fix / enhancement / master
```

Two things never change regardless of rung:
- RED → GREEN proof (TDD ledger always required)
- Human approval stamps (2 minimum, always)

The rung only controls how many artifacts the spec is split across — not whether gates exist.

---

## The Core Loop

```
lane new → lane start → [red → green] × N → lane review → lane approve → lane done → lane land
```

Every step: run `lane` to see your exact next action.

---

## lane.config — Project Configuration

Lives at `.lane/lane.config`. Controls how LANE behaves for your project.

### Test Runner

```yaml
test_cmd: "npx vitest run"        # command to run tests (must accept file args)
test_ran_pattern: "Tests +[0-9]+" # regex proving tests actually executed
setup_cmd: "npm ci"               # run in fresh worktrees before red/green
replay_env: ""                    # seed DB, start services for verify replay
```

### Multi-Harness Monorepos

Run different test runners per subdirectory (e.g. Python backend + JS frontend):

```yaml
runner.api.root:             backend
runner.api.test_cmd:         pytest
runner.web.root:             frontend
runner.web.test_cmd:         npx vitest run
```

### Branch & Worktree Policy

```yaml
integration_branch: "main"   # tasks must fork from here
fork_policy: "stacked"       # allow stacked branches (optional)
worktree_base: ""            # where task worktrees live (default: sibling dir)
```

### Autonomy & CI

```yaml
autonomy_mode: "unattended"  # agent never stops to ask, takes recommended defaults
auto_land: "true"            # agent runs lane land automatically after done
approve_mode: "unattended"   # stamp without confirmation (CI/scripts)
autonomy_max_repeats: "4"    # allow stop after N no-progress turns
```

### Draft Assists

Inject domain-expert prompts the agent applies while drafting each artifact:

```yaml
assist_briefing:  ".lane/assists/briefing.md"
assist_prd:       ".lane/assists/prd.md"
assist_tsd:       ".lane/assists/tsd.md"
assist_breakdown: ".lane/assists/breakdown.md"
assist_plan:      ".lane/assists/plan.md"
```

Each assist has an `_enabled` toggle (`true`/`false`) to pause without deleting.

### Context Grounding

```yaml
use_lane_context_doc: true   # specs must conform to docs/context/* (default on)
assist_context: ".lane/assists/context.md"  # tunes lane hydrate
```

When `true`, `lane approve` blocks a TSD if `CONSTITUTION.md`, `BLUEPRINT.md`, or `PRODUCT.md` are stubs. Run `lane hydrate` to fill them from the codebase.

### Commit Hook Policy

```yaml
commit_hook_policy: "red-bypass"  # bypass hook for RED commits, honor for GREEN (default)
# "respect"  — honor hook for all commits (RED may be blocked if it doesn't compile)
# "bypass"   — skip hook for every ledger commit (weakest, use with caution)
```

### Optional Commands

```yaml
critic_cmd: ""   # fallback reviewer for CI (receives spec + diff, writes report)
route_cmd:  ""   # advisory routing agent (blast radius, security, ambiguity checks)
```
