---
title: "VideoHub"
year: "Mar–May 2026"
role: "Tech lead — team of six"
stack: ["Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL", "Next.js", "React"]
repo: "https://github.com/ezpectus/VideoHub"
order: 4
tagline: "Full-stack video platform built around real backend problems: streaming, transactions, scale."
metric: "HTTP 206 streaming · atomic counters · 6-person team"
commits: 76
diagram: "http206"
---

## Problem

Video platforms hide hard backend problems behind a simple play button: range-request streaming, counters that stay correct under concurrent writes, subscriptions that must be atomic. I built VideoHub to work those problems properly — and led the technical implementation across a six-person team.

## Key decisions

- **HTTP 206 Partial Content streaming** — real byte-range serving for local uploads, plus YouTube embed support.
- **Atomic likes and subscriptions** through database transactions — counters can't drift under races.
- **Buffered view counting** — writes are batched to keep hot video pages off the write path.
- **JWT auth with an OAuth-ready architecture** — providers plug in without rework.

## Leadership

I led technical implementation for a six-person team: architecture planning, task decomposition, code review, and keeping conventions consistent across a codebase written by six different hands.

## What it proves

Production-shaped backend work — transactional consistency, streaming protocols, and load-aware write paths — plus the unglamorous skill of making a team's output coherent.
