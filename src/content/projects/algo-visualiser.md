---
title: "Algo Visualiser"
year: "Jul 2026"
role: "Design & implementation"
stack: ["React 18", "TypeScript", "Vite", "TailwindCSS", "Vitest"]
repo: "https://github.com/ezpectus/algo-visualiser"
live: "https://algorithms-laboratory.netlify.app/"
order: 3
tagline: "138+ algorithms across 15 categories — step through execution like scrubbing a video."
metric: "138+ algorithms · O(1) seek · 8-language code view"
diagram: "sorting"
---

## Problem

Most algorithm visualizers are toys: an animation you can only watch at one speed, for a handful of sorts. Understanding an algorithm means being able to stop anywhere, inspect the state, and step backwards — like a debugger.

## Architecture

The core is a **snapshot-based execution model**: each algorithm emits immutable state snapshots as it runs, so seeking to any step is O(1) — no re-computation, no replay from scratch. Playback is deterministic and scrubbable like a video timeline.

## Key decisions

- **Snapshot model over callback animation** — deterministic O(1) seeking, trivial rewind, testable state.
- **8-language code viewer** — the same algorithm shown in C, C++, C#, Go, Java, JavaScript, Python or Rust.
- **Algorithm-specific visual signatures** — AVL balance factors, KMP failure tables, Dijkstra relaxation edges: each algorithm gets the visualization that explains _it_, not a generic bar chart.
- **Three-level fallback rendering** so the UI never goes blank, behind a strict CSP and security headers.

## What it proves

Frontend architecture at scale — a pure TypeScript SPA with no backend, where the interesting problem is the state model, not the pixels. Shipped live at [algorithms-laboratory.netlify.app](https://algorithms-laboratory.netlify.app/).
