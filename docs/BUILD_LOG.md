# Build Log

## 2026-11-09
- **Console showed 5 for both logs:** logging an element prints a live reference, not a snapshot. Fix: log `textContent` instead.
- **Upgrades didn't stick:** `tick()` copied from a separate `count` variable, overwriting purchases every second. Fix: one source of truth in `stats`.
- **"stats is not defined":** script load order. Fix: load playerStats.js before main.js.

### Changes: local save (`feature/local-save`)
- **Local save:** new `save.js` with `saveGame()` and `loadGame()`. The whole `stats` object is stored as one JSON string under a single key (`fanIdleSave`). A missing save keeps the defaults; a corrupted save logs a warning and keeps the defaults.
- **Auto-save:** saves every 60 seconds, and when the page is hidden (`visibilitychange`), which covers tab switches, refreshes, and closing the tab.
- **Startup order:** `main.js` now defines everything first, then runs a single startup block: load, render, start the tick, start auto-save, attach listeners. The page shows loaded values immediately instead of the placeholder.
- **Per-tick display:** a heading shows how much the count increases each tick.
- **Workflow:** first feature built on its own branch, to be merged into `main` through a pull request.
