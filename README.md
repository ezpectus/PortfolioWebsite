# denys-stepanenko — personal site

[![ci](https://github.com/ezpectus/ezpectus.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/ezpectus/ezpectus.github.io/actions/workflows/ci.yml)

Static portfolio built with **Astro 7 + Tailwind 4**. Strict Swiss design:
paper background, one accent, hairline rules, all graphics hand-built SVG —
no gradients, no stock imagery, no generated pictures.

## Stack

- Astro 7 (static output, ~0 client JS)
- Tailwind CSS 4 via `@tailwindcss/vite`
- Content Collections for case studies
- Self-hosted fonts (fontsource variable)

## Commands

```bash
npm install        # deps
npm run dev        # dev server
npm run check      # astro typecheck
npm run build      # → dist/
npm run preview    # serve dist locally
npm run format     # prettier
```

## Content

- `src/content/projects/*.md` — case studies (frontmatter: title, year, role, stack, repo, live, order, tagline, metric, diagram)
- `src/data/site.json` — profile, links, stats, second-tier project archive
- `public/cv/` — drop `denys-stepanenko-cv.pdf` here

## CI/CD

`.github/workflows/ci.yml` — typecheck → format → build → Lighthouse (≥95 all
categories) → deploy to GitHub Pages on push to `main`. `netlify.toml` mirrors
the build to Netlify.

## Design rules (enforced by review, not by linter)

- One accent color `#E8480C`, used sparingly
- No gradients, shadows-as-glow, glassmorphism, blobs
- All diagrams are inline SVG, stroke-based, mono labels
- `prefers-reduced-motion` respected
