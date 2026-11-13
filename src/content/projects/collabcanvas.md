---
title: "CollabCanvas"
year: "Nov 2026"
role: "Design & implementation"
stack: [".NET 8", "SignalR", "Redis", "React + TS", "Canvas 2D", "docker-compose", "xUnit"]
repo: "https://github.com/ezpectus/collabcanvas"
order: 8
tagline: "Figma-like multiplayer canvas — real-time co-editing with LWW convergence, a Redis op journal, and honest documented trade-offs."
metric: "LWW + central seq · Redis stream journal · quadtree renderer"
commits: 150
diagram: "canvas"
---

## Problem

Real-time co-editing is the classic "looks easy, isn't" problem. Textbooks say OT or CRDTs — Figma itself doesn't use them. The study question: can a central ordering point plus per-property last-writer-wins give you correct convergence with a fraction of the machinery?

## Architecture

One stateful room process owns each document — it IS the ordering point. Clients submit ops through a SignalR hub; the room takes a lock, dedups, assigns `seq`, applies (every op is idempotent and order-agnostic by construction), journals to a Redis Stream, then fans out on `doc:out`. Snapshots land every 100 ops — restart is snapshot + replay tail. Redis does four jobs: stream journal, snapshot/blob store, pub/sub transport, membership state. Canvas 2D with a quadtree keeps hit-testing and culling at O(visible), not O(objects).

## Key decisions

- **No OT, no full CRDT** — a server that sees every write removes the merge problem; LWW registers converge by construction.
- **Fractional index (base-62)** for z-order — deterministic merge on every replica; float64 midpoints die after ~50 inserts, integers cause reindex storms.
- **Optimistic UI with honest rebase** — local ops apply instantly at a fractional temp seq; the server echo always wins; reconnect replays pending ops over fresh state.
- **Owner-per-doc via Redis claim** — submits to non-owners travel pub/sub to the owner. The split-brain window is documented, not hidden.
- **Server sessions, not JWT** — logout or revoke kills a live socket on the next op.
- **Wire contract tested live** — a Node 24 bot with the real `@microsoft/signalr` client verifies the protocol end to end; no jsdom theatre.

## What it proves

Deliberate engineering under a deadline: the stack table in the README lists every rejected alternative and why. The doc admits what the MVP doesn't do — that's the same honesty I apply to AI output.
