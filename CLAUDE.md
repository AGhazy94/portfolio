# CLAUDE.md

> Instructions for Claude Code in this workspace.

**[AGENTS.md](AGENTS.md) is the source of truth** for coding behaviour and constraints — shared by
Claude Code, Codex, Cursor and Copilot — and wins on any conflict. It is imported here, so it is in
context from turn 1:

@AGENTS.md

The rules below are always on and non-negotiable — follow the links and read them in full.

- Searching — [ripgrep, never `grep -r`](AGENTS.md#searching--ripgrep-never-grep--r).
- Editing — [Edit/Write by default](AGENTS.md#editing-files--editwrite-by-default), and never edit
  source through the Bash tool.

Nothing enforces either rule, so both are on you.

Claude Code specifics: symbol _navigation_ goes through the **serena MCP (LSP) server** for `.ts`
files; `.astro` components are text search. Load serena with
`ToolSearch select:mcp__serena__find_symbol,…` before the first lookup. [.mcp.json](.mcp.json) runs
Serena 2.x from git so the repo does not depend on whichever `serena` a machine has installed —
1.x cannot read `.serena/project.yml` (`KeyError: 'languages'`). Approve the project server when
prompted.

## Runtime Verification

- SEO and accessibility checks: build, then read `dist/index.html`; Lighthouse against the dev
  server reports one false failure (the dev toolbar's "Learn more" link) that production does not
  have.
