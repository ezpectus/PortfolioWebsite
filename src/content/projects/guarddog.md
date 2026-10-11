---
title: "GuardDOG"
year: "Oct 2026"
role: "Design & implementation"
stack: ["Python 3.10+", "Regex", "AST", "LLM APIs"]
repo: "https://github.com/ezpectus/GuardDOG"
order: 7
tagline: "Hybrid repo scanner for the AI-generated-code era — local layers for free, LLM only where it pays."
metric: "17 regex rules · ~15 AST checks · exit-code CI gate"
commits: 13
diagram: "guarddog"
---

## Problem

AI-generated code looks clean: correct syntax, plausible names, green tests. Underneath — a hardcoded password shipped to prod, `print(entered_pass)` in a log path, `verify=False` on a payment request. Linters check style, not semantics. An LLM can see it — but streaming a whole repo into a model on every commit is slow and burns tokens.

## Architecture

GuardDOG sits in between. A local layer — 17 language-agnostic regex rules plus ~15 Python AST checks — catches the obvious instantly and for free. The LLM layer audits only files whose SHA256 changed since the last run, and only when an API key is present. No key → an honest `skipped` in the report; the local layer still runs. No fake-green, ever.

## Key decisions

- **Findings land in the exit code** — a CRITICAL hit fails the build or blocks the commit. It's a gate, not a suggestion.
- **SHA256 change-detection cache** — the expensive layer runs only on what changed.
- **Zero runtime dependencies** — drops into any repo: one command, a `run_all.bat`, a pre-commit hook, or a CI stage.
- **Reports in md/json/html** — human review and machine gates read the same truth.
- **26 tests** covering the rule layers — the scanner itself is tested like production code.

## What it proves

The thesis behind how I work with AI, made into a tool: use the cheap deterministic check everywhere, use the expensive probabilistic check exactly where it earns its tokens — and wire both into the pipeline so it's enforced, not aspirational.
