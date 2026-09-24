# Portfolio Guide

Primary instruction source for every agent here (Claude Code, Codex, Copilot, Cursor). It gives
directions; the code holds the specifics. When a rule names a file, read that file.

**This file is always on.** Everything in it applies from turn 1, to every task, without being
asked for. Reference detail lives in [.agents/rules/](.agents/rules/README.md) — the **Rule Index**
at the bottom lists it.

## Rule Priority

On conflict: security and correctness > this file > existing patterns in the touched area.

## Searching — ripgrep, never `grep -r`

<!-- always-on -->

- **Text and filenames** → `rg` (`rg --files -g '<glob>'` to find by name). `rg`'s `-r` means
  `--replace`, not recursive — it silently mangles output.
- **Symbols** (definition, callers, references, rename) → serena/LSP: `find_symbol`,
  `find_declaration`, `find_referencing_symbols`, `get_symbols_overview`, `get_diagnostics_for_file`.
  The `typescript` server indexes `.ts` files only — `.astro` components are text to it, so use `rg`
  for them and say so before claiming "nothing else references this".
- **Load the semantic tools before the session's first symbol lookup, and wait for them.** "Still
  connecting" is the normal start state, never a reason to fall back to `rg`.
- **Fine as-is, not blocked:** `… | rg foo`, `git log --grep=`, `find -type d`. Enforced in Claude
  Code by [.claude/hooks/no-recursive-grep.py](.claude/hooks/no-recursive-grep.py); other agents are
  on the honour system. **A missing `rg` makes the hook stop blocking.**

## Editing Files — Edit/Write by default

<!-- always-on -->

- Use the editor's own edit tools. **Never edit a file through the shell**: no `sed -i`, no heredoc
  rewrites, no throwaway scripts. A mis-aimed shell edit exits `0` and renders no diff.
- Shell is still right for moves, git, running commands and processing binary assets (screenshots
  through `sharp`).

## Response Style — Rundown (always on)

<!-- always-on -->

On from turn 1 for every agent, never announced — [Attention Span](https://github.com/alexgreensh/attention-span)'s
Rundown style, body verbatim between the markers at the end of this file. Claude Code loads it as an
output style and Cursor and Copilot inline it, so only Codex needs the block. Also installed as
`/rundown`. Re-sync per [.agents/output-styles/README.md](.agents/output-styles/README.md); do not
edit between the markers.

**Subagents inherit nothing.** Open every Agent-tool prompt with:

> Answer in Rundown style: open with a standalone **TL;DR:** line, show state as a ✅/🟡/⬜/❔
> checklist, put choices under **Your move:** as a numbered list, flag any blocker on its own 🔴
> line, and never invent a status. Deliverables ship bare.

## Code Comments — one line, and only the why

Comment only when the code cannot speak for itself: one short line stating the why, never the what.
No narrative, no restating the code, no section banners. Longer reasoning belongs in the PR.

## Non-Negotiable Rules

- No new dependencies without explicit approval.
- **Content lives in [src/data/profile.ts](src/data/profile.ts)** — copy, experience, projects,
  About, and interface strings and labels in `ui`. Components render it; never hard-code copy in
  markup. `about` and `ui.footer` use `[text](url)` and `**text**`, parsed by
  [src/lib/inline.ts](src/lib/inline.ts) for both the page and `llms.txt`.
- **Every page renders through [src/layouts/Layout.astro](src/layouts/Layout.astro)**, which owns
  the title, description, canonical, OG/Twitter tags, icons and JSON-LD. No ad-hoc meta tags in a
  page.
- Absolute URLs come from `Astro.site`, never a hard-coded domain.
- **Generated files stay generated.** `/og.png`, the favicons, `site.webmanifest`, `robots.txt` and
  `llms.txt` are endpoints in `src/pages/`; change the data or
  [src/lib/graphics.ts](src/lib/graphics.ts), never drop a static copy into `public/`.
- Static output only — no adapter, no SSR, no UI-framework islands. Interactivity is a small
  `<script>` in the component that needs it.
- Icons go through [src/components/Icon.astro](src/components/Icon.astro) (Iconify JSON sets);
  never ship a raw `.svg`. Images go through `astro:assets` from `src/assets/`; `public/` is for
  files served verbatim (the résumé PDF).
- **Colours are pinned.** Tailwind v4 ships OKLCH palettes, so
  [src/styles/global.css](src/styles/global.css) pins the sRGB hex values the design uses. Muted
  text is `text-muted` (WCAG AA), never `text-slate-500` (3.75:1 on the page background).
- **Tailwind v4 renamed the bare utilities.** v3 `rounded` is v4 `rounded-sm`, v3 `backdrop-blur`
  is v4 `backdrop-blur-sm`, and the drop-shadow scale changed — use `card-lift`. The important
  modifier is a suffix: `opacity-100!`.
- **External links** get `target="_blank" rel="noreferrer noopener"` and a visually hidden
  ` (opens in a new tab)` span inside the link — never an `aria-label` that replaces the visible
  text.
- Keep changes minimal; avoid unrelated refactors.

## Project Context

- Stack: Astro 7 static output, Tailwind CSS v4 via `@tailwindcss/vite`, TypeScript strict, Inter
  via the Astro Fonts API (Fontsource), `@astrojs/sitemap`, satori + sharp for generated images.
  Deployed on Netlify ([netlify.toml](netlify.toml)).
- Node comes from [.nvmrc](.nvmrc); `engines` sets the `>=22.12.0` floor.
- **This is v2 — a fresh start.** New design and new layout, built with the `ui-ux-pro-max` skill
  in [.claude/skills/](.claude/skills/). The shared design is the reference; nothing is carried over
  from v1 unless the user asks.
- **v1 is frozen** on the `v1` branch and served at `v1.ahmed-ghazy.com` (noindex). Its
  Brittany Chiang-inspired layout, geometry and footer credit are v1 rules only. Do not port them
  here, and never commit v2 work to `v1`.
- `dev` → production at `ahmed-ghazy.com`.

## Dev Server

- `npx astro dev --background` (port 4321); manage it with `astro dev stop`, `status` and `logs`.
- In the Claude desktop app, `preview_start` can keep reading launch entries from the project the
  session started in. If `portfolio` is not found, start the server as above and open
  `http://localhost:4321` with `preview_start` `{url}`.
- Headless Chrome clamps windows narrower than ~500px — verify mobile in the browser pane's mobile
  preset, not a headless screenshot.

## Execution Workflow

1. `npm run validate` — `astro check` and `prettier --check`. Zero errors.
2. `npm run build` — must pass; it renders every endpoint (OG image, icons, `llms.txt`).
3. Touched the head, structured data, robots or sitemap → read [seo](.agents/rules/seo.md) and
   re-check the built `dist/index.html`.
4. Visual change → verify at 1440×900 and 375px.

## Review Bias

Prioritize correctness, regressions, accessibility, SEO and performance over style.

## Rule Index

Nothing attaches these — read the one your task lands in.

| Doc                         | Read it when                                                            |
| --------------------------- | ----------------------------------------------------------------------- |
| [seo](.agents/rules/seo.md) | head tags, JSON-LD, sitemap, robots, `llms.txt`, OG image, deploy flags |

Astro docs: [routing](https://docs.astro.build/en/guides/routing/),
[components](https://docs.astro.build/en/basics/astro-components/),
[content collections](https://docs.astro.build/en/guides/content-collections/),
[styling and Tailwind](https://docs.astro.build/en/guides/styling/).

Rundown body — skip it if your surface already loaded the style.

<!-- prettier-ignore-start -->
<!-- attention-span:start -->
<!-- attention-span v0.8 · check for updates: https://github.com/alexgreensh/attention-span -->
The reader is a human skimming for what changed and what's blocked, not an LLM reading every line. Their attention runs out fast; a blocker buried in a wall of text is a blocker they miss, same as if you never reported it. Two failures, both real: drop a live status or risk, or bury it where they won't reach it. Lead with the takeaway, show state at a glance, make the choices obvious.

## Rules

- Open with **TL;DR:** one line carrying the whole answer.
- **The TL;DR must stand alone.** A reader who reads only the TL;DR gets the outcome and any blocker. If the one line misses the point, rewrite it, don't rely on the rows below.
- Show state as a checklist: ✅ done, 🟡 in progress, ⬜ not started, ❔ unknown. One item per line, bold the subject, then a short clause.
- Group next choices under **Your move:** as a numbered list (**1.**, **2.**, **3.**), each on its own line with one leading emoji and a short label, so the reader can pick by number.
- **Deliverable: give it clean.** Asked to write the actual message, email, or note? Output only it, no framing before or after.
- **Keep every load-bearing item; cut only filler.** Brevity trims detail, never a real status, risk, or blocker. If a reader needs it to act, it stays on the board.
- **Asked to go deep ("really explain", "why did this happen")? Brevity is off for that reply.** Drop the board format if it doesn't fit, give the full reasoning, every number and condition. A depth request wants the whole picture, not a status line.
- **Numbers, thresholds, and scoped conditions are load-bearing.** State them exact. Never widen "only under X" to "all", never drop the number that makes a status actionable, never flatten a two-sided fact to one side. A rounded-off status is a wrong status.
- Short lines, one idea each. No walls of text, no padding, no repetition. Any prose block is blank-line-separated, never one unbroken paragraph.
- Plain words. Tag an unavoidable term in five words or fewer.
- Never invent status. Report only items and details you were given; if a state is unknown, mark it ❔ and say what would resolve it. A made-up checklist row is worse than a missing one.
- One emoji per line at most. Emoji marks structure, never decorates.
- Flag a blocker or risk in its own 🔴 line.
- End with a clear next action or a pick-one.
<!-- attention-span:end -->
<!-- prettier-ignore-end -->
