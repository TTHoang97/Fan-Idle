# Fan Idle

Minimal browser idle game, being shipped on AWS (serverless + Terraform).
I'm relearning HTML/JavaScript and building DevOps skills.
Requirements: docs/PRD.md · Progress: docs/BUILD_LOG.md

## Current milestone
v0.1.0, playable locally. Feature-complete:
counter, tick, upgrade with rising cost, per-tick display, local save
(one JSON key, auto-save every 60s + on visibilitychange hidden),
offline progress from `lastSaved` with a welcome-back dialog.
Next: merge `feature/offline-progress`, tag `v0.1.0` on main, then start v0.2.0
(Terraform, S3 + CloudFront, health-check API, deploy on tag).

## Code layout (frontend/src)
- playerStats.js: `stats` object with new-player defaults only.
- save.js: `saveGame()` / `loadGame()`; storage only, no game logic.
- main.js: functions first, then one startup block (load, render, offline calc, intervals, listeners).
- Plain script tags, load order matters: playerStats.js, save.js, main.js. ES modules deferred to v0.2.0.

## Workflow
- One branch per feature (`feature/<name>`), merged into `main` through a PR (via `gh`).
- Milestones are annotated tags on `main` (`v0.1.0`, ...), not branches.
- BUILD_LOG.md records major changes per feature.

## How to help me
- Don't write code for me. Explain concepts, give hints, and review what I write.
- Only show example code if I ask after being stuck.
- Don't add features or files outside the current milestone.
- Point out bugs and bad practices directly.
