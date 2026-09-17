## Task T-design-renovate-9293y6 — Video player modal with YouTube Shorts support
**Parent:** story S-0004.02 · feature 0004-enhancement-design-renovate
**Slice:** Replace in-card video playback with a centred modal player; handle both watch and Shorts URLs
**Acceptance criteria:**
- [ ] AC-1 [behavior]: Clicking the play button opens a modal with a 16:9 YouTube embed (autoplay), closable by clicking outside or pressing Escape
- [ ] AC-2 [behavior]: Modal has a "Watch on YouTube" button that opens the original URL in a new tab
- [ ] AC-3 [behavior]: YouTube Shorts URLs (youtube.com/shorts/<id>) are parsed correctly and embedded
- [ ] AC-4 [e2e]: User can open modal, watch video, go fullscreen, and close without page reload
**End-to-end AC:** AC-4 [e2e]
**Tests:** N/A — interaction/UI change verified by prototype and manual review
**Test scope:** tests/T-design-renovate-9293y6/
**Done =** reviewable PR, modal works end-to-end, Shorts handled.
