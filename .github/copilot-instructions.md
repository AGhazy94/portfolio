# GitHub Copilot Instructions

> Applies automatically to Copilot chat in this workspace.

**[AGENTS.md](../AGENTS.md) is the source of truth** for coding behaviour and constraints — shared by
Claude Code, Codex, Cursor and Copilot — and wins on any conflict. Read it before your first reply.

The rules below are always on and non-negotiable — follow the links and read them in full.
Reference docs are listed in the Rule Index at the bottom of AGENTS.md.

- Searching — [ripgrep, never `grep -r`](../AGENTS.md#searching--ripgrep-never-grep--r)
- Editing — [Edit/Write by default](../AGENTS.md#editing-files--editwrite-by-default). Never edit
  source through the shell: no `sed -i`, no heredoc rewrites, no throwaway scripts.
