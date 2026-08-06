# Human-AI Copilot Framework

**A spec-driven way to work with AI coding agents, so an AI never quietly guesses its way into your product.**

[![License: MIT](https://img.shields.io/badge/license-MIT-22C55E.svg)](LICENSE)
[![Works with Claude Code](https://img.shields.io/badge/works%20with-Claude%20Code-4EDEA3.svg)](https://docs.claude.com/en/docs/claude-code)
[![Version](https://img.shields.io/badge/version-1.3.1-333.svg)](CHANGELOG.md)

*Internal / technical plugin identifier: `spec-vjc-framework`. Same project — see [Installation](#installation) for why the name in the install command doesn't match the repo name.*

---

## The problem this solves

Writing code with an AI agent is trivial now. That's exactly the problem: the agent will happily assume business rules, skip edge cases, and invent plausible-sounding answers instead of asking — and it does all of that with total confidence. You don't find out until you're in front of a customer, a lawyer, or an accessibility audit.

This framework makes an AI coding agent **stop and define what it's building — and why — before it writes a line of code.** It scales how much rigor it demands based on how much is actually at stake, so a weekend prototype and a product with real users in the EU can both go through the same framework without either one carrying the other's overhead.

## Who this is for

- Product managers, founders, and small teams who direct an AI coding agent through conversation — you don't need to write or read code to drive this.
- Anyone shipping more than one project at a time, some disposable and some not, who wants a repeatable way to decide how much process each one deserves.
- **Not for you if:** your organization already has a formal governance/compliance process — this would just duplicate it.

Today it runs inside [Claude Code](https://docs.claude.com/en/docs/claude-code) as an installable plugin. An early adaptation for Google Antigravity also lives in this repo (see [`docs/guia-antigravity.md`](docs/guia-antigravity.md)); other agents are not supported yet.

## What you get, in one paragraph

You describe your project in a short conversation. The framework classifies it along two independent axes — **how much definition it's worth** and **what you're exposing yourself to** — and then only asks for the documentation that classification actually requires: nothing for a private weekend script, a full spec with GDPR and accessibility checks for a product collecting user data in the EU. Every step the AI can't verify against real evidence gets flagged instead of invented, and nothing reaches "done" without either a passing automated check or an explicit human sign-off.

---

## Installation

Human-AI Copilot Framework is not a library you `npm install` into a project — it's a Claude Code plugin that lives outside your codebase and stays available across every project you open.

**1. Install [Claude Code](https://docs.claude.com/en/docs/claude-code)** if you haven't already, and open a terminal in any project folder.

**2. Add the marketplace and install the plugin** — paste this into a Claude Code session:

```
/plugin marketplace add victorjaviercorral/Human-AI-Copilot-Framework-for-Product-Development
/plugin install spec-vjc-framework@spec-vjc-framework
```

> The GitHub repo is named `Human-AI-Copilot-Framework-for-Product-Development`. The plugin's internal identifier — the part after `@` — stays `spec-vjc-framework`; that's the stable name `/plugin install` and `/plugin update` use, and it's independent of what the repo is called.

**3. Confirm it installed.** Type `/` in Claude Code — you should see 15 new commands (`spec-init`, `prd-lite`, `expand`, `specify`, `prototype`, `plan`, `tasks`, `implement`, `go-nogo`, `go-live`, `preflight`, `quality-gate`, `amend`, `sync-check`, `design-system`). Nothing gets copied into your project; the framework stays installed once, available everywhere.

**4. Start your first project.** Inside any project folder, run:

```
/spec-init
```

The framework asks up to 4 questions about what you're building, then creates only the documentation your project's stage and exposure actually call for — a sketch might get one file, a product with EU users gets a full spec, compliance checklists, and a launch gate.

**Keeping it up to date.** After a new version is published, run this in a Claude Code session (then start a **new** session for it to take effect):

```
/plugin marketplace update spec-vjc-framework
/plugin update spec-vjc-framework
```

If you're the one developing the framework itself rather than just using it, see [the two loading modes](#for-framework-developers-plugin-dir-vs-marketplace) below — it changes how updates reach your session.

---

## How it works: two independent questions

Most methodologies have one dial — "lightweight process" vs. "full process" — and that's exactly why they end up over-processing trivial work and under-protecting real users at the same time. This framework asks two separate questions and lets them combine independently:

**1. Stage — how much is this worth defining?**

`Sketch` (hours) → `Prototype` (~1 week) → `MVP` (~4 weeks) → `Product` (ongoing cycles)

**2. Exposure — what are you exposing yourself, or someone else, to?**

`X0` Private, only you → `X1` Public, no accounts → `X2` Users with personal data → `X3` Money, minors, sensitive data, or user-facing AI

A one-day sketch that quietly collects email addresses still has to go through full data-protection discipline. A big internal tool that only you ever open doesn't need a cookie banner or an accessibility audit. Two axes catch both cases; one axis catches neither.

**Two tracks:**
- **Core Track** — always active. Define the minimum, build, validate, decide.
- **Production Track** — switched on with `/go-live` the moment you decide to put something in front of real users: compliance modules, hardening, and a launch verification gate.

## The pipeline

```
CORE TRACK
/spec-init → [/prd-lite] → [/expand] → [/specify + quality gate] → /prototype → [/plan → /tasks] → /implement → /go-nogo

PRODUCTION TRACK
/go-live → hardening → /preflight → GO LIVE → /go-nogo
```

Support commands, usable any time: `/quality-gate`, `/design-system`, `/amend`, `/sync-check`.

Steps in brackets only run once your stage calls for them. A personal tool can be built with two commands; a product with real users runs the full pipeline. The definition phase never eats more than 20% of a stage's time budget, and the whole flow is capped at 8 questions — everything else the framework can't verify gets drafted and marked as a flagged assumption for you to confirm in one batch, not asked about turn by turn.

## Typical paths

| Situation | Stage · Exposure | Path |
|-----------|:---:|--------|
| A personal tool, just for you | Sketch · X0 | `/spec-init` → build |
| Validating an idea before committing | Prototype · X0–X1 | `/spec-init` → `/prd-lite` → `/prototype` → `/go-nogo` |
| A landing page or public write-up | Prototype · X1 | `/spec-init` → `/prototype` → `/implement` → `/preflight` |
| An MVP with real users | MVP · X2 | full pipeline + `/go-live` |

---

## The rules that keep the AI honest

- **Never invent a fact.** If a data point, metric, or source is missing, it gets marked `[PENDING]`. No exceptions.
- **A decision can be proposed — a fact never can.** Anything resolved by choosing rather than by discovering is proposed as `[ASSUMED: decision | reason | risk]`, always reversible by you. That's the line.
- **Evidence over claims.** Code without an executed verification step is treated as if it doesn't exist.
- **No artifact that doesn't change a decision.** Whoever wants a control has to justify it, not the other way around.
- **The 20% rule**, and a hard cap of 8 questions across the entire definition flow.
- **Killing a project on time is a success**, and should take 15 minutes, not a retrospective.
- **Rules must be executable, not prose.** Anything that can't be verified by running something is a recommendation, and gets labeled as one.

This is a short sample. The full set — currently 36 principles, plus refinements — with exactly when each one applies, lives in [`constitution.md`](constitution.md).

---

## Documentation

Everything past this README is written in Spanish, the author's working language — plain Markdown, so translating a page on the fly (ask Claude Code, or paste it into any translator) is a 10-second detour, not a blocker.

| | |
|---|---|
| [`docs/guia-usuario.md`](docs/guia-usuario.md) | **Start here.** Full reference guide + copy-paste starter prompt |
| [`docs/guia-etapa.md`](docs/guia-etapa.md) | Stage axis — Core Track, command by command |
| [`docs/guia-exposicion.md`](docs/guia-exposicion.md) | Exposure axis — Production Track, compliance and launch |
| [`docs/diagramas.md`](docs/diagramas.md) | 10 diagrams: flows, command↔artifact relationships, lifecycles, requirement expansion |
| [`docs/fundamentos.md`](docs/fundamentos.md) | Where each piece comes from — methodologies, sources, applicable standards, and what's original |
| [`docs/modelo.md`](docs/modelo.md) | Activation matrix — what applies, and when |
| [`docs/vault-structure.md`](docs/vault-structure.md) | The project's documentation structure |
| [`docs/obsidian.md`](docs/obsidian.md) | Obsidian integration for a portfolio vault across projects |
| [`constitution.md`](constitution.md) | The full set of principles, with stage/exposure activation rules |
| `commands/` · `agents/` | The 15 commands and the blind quality reviewer |
| `checklists/` | Security, agentic security, privacy/GDPR, accessibility, performance, testing, operations, UX/UI, content/SEO |
| `templates/` | Templates for every artifact the framework produces |
| `design-systems/` · `modules/` | Reusable assets shared across projects |

## For framework developers: `--plugin-dir` vs. marketplace

If you're only *using* the framework, skip this — the marketplace install above is all you need. If you're editing the framework itself (this repo), read on: installed via marketplace, Claude Code keeps **three independent copies** on disk — this repo, a git clone under `~/.claude/plugins/marketplaces/`, and an installed cache under `~/.claude/plugins/cache/` (the one a running session actually executes via `${CLAUDE_PLUGIN_ROOT}`). None of the three sync automatically; a `git push` alone leaves running sessions on old code with no warning.

**Solo development (recommended):** start sessions with `claude --plugin-dir <path-to-this-repo>` instead of via the marketplace. `${CLAUDE_PLUGIN_ROOT}` then points straight at your working copy — no clone, no cache, nothing to desync. On Windows/PowerShell, add this to your `$PROFILE`:

```powershell
function human-ai-copilot {
    & claude --plugin-dir "C:\path\to\Human-AI-Copilot-Framework-for-Product-Development" @args
}
```

**Shared / marketplace install:** required if someone else — or another machine without access to your local clone — needs the framework. After every version-bumping `git push`, run `/plugin marketplace update spec-vjc-framework` and `/plugin update spec-vjc-framework`, then open a **new** session (an already-open one keeps the `${CLAUDE_PLUGIN_ROOT}` it resolved at startup). `scripts/check-plugin-version.ps1`, wired in as a `pre-push` hook, blocks publishing a version where `plugin.json`, `marketplace.json`, and `CHANGELOG.md` disagree — but it doesn't replace running those two commands yourself.

**Before running the framework on a new project, check which version is actually loaded:** inside the session, `echo $CLAUDE_PLUGIN_ROOT` (or `$env:CLAUDE_PLUGIN_ROOT` in PowerShell), then check the `version` field in `<that-path>/.claude-plugin/plugin.json` against the latest entry in [`CHANGELOG.md`](CHANGELOG.md).

---

## Status

v1.3.1 — see [CHANGELOG.md](CHANGELOG.md) for the full history. `/expand` is the newest and least battle-tested stage; its real runs, known weaknesses, and pre-registered predictions are logged in an internal self-evaluation (not published in this repo). The two-layer `/design-system` flow is an externally contributed addition not yet run on a real project. Kanban board integration is deferred; the `tasks.md` format is already compatible.

## License

MIT — see [LICENSE](LICENSE).

---

Built and maintained by [Víctor Javier Corral](https://victorjaviercorral.com).
