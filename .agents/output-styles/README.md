# `.agents/output-styles/`

[Attention Span](https://github.com/alexgreensh/attention-span)'s **Rundown** style, installed the
way that repo prescribes: an output style for Claude Code, and the frontmatter-stripped body inlined
into every other agent's rules file. What the rule is lives in
[AGENTS.md](../../AGENTS.md#response-style--rundown-always-on); this file is only wiring. Same setup
as sb-frontend.

## Where it lives

| Agent       | Loaded from                                                                         | How                                                   |
| ----------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Claude Code | `rundown.md` here, via the `.claude/output-styles/rundown.md` symlink               | `"outputStyle": "Rundown"` in `.claude/settings.json` |
| Codex       | [AGENTS.md](../../AGENTS.md), body inlined at the end                               | auto-loaded                                           |
| Cursor      | [.cursor/rules/agents-md.mdc](../../.cursor/rules/agents-md.mdc), body inlined      | `alwaysApply: true`                                   |
| Copilot     | [.github/copilot-instructions.md](../../.github/copilot-instructions.md), inlined | auto-loaded                                           |

On Windows, clone with `git config --global core.symlinks true` (Developer Mode on); otherwise
`.claude/output-styles/rundown.md` and `.claude/skills/rundown` check out as plain text files and
the style and `/rundown` go missing.

**Do not edit any copy in place.** This folder and `.agents/skills/` are in
[.prettierignore](../../.prettierignore); the inlined copies sit between `attention-span` markers
wrapped in `prettier-ignore`. The markers must appear **exactly once per file** — the re-sync below
deletes everything between the first and the last.

## Re-sync

Check the version line against [the latest release](https://github.com/alexgreensh/attention-span/releases),
then:

```bash
curl -sfL https://raw.githubusercontent.com/alexgreensh/attention-span/main/output-styles/rundown.md \
  -o .agents/output-styles/rundown.md
curl -sfL https://raw.githubusercontent.com/alexgreensh/attention-span/main/skills/rundown/SKILL.md \
  -o .agents/skills/rundown/SKILL.md

for f in AGENTS.md .cursor/rules/agents-md.mdc .github/copilot-instructions.md; do
  sed -i.bak '/<!-- attention-span:start -->/,/<!-- prettier-ignore-end -->/d' "$f"
  { printf '<!-- attention-span:start -->\n'
    sed '1,/<!-- body-start -->/d' .agents/output-styles/rundown.md
    printf '<!-- attention-span:end -->\n<!-- prettier-ignore-end -->\n'; } >> "$f"
  rm "$f.bak"
done
```

Each file must end with `<!-- prettier-ignore-start -->` right before the block, which the loop
leaves in place.
