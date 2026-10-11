---
title: "HFT Trading Simulator"
year: "Jun–Sep 2026"
role: "Design & implementation"
stack: ["C++20", "Python", "Rust", "CUDA", "React", "Docker", "Kubernetes"]
repo: "https://github.com/ezpectus/HFT-trading-simulator"
order: 1
tagline: "Educational high-frequency trading simulator — real low-latency engineering, zero real money."
metric: "75+ quant models · 191+ live panels · FIX 4.4"
commits: 1289
diagram: "hft"
---

## Problem

HFT systems are where software engineering meets physics: nanoseconds matter, allocation is a bug, and a cache miss is a design flaw. I wanted to learn that discipline for real — not by reading about it, but by building a simulator that behaves like a production trading stack, without risking a cent.

## Constraints

Educational by definition: zero real money, zero real risk. But the engineering had to be honest — lock-free where a real desk would be lock-free, IPC where real systems use shared memory, and models that a quant would actually recognize.

## Architecture

A C++20 signal engine sits at the core, exchanging data with a Python research layer over shared-memory IPC — the same pattern real trading firms use between strategy and execution. A Rust order executor handles the hot path, CUDA accelerates batch computation, and 191+ React dashboard panels render the whole system live.

## Key decisions

- **Lock-free SPSC ring buffers** with cache-line alignment and branchless programming — no mutexes on the hot path.
- **Signal Engine V3**: HMM regime detection with online Baum-Welch adaptation and Viterbi decoding — sub-millisecond regime switching.
- **75+ quantitative models**: GARCH, Kalman filters, Almgren–Chriss optimal execution, and more — each validated, not stubbed.
- **ONNX ML inference in C++** — trained models run inside the engine, not in a Python sidecar.
- **FIX 4.4 protocol** support — the wire format real markets speak.

## What it proves

Multi-language systems engineering (C++20, Rust, Python, CUDA, TypeScript) with a full CI/CD pipeline across all of them and Kubernetes/Helm deployment. The hard parts — shared memory, lock-free queues, numeric kernels — are real, not simulated.
