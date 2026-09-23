# Session defaults (portfolio)

Injected every session. [AGENTS.md](../../AGENTS.md) is the source of truth; CLAUDE.md imports it,
so it is already in context.

Always on, non-negotiable, read them in full:

- Response style — [Rundown](../../AGENTS.md#response-style--rundown-always-on).
  `.claude/settings.json` pins `"outputStyle": "Rundown"`, so the style body is already in this
  session. Always on from turn 1, never announced. `/rundown` reinstates it for one conversation if
  it was switched off. **Subagents inherit nothing** — open every Agent-tool prompt with the Rundown
  preamble quoted in [AGENTS.md](../../AGENTS.md#response-style--rundown-always-on).
- Searching — [ripgrep, never `grep -r`](../../AGENTS.md#searching--ripgrep-never-grep--r).
  `grep -r` and `find -name` are hard-blocked by a `PreToolUse` hook.
- Editing — [Edit/Write by default](../../AGENTS.md#editing-files--editwrite-by-default). Never edit
  source through the Bash tool — no hook catches this.

Content changes go in `src/data/profile.ts`; head, SEO and structured-data changes go through
`src/layouts/Layout.astro` and [.agents/rules/seo.md](../../.agents/rules/seo.md). Finish with
`npm run validate` and `npm run build`.

Dev server: `npx astro dev --background` on port 4321, opened with `preview_start` `{url}` — see
[AGENTS.md](../../AGENTS.md#dev-server).
