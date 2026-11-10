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

## 2026-11-10

### Changes: offline progress (`feature/offline-progress`)
- **Timestamp in the save:** `stats.lastSaved` holds `Date.now()` (milliseconds, a number so it survives JSON). It defaults to the current time, so new players and older saves get no offline time. `saveGame()` updates it on every save, keeping count and timestamp in sync.
- **Offline earnings:** on load, `calcOffline()` takes the time since `lastSaved` (never negative), counts whole ticks missed, and adds `ticks × perTick` to the count, then saves and renders.
- **Welcome-back dialog:** a `<dialog>` shows time away (`formatTime()`, as `Xh Ym Zs`) and the amount earned. Skipped when gains are 0. Closed by an Ok button (`<form method="dialog">`) or Esc.
- **Tick length constant:** `tickInterval` defines the tick length once, shared by `setInterval` and the offline calculation.
- **Known limitations:** partial ticks are dropped on each load; offline time is not capped; browsers slow timers in background tabs, so an open hidden tab earns less than a closed one.
