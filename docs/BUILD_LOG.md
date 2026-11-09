# Build Log

## 2026-11-09
- **Console showed 5 for both logs:** logging an element prints a live reference, not a snapshot. Fix: log `textContent` instead.
- **Upgrades didn't stick:** `tick()` copied from a separate `count` variable, overwriting purchases every second. Fix: one source of truth in `stats`.
- **"stats is not defined":** script load order. Fix: load playerStats.js before main.js.
