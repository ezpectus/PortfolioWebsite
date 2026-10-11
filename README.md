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

- 7 case studies with real project metrics pulled from the GitHub commits API
- "How I work with AI" — spec → agent → review → slop audit → GuardDOG gate →
  tests/CI → ship, with the rejection loop. AI writes the draft; I own the diff.
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
  content/projects/*.md      case studies (zod-validated frontmatter)
  data/site.json             profile, links, stats, second-tier archive
  components/diagrams/*.astro hand-built SVG diagrams (one per case)
  utils/url.ts               base-path helper ("/" or "/PortfolioWebsite/")
public/cv/                   drop the CV PDF here
.github/workflows/ci.yml     check → build → Lighthouse → Pages deploy
netlify.toml                 Netlify mirror config
```

## Deployment

GitHub Pages serves project repos at `/<repo>/`, so the site is base-aware:
CI sets `DEPLOY_BASE=/PortfolioWebsite`, Netlify/local builds use `/`.
All internal links go through `u()` in `src/utils/url.ts`.

Manual steps after push:

1. Repo → **Settings → Pages → Source: GitHub Actions**
2. Netlify → **Add new site → Import from GitHub** → pick this repo —
   `netlify.toml` handles the rest

## Design rules (enforced by review, not by linter)

- One accent `#E8480C`, used sparingly (<5% of area)
- No gradients, glow shadows, glassmorphism, blobs
- All diagrams are inline SVG, stroke-based, mono labels
- `prefers-reduced-motion` fully respected
- Lighthouse ≥95 across all categories — enforced in CI
