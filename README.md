# PortfolioWebsite

**Denys Stepanenko** — Software Engineer, backend & full-stack (.NET / TypeScript). Staffordshire, UK.

[![ci](https://github.com/ezpectus/PortfolioWebsite/actions/workflows/ci.yml/badge.svg)](https://github.com/ezpectus/PortfolioWebsite/actions/workflows/ci.yml)

Personal portfolio site. Static output, ~zero client-side JS, strict Swiss
typographic design — paper background, one accent, hairline rules, every
graphic hand-built inline SVG. No gradients, no stock imagery, no generated
pictures.

**Live:** <https://ezpectus.github.io/PortfolioWebsite/> ·
Netlify mirror on `main`.

## What's inside

- 9 case studies with real metrics pulled from the GitHub commits API —
  dates are commit windows, not guesses; private repos are marked `private`
  instead of linking a 404
- `/ai` — a full method page: who writes what (the 50/50 AGENTS.md split),
  the spec→agent→audit→gate pipeline, the actual slop-audit checklist,
  chaos-test discipline, and the artifacts behind it (GuardDOG,
  agents-workflow kit, per-repo contracts)
- Commit-activity timeline on the homepage — Gantt-style windows per repo
- Full project index (`/work`), second-tier archive, coursework fold
- CV at `/cv/denys-stepanenko-cv.pdf`
- The pipeline is part of the portfolio: typecheck → format → build →
  Lighthouse gate → Pages deploy on every push

## Stack

- **Astro 7** — static output, Content Collections for case studies
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **TypeScript** strict (`astro/tsconfigs/strictest`)
- Self-hosted variable fonts (Inter Tight / Inter / JetBrains Mono)
- Zod for content frontmatter validation

## Commands

```bash
npm install        # install deps
npm run dev        # dev server → localhost:4321
npm run check      # astro typecheck
npm run build      # → dist/
npm run preview    # serve dist locally
npm run format     # prettier write
```

## Structure

```
src/
  content/projects/*.md      9 case studies (zod-validated frontmatter;
                             repo optional — private projects render "private repo")
  data/site.json             profile, links, stats, second-tier archive
  components/diagrams/*.astro 9 hand-built SVG diagrams (one per case)
  components/TimelineStrip    commit-window timeline (GitHub API data)
  components/WorkTable        project rows; href optional → "private" tag
  utils/url.ts               base-path helper ("/" or "/PortfolioWebsite/")
  pages/ai/index.astro       the AI method page
public/cv/                   drop the CV PDF here (currently v6.0)
.github/workflows/ci.yml     check → build → Lighthouse → Pages deploy
netlify.toml                 Netlify mirror config
```

## Deployment

GitHub Pages serves project repos at `/<repo>/`, so the site is base-aware:
CI sets `DEPLOY_BASE=/PortfolioWebsite`, Netlify/local builds use `/`.
All internal links go through `u()` in `src/utils/url.ts`.
`SITE_URL` sets the canonical host for sitemap/OG per environment.

Manual steps after push:

1. Repo → **Settings → Pages → Source: GitHub Actions**
2. Netlify → **Add new site → Import from GitHub** → pick this repo —
   `netlify.toml` handles the rest. Optional: create a Netlify
   **build hook** and save it as the `NETLIFY_BUILD_HOOK` repo secret —
   the weekly cron then refreshes stats on the mirror too.

## Design rules (enforced by review, not by linter)

- One accent `#B44E23`, used sparingly (<5% of area)
- No gradients, glow shadows, glassmorphism, blobs
- All diagrams are inline SVG, stroke-based, mono labels
- No scroll-jacking — instant anchor navigation
- `prefers-reduced-motion` fully respected
- Lighthouse ≥95 across all categories — enforced in CI
