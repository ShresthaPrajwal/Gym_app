## TSD S-0001.04 — Exercise library by target muscle (PRD §S-0001.04)
| Aspect | Spec |
|--------|------|
| Interfaces | An exercise-filtering function: input = a target muscle/body part identifier (chest, back, legs, shoulders, arms, core, full-body); output = the list of exercises targeting that muscle, each with a name, target muscle, and a YouTube video reference (URL). A UI surface lets a user pick a muscle group and view/filter the exercise list, with each entry linking to (or embedding) its video. |
| Data / State | Static, bundled exercise reference data (exercise → target muscle → video URL). No persisted state; the selected filter is transient/in-memory in the UI only. |
| Behavior | Selecting a muscle group always returns the same non-empty list of exercises targeting only that muscle (at least 3 per group). Each returned exercise carries a valid, non-empty YouTube video reference. Changing the selected muscle group replaces the displayed list entirely. |
| Access | Any visitor of the Exercise Library view; no auth. |
| Boundaries | YouTube — the only external reference: each exercise links to (or embeds) a YouTube video by URL. The app does not call any YouTube API; it only stores/uses a static URL per exercise. |
| Tests | unit: filtering function for every muscle group returns only matching exercises, each with a well-formed YouTube URL, and returns at least 3 exercises per group. integration: selecting a muscle group in the UI updates the displayed list to match the function's output, and each entry's video link/embed points at a YouTube URL. |
