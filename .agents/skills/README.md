# `.agents/skills/`

Agent skills owned by the repo rather than by any one tool.

## rundown

**Do not edit `rundown/SKILL.md` in place** — it is upstream verbatim from
[alexgreensh/attention-span](https://github.com/alexgreensh/attention-span/tree/main/skills/rundown);
re-sync it per [.agents/output-styles/README.md](../output-styles/README.md).

`.claude/skills/rundown` is a symlink here, so Claude Code discovers it as `/rundown`. It exists for
surfaces with no output style and for sessions where the style was switched off.
`disable-model-invocation: true`, so it costs nothing until someone types it.
