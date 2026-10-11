---
title: "forgeai"
year: "Sep 2026"
role: "Design & implementation"
stack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "OpenRouter", "HuggingFace"]
repo: "https://github.com/ezpectus/forgeai"
order: 6
tagline: "Open-source prompt-to-live-URL generator — a sentence becomes a deployed site in ~15 seconds."
metric: "~15s to live URL · ~$0.002/gen · BYOK · MIT"
commits: 215
diagram: "forge"
---

## Problem

"AI website generators" demo well and deploy nowhere: you get a preview iframe, maybe a ZIP. The actual hard part is the pipeline — generation → persistence → deployment → a real URL someone can visit.

## Architecture

Type a sentence, get a deployed website with a database, working forms and a custom domain — in about 15 seconds, at roughly $0.002 per generation. The system is BYOK (bring your own key) and self-hostable under MIT: Next.js + Tailwind on the front, Supabase for persistence, OpenRouter/HuggingFace for model access.

## Key decisions

- **End-to-end, not a demo** — output is a live URL with a database behind it, not a screenshot.
- **Cost engineering** — ~$0.002 per generation means the economics work without a funding round.
- **BYOK + self-hostable** — open by design; no lock-in as a feature.
- **Model-agnostic** via OpenRouter/HuggingFace — swap providers without touching the pipeline.

## What it proves

The full arc of an AI product: prompt design, generation pipeline, deployment automation, and cost discipline — plus shipping it open-source so the whole thing is auditable.
