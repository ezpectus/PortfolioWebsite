---
title: "AI Log Observability Platform"
year: "May–Jun 2026"
role: "Design & implementation"
stack:
  [
    ".NET 10",
    "ASP.NET Core",
    "SignalR",
    "Redis",
    "PostgreSQL",
    "Dapper",
    "EF Core",
    "React",
    "Docker",
    "Python",
  ]
repo: "https://github.com/ezpectus/AI-Log-Observability-MVP"
order: 2
tagline: "Real-time log ingestion, metrics aggregation and AI-driven remediation — end to end."
metric: "Lock-free aggregation · SHA256 dedup · auto-patching"
commits: 24
diagram: "logs"
---

## Problem

Logs are cheap to write and expensive to reason about. At volume, the questions that matter — is this new, is it getting worse, what do I patch — drown in throughput. This platform answers them in real time.

## Architecture

An ingestion pipeline backed by Redis handles deduplication (SHA256 content hashing) before anything hits storage. Metrics are aggregated lock-free using concurrent collections — no locks on the aggregation hot path. SignalR streams everything to live dashboards, and an AI diagnostics layer turns anomalies into candidate patches automatically.

## Key decisions

- **SHA256 deduplication** at ingestion — identical events cost nothing twice.
- **Lock-free metrics aggregation** via concurrent collections — correctness without contention.
- **AI-driven diagnostics with automated patch generation** — the system doesn't just flag an anomaly, it proposes the fix.
- **Dockerized end to end** — the whole platform, from ingestion to dashboard, comes up with one command.

## What it proves

Backend depth on .NET: concurrent data structures, Redis pipeline design, real-time transport with SignalR, and integrating an AI layer as a reliable system component rather than a demo feature.
