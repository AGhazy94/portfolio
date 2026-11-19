# Portfolio Guide

Primary instruction source for every agent here (Claude Code, Codex, Copilot, Cursor). It gives
directions; the code holds the specifics. When a rule names a file, read that file.

**This file is always on.** Everything in it applies from turn 1, to every task, without being
asked for.

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
- **Fine as-is:** `… | rg foo`, `git log --grep=`, `find -type d`. Nothing enforces this rule;
  every agent is on the honour system.

## Editing Files — Edit/Write by default

<!-- always-on -->

- Use the editor's own edit tools. **Never edit a file through the shell**: no `sed -i`, no heredoc
  rewrites, no throwaway scripts. A mis-aimed shell edit exits `0` and renders no diff.
- Shell is still right for moves, git, running commands and processing binary assets (screenshots
  through `sharp`).

## Code Comments — one line, and only the why

Comment only when the code cannot speak for itself: one short line stating the why, never the what.
No narrative, no restating the code, no section banners. Longer reasoning belongs in the PR.

## Non-Negotiable Rules

- No new dependencies without explicit approval. Approved so far: GSAP, and
  `@fontsource/space-grotesk` + `@fontsource/geist` + `@fontsource/instrument-serif` (satori needs
  their WOFF files for the OG image and icons), and `knip` (dev only; `npm run knip` finds unused files, exports and dependencies,
  configured in [knip.jsonc](knip.jsonc)), and `@astrojs/markdown-satteri` + `satteri`, pinned to
  the versions Astro installs, for the external-link plugin in
  [src/lib/external-links.mjs](src/lib/external-links.mjs) (new tab, UTM tags on Markdown links).
- **Design source is the 2026-11-19 brand,** written up in the local, git-ignored
  `design-system/portfolio/MASTER.md`; without it, the tokens in
  [src/styles/global.css](src/styles/global.css) are the reference. Reread it before a UI change.
  Where the skill's generic output and the brand design disagree, the design wins.
- **Content lives in two places.** [src/data/profile.ts](src/data/profile.ts) holds the home page
  and every interface string: copy, experience, projects, About, the statement, and `ui` (form
  labels, choices, errors, nav, section and card labels). Components render it; never hard-code copy
  in markup. `about`, `ui.footer.credit`, `ui.contact.intro` and `ui.contact.failure` use
  `[text](url)` and `**text**`, parsed by [src/lib/inline.ts](src/lib/inline.ts) for both the page
  and `llms.txt`. **Long-form pages are Markdown content collections** defined in
  [src/content.config.ts](src/content.config.ts): `src/content/services/` (one buyer situation per
  page), `src/content/work/` (case studies) and `src/content/blog/` (decision articles). Frontmatter
  carries the title, description (160 characters at most, enforced by the schema), dates and `faq`.
  Blog entries also need a `service` reference and may list up to two `relatedArticles`; related
  links come from these references, never publication order, and drafts never appear in them in
  production. Every service page also links the other services. The body is plain Markdown, no raw
  HTML and no code fences that need highlighting (the CSP and
  `syntaxHighlight: false` rule that out). Every claim in them must be one the commit history backs;
  no invented prices, statistics, testimonials or client stories, and no future project written as
  finished. Public copy lists what Ahmed did and does not add "what I didn't build" disclaimers;
  omission is the rule, never a false or implied claim. YAML values holding `: ` need quotes in
  frontmatter. Service pages are laid out from structured frontmatter (`lead`, `fit`, `gets`, `steps`,
  `experience`, `terms`, `faq`) by `ServiceBody.astro`. A `work` entry with `status: draft` builds in
  dev only and is the way to preview a finished site before the work exists. **Pictures** are found by
  file name: `src/assets/content/<services|blog|work>/<id>.png|jpg|webp` (16:9, no text in the image),
  with `imageAlt` in the frontmatter; they feed the hero, cards, JSON-LD and og:image. Briefs live in
  the private `career-ops` repo.
- **Every page renders through [src/layouts/Layout.astro](src/layouts/Layout.astro)**, which owns
  the title, description, canonical, OG/Twitter tags, icons and JSON-LD. No ad-hoc meta tags in a
  page. Collection pages go through [src/layouts/ContentPage.astro](src/layouts/ContentPage.astro),
  which wraps Layout, adds the breadcrumb, FAQ block, contact form and the `BreadcrumbList` and
  `FAQPage` nodes; each route adds its own `Service`, `Article`, `CollectionPage` or `WebPage` node.
- Absolute URLs come from `Astro.site`, never a hard-coded domain.
- **Generated files stay generated.** `/og.png`, the favicons, `robots.txt` and `llms.txt` are
  endpoints in `src/pages/`; change the data or
  [src/lib/graphics.ts](src/lib/graphics.ts), never drop a static copy into `public/`.
- Static output only — no adapter, no SSR, no UI-framework islands. Interactivity is a small
  `<script>` in the component that needs it.
- Icons go through [src/components/Icon.astro](src/components/Icon.astro) (Iconify JSON sets);
  never ship a raw `.svg`. The one exception is the logo: [src/lib/mark.ts](src/lib/mark.ts) draws
  the "AG." mark for the header, favicons, touch icons and OG card from one path. Images go through `astro:assets` from `src/assets/`; `public/` is for
  files served verbatim (the résumé PDF).
- **Brand colours split 60/30/10** (decided 2026-11-19): midnight black `#090A10` is the page (60%),
  electric blue `#2F6BFF` the second colour (30%, as tone and accent: the deep navy Services and
  Contact bands with their blue edge and glow, navy cards, rules, large accent words), sunset orange `#FF7A1A` the loud one (10%: primary buttons, the header
  Contact pill, the hero badge, the active nav line). Orange never carries text or a button on blue
  (1.72:1; the logo's full stop is the one exception), and orange buttons carry midnight text (white
  on orange fails AA).
- **Colours are pinned.** [src/styles/global.css](src/styles/global.css) clears Tailwind's OKLCH
  palettes (`--color-*: initial`) and defines semantic sRGB hex tokens (`bg`, `surface`, `fg`,
  `body`, `muted`, `accent`, `brand`, `band`, `loud`, …). The values live in
  [src/lib/tokens.mjs](src/lib/tokens.mjs) too (satori and the `theme-color` meta read it); change
  both, or `npm test` fails. Use the tokens; there is no `slate`. Muted text is `text-muted` (WCAG
  AA on every surface). Bands use the `band-section` utility (navy `#0F1A3A`, a 2px brand-blue top
  edge, a faint glow): never a bright blue fill behind text, because only pure white passes on it
  and the text loses its hierarchy (2026-11-19 feedback). The contact form sits in a `surface-2`
  panel on the band. Small links use `accent` (`#6D97FF`); the exact brand blue only carries large
  text, rules and fills. Every text pair must pass 4.5:1 and every field border 3:1.
- **One dark scheme, no theme toggle.** `color-scheme: dark` on `<html>`; the old `theme` storage
  key is removed on load. Content illustrations are drawn in the brand palette (midnight, navy
  panels, blue outlines, one orange accent); new ones follow the prompt in the design system.
- **Fonts** load through the Astro Fonts API (Fontsource provider): Space Grotesk for display
  headings, Geist for body and UI, Instrument Serif italic only for the one blue accent word
  (`type-accent`, `profile.offerAccent`). Use Google Fonts directly only when a font isn't on
  Fontsource, and add its origin to the CSP.
- **Motion is GSAP, loaded through [src/lib/with-motion.ts](src/lib/with-motion.ts)**, which skips
  the download under `prefers-reduced-motion` and waits for load and idle so it never delays LCP.
  Animate only `transform` and `opacity`, at most 2 elements per view, and never set a dimmed
  start state on content far below the fold (it fails the contrast audit before anyone sees it).
  The one exception is the phone Experience disclosure, which transitions `grid-template-rows`
  (0fr ↔ 1fr). Never animate `height` itself.
- **Tailwind v4 renamed the bare utilities.** v3 `rounded` is v4 `rounded-sm`, v3 `backdrop-blur`
  is v4 `backdrop-blur-sm`. The design is flat: no shadows; the only gradients are the hero's
  `hero-glow` and the bands' faint top glow.
  The important modifier is a suffix:
  `opacity-100!`.
- **Contact form is Netlify Forms.** Keep `name="contact"`, `data-netlify="true"`, the hidden
  `form-name`, the `netlify-honeypot` field, the `email` input name (it sets Reply-to) and the
  hidden `subject`. It must work without JS (posts to `/thanks/`); with JS it submits with
  `fetch`. The CSP allows `form-action 'self'` only. The optional selects (`project-type`,
  `budget`, `timeline`) come from `ui.contact.choices`; the form renders on the home page and at the
  end of every collection page with identical fields, so Netlify sees one form. A hidden `page`
  field carries the path it was sent from, and the hidden `first-*` fields carry first-touch
  attribution (UTMs, landing path, referring domain) from
  [src/lib/attribution.ts](src/lib/attribution.ts), filled at submit time.
- **Analytics: cookieless for everyone, cookies only with consent.** Netlify's server-side Web
  Analytics counts traffic with no script. Ahrefs Web Analytics (`PUBLIC_AHREFS_ANALYTICS_KEY`,
  production context only) sets no cookies and stores nothing on the device, so
  [src/components/Consent.astro](src/components/Consent.astro) loads it for every visitor, with no
  banner choice; anything that stores data on the device stays behind consent.
  GA4 (`PUBLIC_GA_MEASUREMENT_ID`, production context only in `netlify.toml`) loads through
  [src/components/Consent.astro](src/components/Consent.astro) only after "Accept"; the
  choice lasts 12 months and is asked again when `VERSION` in [src/lib/consent.ts](src/lib/consent.ts)
  is bumped; the first-touch record (localStorage, 90 days, never overwritten by a later campaign) is kept only with
  that consent. Without it, nothing reaches Google and attribution covers only a form sent from the
  entry page. `generate_lead` fires only after Netlify accepts the `fetch`, never on click or on
  `/thanks/`, to both. No form values go to Google or Ahrefs, and the page address they get keeps no query string beyond `utm_*`. Any change here
  updates `/privacy/` (copy in `ui.privacy`) in the same commit.
- **Deploys cost credits.** Each production deploy (a push to `dev`) costs 15 of 300 monthly Netlify
  credits. Test on a PR Deploy Preview, and say so before any push that deploys production.
- **External links** get `target="_blank" rel="noreferrer noopener"` and a visually hidden
  ` (opens in a new tab)` span inside the link — never an `aria-label` that replaces the visible
  text.
- Keep changes minimal; avoid unrelated refactors.

## Project Context

- Page order on `/`: Header → Hero (offer, CTAs) → Projects → Services → Testimonials → Experience
  → About (statement, facts) → Writing → Contact → Footer. One component per section in `src/components/`.
  The hero links to selected work; the résumé remains in Experience. The mobile header keeps Contact visible.
- Audience: clients first (founders, small teams, agencies, Arabic-market brands), recruiters second.
  Positioning (decided 2026-10-14): a generalist freelance full-stack developer who builds web apps
  and AI products (LLM features, agents), builds MVPs and takes over existing apps, TypeScript
  front to back. Arabic/RTL is one service page, not the headline. The hero carries no employer or
  location line. The Senior Frontend résumé variants carry the recruiter positioning; the site does
  not. Python and retrieval (RAG) are not claimed anywhere until a shipped project backs them.
- **This is the 2026-11-19 brand** (midnight, electric blue, sunset orange), built with the
  `ui-ux-pro-max` skill. The design system is the reference; nothing is carried over from earlier
  versions unless the user asks.
- **v1 is frozen** on the `v1` branch and served at `v1.ahmed-ghazy.com` (noindex). Its
  Brittany Chiang-inspired layout, geometry and footer credit are v1 rules only. Do not port them
  here, and never commit later work to `v1`.
- **v2 is frozen** on the `v2` branch (the layout launched 2026-09-24, in its Paper and graphite
  colours from 2026-11-14, live until 2026-11-19) and served at `v2.ahmed-ghazy.com` as a noindex
  archive without analytics. Never commit new work to `v2`.
- "v1" and "v2" name those two archives only, never the current design.
- `dev` → production at `ahmed-ghazy.com`.

## Dev Server

- `npx astro dev --background` (port 4321); manage it with `astro dev stop`, `status` and `logs`.
- In the Claude desktop app, `preview_start` can keep reading launch entries from the project the
  session started in. If `portfolio` is not found, start the server as above and open
  `http://localhost:4321` with `preview_start` `{url}`.
- Headless Chrome clamps windows narrower than ~500px — verify mobile in the browser pane's mobile
  preset, not a headless screenshot.

## Execution Workflow

1. `npm run validate` — `npm test`, `astro check`, `prettier --check` and `knip`. Zero errors.
2. `npm run build` — must pass; it renders every endpoint (OG image, icons, `llms.txt`). Then
   `npm run test:dist` checks the built HTML (form contract, external links, CSP hashes).
3. Touched the head, structured data, robots or sitemap → re-check the built `dist/index.html`.
4. Visual change → verify at 1440×900 and 375px.

## Review Bias

Prioritize correctness, regressions, accessibility, SEO and performance over style.
