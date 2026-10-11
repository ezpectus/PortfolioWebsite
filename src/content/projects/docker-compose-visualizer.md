---
title: "Docker Compose Visualizer"
year: "Jul 2026"
role: "Design & implementation"
stack: ["React", "TypeScript", "React Flow", "Monaco", "YAML AST"]
repo: "https://github.com/ezpectus/docker-compose-visualizer"
order: 5
tagline: "Bidirectional visual editor for docker-compose.yml — the graph and the YAML stay honest."
metric: "AST-preserving edits · comment-safe · multi-file"
commits: 7
diagram: "yamlgraph"
---

## Problem

Every "YAML editor" demo does the same cheat: parse YAML into a model, regenerate the file on every edit — and silently eat your comments, anchors and formatting. A tool that rewrites your file is a tool you can't trust.

## Constraints

Round-trip fidelity was the requirement, not the feature: edit the graph, get your YAML back with comments and formatting intact. Type YAML, watch the graph rebuild. Either direction, no loss.

## Architecture

The editor works on the YAML **AST**, not on a parsed POJO. Graph operations (drag a connection, rename a service) compile down to surgical AST edits — the serializer only touches the nodes that changed. Multi-file compose setups are supported, with Monaco for the text side and React Flow for the graph side.

## Key decisions

- **AST-preserving edits** — comments, anchors and formatting survive every operation.
- **Single source of truth is the document**, not a derived model — so the two views can never disagree.
- **Dark mode, multi-file, comment-safe** — built as a real editor, not a demo.

## What it proves

Compiler-adjacent thinking applied to a UI problem: AST manipulation, bidirectional synchronization, and the discipline to do the hard version of a feature instead of the demo version.
