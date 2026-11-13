---
title: "Notification & Webhook Engine"
year: "Oct–Nov 2026"
role: "System design & guarantee boundaries by hand; platform AI-assisted"
stack: [".NET", "PostgreSQL + EF Core", "Redis", "SignalR", "React + TS", "docker-compose"]
repo: "https://github.com/ezpectus/webhook-engine"
order: 9
tagline: "At-least-once delivery engine — every guarantee boundary designed, implemented, then attacked with chaos failures until it held."
metric: "134 commits · dedup boundary · retry heap + DLQ · chaos-tested"
commits: 134
diagram: "webhook"
---

## Problem

"Reliable delivery" is where most systems lie to themselves. Accept an event, lose it in memory, report success — that's the default failure mode of every naive webhook dispatcher. The brief: build an engine where **at-least-once is a system property, not a feature** — and prove it by breaking it.

## Architecture

An event is persisted to Postgres before the API returns 202 — the row existing IS the acknowledgement. Dedup is layered honestly: a Redis `SET NX` content marker answers duplicates with zero reads, while a unique constraint on a time-bucketed key holds the hard boundary — same content in the next window is a new event, the way Stripe-style idempotency actually works. A bounded channel applies backpressure (full → honest 503, the durable Pending row plus a sweeper covers the gap). Dispatch is rate-limited per endpoint (token bucket), payloads are HMAC-SHA256 signed per secret, and retries run on an in-memory min-heap with versioned lazy deletion over a durable PG schedule — backoff with equal jitter, exhausted events land in a queryable, replayable DLQ.

## Key decisions

- **Postgres is the durability boundary, not Redis** — Redis failing open means slowdown, not loss.
- **Bounded channels over a broker** — RabbitMQ/Kafka would be a broker to operate for a lesson that's about queues, not brokers.
- **No `IRepository` wrapper** — `DbContext` used directly where hot paths need it; a repository abstraction hides exactly the failure modes this project studies.
- **Proof is a run, not a paragraph** — MockReceiver serves chaos modes (500/429/slow/flap/drop) and a load generator fires real rps with mixed duplicates.
- **50/50 build contract** — the guarantee boundaries (dedup, retry, DLQ, backpressure) are hand-written and chaos-reviewed; the platform plumbing (SignalR, migrations, dashboard, compose) was AI-generated under an explicit AGENTS.md contract — a working example of the method on `/ai`.

## What it proves

The final acceptance criterion: being able to answer _where a message can duplicate and why that's acceptable, where it can be lost and why that's not_. ~140 files — decisions journaled as ADR notes in `PLAN.md`, architecture and walkthroughs in `docs/`.
