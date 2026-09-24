# Design System Master File — Portfolio v2

> **LOGIC:** When building a section, first check `design-system/portfolio-v2/pages/<page>.md`. If it exists,
> its rules override this file. Otherwise follow this file.
>
> **Precedence:** AGENTS.md and the Phase 1 decisions below > the agreed design (`Ahmed Ghazy - Story.html`) >
> the skill's generated output. Where the skill disagreed, the design won; see
> [Overridden Skill Output](#overridden-skill-output).

---

**Project:** Portfolio v2 · **Stack:** Astro 7 static, Tailwind CSS v4, vanilla `<script>` + GSAP
**Generated:** 2026-09-24 by `search.py … --design-system --stack astro --variance 4 --motion 3 --density 3`,
then reconciled with the design by hand
**Design Dials:** Variance 4/10 (balanced, centred hero) · Motion 3/10 (subtle) · Density 3/10 (spacious)
**Style:** Editorial minimalism: Swiss-style restraint with a display serif. Monochrome with a single blue
accent, flat surfaces and no shadows.

---

## Phase 1 Decisions

| #    | Decision                                                                                                                           |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Keep and refine the design. No full redesign.                                                                                      |
| 2    | Section order: Hero → Projects → Experience → About → Contact → Footer. _(Projects moved up in the Phase 4 review.)_               |
| 3    | Hero role line: "Full-Stack Engineer (frontend-heavy)", then "Senior Full-Stack Engineer at Smart Bricks".                         |
| 4    | Hero shows availability ("Open to full-time roles and contract work") and location.                                                |
| 5    | ~~Proof strip~~ Removed in the Phase 4 review. Still: no invented numbers anywhere in the copy.                                    |
| 6    | Experience summaries are rewritten in `profile.ts` as 1–4 bullets that say what was built. _(Phase 4 dropped unverified numbers.)_ |
| 7    | The 112px start-year numeral is dropped; the date range stays in the meta line. _(A Claude pick; no recommendation was given.)_    |
| 8    | Keep the statement pull quote and cut the matching first sentence from About.                                                      |
| 9–11 | Cut Side projects. No testimonials. No writing section.                                                                            |
| 12   | The form keeps three fields: name, email, message. _(A Claude pick; no recommendation was given.)_                                 |
| 13   | No-JS success goes to a custom `/thanks/` page rendered through Layout.astro, `noindex`.                                           |
| 14   | Theme follows `prefers-color-scheme` and remembers the visitor's choice, with no flash on load.                                    |
| 15   | Keep the blue accent.                                                                                                              |
| 16   | Instrument Serif + Geist, both on Fontsource (checked 2026-09-24), loaded with the Astro Fonts API.                                |

---

## Colour Tokens

Pinned sRGB hex in `src/styles/global.css`. Components use the tokens, never raw hex. ⚠ marks a value
changed from the design to pass WCAG AA.

### Page

| Token               | Light                          | Dark                      | Use                                                             |
| ------------------- | ------------------------------ | ------------------------- | --------------------------------------------------------------- |
| `--color-bg`        | `#fbfbfa`                      | `#0b0b0b`                 | Page background                                                 |
| `--color-header`    | `rgb(251 251 250 / 0.82)`      | `rgb(11 11 11 / 0.82)`    | Sticky header, with `backdrop-filter: saturate(1.8) blur(16px)` |
| `--color-surface`   | `#f0f0ee`                      | `#161616`                 | Project cards                                                   |
| `--color-surface-2` | `#ececea`                      | `#1f1f1f`                 | Theme toggle, chips                                             |
| `--color-fg`        | `#111111`                      | `#f3f3f1`                 | Headings, strong text, primary button background                |
| `--color-body`      | `#3a3a3c`                      | `#c7c7cc`                 | Paragraphs                                                      |
| `--color-muted`     | ⚠ `#6a6a6f` (design `#6e6e73`) | `#98989d`                 | Meta, tags, nav, labels                                         |
| `--color-accent`    | `#0066cc`                      | `#4aa3ff`                 | Links, focus ring                                               |
| `--color-divider`   | `#e1e1de`                      | `#262626`                 | Row separators (decorative)                                     |
| `--color-hairline`  | `rgb(0 0 0 / 0.06)`            | `rgb(255 255 255 / 0.08)` | Header bottom border                                            |
| `--color-scrim`     | `rgb(0 0 0 / 0.6)`             | `rgb(0 0 0 / 0.6)`        | Résumé dialog backdrop                                          |

### Inverse (contact card)

The contact card uses the opposite theme: dark in light mode, light in dark mode. In code, the `inverse` utility
redefines `surface`, `fg`, `body`, `muted` and `accent` inside the card, and `field`, `field-border`, `error` and
`success` are their own tokens. The `inv-*` names below are the spec's labels, not CSS variables.

| Token                     | Light mode (dark card)         | Dark mode (light card)         | Use                                                  |
| ------------------------- | ------------------------------ | ------------------------------ | ---------------------------------------------------- |
| `--color-inv-bg`          | `#111111`                      | `#f3f3f1`                      | Card                                                 |
| `--color-inv-fg`          | `#f3f3f1`                      | `#111111`                      | Heading, submit button background                    |
| `--color-inv-body`        | `#c7c7cc`                      | `#3a3a3c`                      | Paragraph, labels                                    |
| `--color-inv-field`       | `#1c1c1c`                      | `#ffffff`                      | Input background                                     |
| `--color-inv-border`      | ⚠ `#686868` (design `#333333`) | ⚠ `#8c8c8c` (design `#d9d9d6`) | Input border                                         |
| `--color-inv-placeholder` | ⚠ `#98989d` (design `#757575`) | `#6a6a6f`                      | Placeholder                                          |
| `--color-inv-accent`      | `#4aa3ff`                      | `#0066cc`                      | Focus ring, links                                    |
| `--color-inv-error`       | `#ff7a70`                      | `#b42318`                      | Field error text and icon _(new; not in the design)_ |
| `--color-inv-success`     | `#5fd38d`                      | `#157a36`                      | Success icon _(new; not in the design)_              |

### Measured contrast (WCAG 2.2)

| Pair                                                     | Ratio         | Needs |
| -------------------------------------------------------- | ------------- | ----- |
| `--color-body` on bg: light / dark                       | 10.96 / 11.69 | 4.5   |
| `--color-muted` on surface (light) `#6a6a6f`/`#f0f0ee`   | 4.71          | 4.5   |
| `--color-muted` on surface-2 (light) `#6a6a6f`/`#ececea` | 4.55          | 4.5   |
| `--color-muted` on surface (dark) `#98989d`/`#161616`    | 6.30          | 4.5   |
| `--color-accent` on surface: light / dark                | 4.88 / 6.87   | 4.5   |
| Input border `#686868`/`#111111`, `#686868`/`#1c1c1c`    | 3.39 / 3.06   | 3     |
| Input border `#8c8c8c`/`#f3f3f1`, `#8c8c8c`/`#ffffff`    | 3.03 / 3.36   | 3     |
| Placeholder `#98989d`/`#1c1c1c`                          | 5.93          | 4.5   |
| Error `#ff7a70`/`#1c1c1c`, `#b42318`/`#ffffff`           | 6.71 / 6.57   | 4.5   |
| Success `#5fd38d`/`#111111`, `#157a36`/`#f3f3f1`         | 10.06 / 4.89  | 4.5   |

---

## Typography

Loaded through the Astro Fonts API with `fontProviders.fontsource()`, the same way Inter is today. Both fonts
are OFL-1.1 and use the latin subset.

| Role      | Family           | Weights                        | CSS variable     | Fallback              |
| --------- | ---------------- | ------------------------------ | ---------------- | --------------------- |
| Display   | Instrument Serif | 400 (normal; italic available) | `--font-display` | Georgia, serif        |
| UI / body | Geist (variable) | 400, 500, 600                  | `--font-sans`    | system-ui, sans-serif |

The design sizes type with `cqi` (container inline units). The page wrapper is an inline-size container, so
the clamps below work as written.

| Style                   | Font         | Size                        | Line height | Tracking | Colour               |
| ----------------------- | ------------ | --------------------------- | ----------- | -------- | -------------------- |
| Hero name (h1)          | Display      | `clamp(64px, 13cqi, 156px)` | 0.92        | -0.02em  | fg                   |
| Contact heading (h2)    | Display      | `clamp(44px, 7cqi, 84px)`   | 1           | -0.01em  | inv-fg               |
| Section heading (h2)    | Display      | `clamp(44px, 6.5cqi, 76px)` | 1           | -0.01em  | fg                   |
| Statement               | Display      | `clamp(34px, 5.6cqi, 68px)` | 1.06        | -0.01em  | fg, max-width 22ch   |
| Company (h3)            | Display      | `clamp(32px, 3.8cqi, 42px)` | 1.02        | 0        | fg                   |
| Project (h3)            | Display      | 34px                        | 1.05        | 0        | fg                   |
| Tagline                 | Sans 400     | `clamp(19px, 2.2cqi, 24px)` | 1.4         | 0        | body, max-width 38ch |
| About body              | Sans 400     | 17px                        | 1.6         | 0        | body, max-width 62ch |
| Experience body         | Sans 400     | 16px                        | 1.65        | 0        | body                 |
| Role                    | Sans 500     | 16px                        | 1.5         | 0        | fg                   |
| Project body            | Sans 400     | 15px                        | 1.6         | 0        | body                 |
| Button / CTA link       | Sans 500     | 15px                        | 1           | 0        | per component        |
| Wordmark                | Sans 600     | 14px                        | 1           | 0        | fg                   |
| Meta, tags, nav, footer | Sans 400/500 | 13px                        | 1.6         | 0        | muted                |

- `text-wrap: balance` on the display headings and the statement.
- Tabular figures (`font-variant-numeric: tabular-nums`) on date ranges.
- Body text never goes below 16px on mobile, except meta and tags at 13px.

---

## Layout & Spacing

- **Container:** `max-width: 1080px`, centred. Gutter `clamp(20px, 5cqi, 48px)`.
- **Hero padding:** `clamp(48px, 6cqi, 88px)` top, `clamp(40px, 4cqi, 64px)` bottom, with the gutter at the
  sides. Tightened in the Phase 4 review so the Projects heading shows at 1440×900 (top at 827px).
- **Section rhythm:** `clamp(80px, 12cqi, 160px)` bottom. Projects, right after the hero, starts with
  `clamp(40px, 4cqi, 64px)` top; later sections rely on the previous section's bottom padding.
- **Experience row:** `clamp(28px, 4cqi, 44px)` vertical padding, with a divider between rows.
- **Contact card padding:** `clamp(28px, 7cqi, 80px)` vertical, `clamp(20px, 6cqi, 72px)` horizontal.
- **Grids:** projects are 2 columns from 768px and 1 below, gap `clamp(14px, 3cqi, 28px)`. About is one
  column at 62ch, replacing the design's 3 columns, which left an orphan paragraph.
- **Spacing scale (Density 3):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96px. Use only these for fixed gaps.
- **Breakpoints to verify:** 375, 768, 1024, 1440px. No horizontal scroll at 375.

### Radius and elevation

| Token            | Value | Use                      |
| ---------------- | ----- | ------------------------ |
| `--radius-pill`  | 980px | Buttons                  |
| `--radius-card`  | 28px  | Project cards            |
| `--radius-panel` | 32px  | Contact card             |
| `--radius-media` | 18px  | Screenshots inside cards |
| `--radius-field` | 12px  | Inputs, textarea         |
| `--radius-sm`    | 8px   | Small chips              |

Flat design: **no box-shadows**. Surfaces separate by colour only.

---

## Components

- **Header:** sticky, `--color-header` with blur and a hairline bottom border. Wordmark on the left, then
  Projects · Work · About · Contact and the theme toggle on the right; Contact is hidden below 640px so the row
  fits at 375px (the hero's "Get in touch" covers it). The link for the section in view gets `aria-current="location"` and fg colour. Every link's hit area is at least 44×44px on touch (padding, not
  font size). The toggle is a 44×44px hit area around the 28px visual, a `<button>` with `aria-pressed` and a
  label taken from `ui`.
- **Primary button:** a pill with fg background and bg text, padding 13px 26px, 15px/500. Hover is
  `opacity: .85` over 200ms.
- **Text CTA / link:** accent colour, 15px/500, with a trailing `›` hidden from screen readers. Hover is
  opacity 200ms. Inline prose links are underlined.
- **Hero:** 88px round portrait, h1 name, the role line, the tagline, an availability and location meta
  line, then the primary button ("Get in touch" → `#contact`) and a text link ("View résumé ›"), the
  availability line, and LinkedIn and GitHub as 13px muted underlined links. No proof strip (removed in the
  Phase 4 review).
- **Résumé dialog:** from 768px, "View résumé" and "Full résumé" open a native `<dialog>` on `--color-surface`
  (radius 32px, scrim `--color-scrim`) holding an eyebrow, the name, a close button, "Download PDF" and
  "Open in a new tab", and the PDF in an iframe that loads on first open. Below 768px, and without JS, the
  links open the PDF in a new tab, because phone browsers can't render a PDF in an iframe.
- **Experience row:** two columns from 768px (2fr / 3fr). The left column holds the date range and note, the
  company as h3 (linked when `href` is set) and the role. The right column holds a one-line summary, 3–4
  bullets, then tags as 13px muted text joined by commas.
- **Project card:** the h3 link stretches over the whole card with `::after`, so the card is one hit area
  while the link name stays short. Background `--color-surface`, radius 28px. It is text-first: the client's
  logo small at the top left (`--color-fg`, 24px tall), then a kind label ending "· Client work through
  caisy", the h3, the summary (16px on phones, 15px from 768px), tags and "Visit site ›". The logos live in `src/assets/logos.json` (Iconify format, one colour) and render
  through `Icon.astro`, hidden from screen readers because the h3 repeats the name. They replaced the
  homepage screenshots in the Phase 4 review.
- **About:** h2, the statement, then a 2fr / 3fr grid: a facts list (education, languages) and the
  paragraphs at 62ch. Hover is `translateY(-4px)` over 300ms (transform only). External-link
  rules come from AGENTS.md.
- **Focus:** `outline: 2px solid var(--color-accent); outline-offset: 3px` on every interactive element.
  Inside the contact card it is `--color-inv-accent`. Never `outline: none` without this replacement.

### Contact form

- **Netlify:** `name="contact"`, `method="POST"`, `action="/thanks/"`, `data-netlify="true"`,
  `netlify-honeypot="bot-field"`. Hidden fields: `form-name=contact`, and `subject` with `data-remove-prefix`
  set to "New message from %{formName}". The honeypot is a labelled field, visually hidden and
  `tabindex="-1"`.
- **Fields:** Name (`autocomplete="name"`), Email (`type="email"`, `name="email"`, `autocomplete="email"`),
  Message (textarea, `minlength`). All are `required`. Visible labels sit above the fields, and placeholders
  only show examples. Fields are at least 48px tall with 16px text, so iOS doesn't zoom.
- **No JS:** the browser's built-in validation, then a POST to Netlify and a redirect to `/thanks/`.
- **With JS:** set `novalidate`, check each field when it loses focus and again on submit, then submit with
  `fetch` (URL-encoded body).
  - **Invalid field:** `aria-invalid="true"`, with the error text below it (icon plus text, linked through
    `aria-describedby`). After a failed submit, focus moves to the first invalid field.
  - **Submitting:** the button is disabled, reads "Sending…" and gets `aria-busy="true"`. Fields become
    read-only.
  - **Success:** a status panel replaces the form, with `role="status"`, a heading focused through
    `tabindex="-1"`, the visitor's email echoed back, and a "Send another message" button.
  - **Error:** the entered values stay. An inline `role="alert"` block above the button gives the cause, a
    Retry, and a mailto fallback to `profile.email`.
- **Copy:** every label, placeholder and message comes from `profile.ts` `ui.contact`.

---

## Motion (GSAP)

GSAP and ScrollTrigger load through `src/lib/with-motion.ts`: skipped entirely under reduced motion, and
otherwise imported after `load` and an idle callback, so they never delay LCP. Lighthouse scored 100 with and
without the GSAP chunk (LCP 1.7s against 1.6–1.7s). Only transform and opacity animate. Everything runs
inside `gsap.matchMedia()`. Content is fully visible without JS, because initial states are only set by JS.

| Effect                | Spec                                                                                                                                                                                                                                                                                                                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portrait zoom         | `scale` 1.12 → 1 as the portrait crosses the viewport (`start: 'top bottom'`, `end: 'bottom top'`, `scrub: 0.5` so the late load eases in). No pin.                                                                                                                                                                                                            |
| Statement word reveal | Words are split in markup at build time (`<span>` per word, one text run for screen readers). They dim to 0.2 only when the statement is 200px from the viewport, so no dimmed text exists at load, then animate to 1 (0.6s, `power1.out`, stagger 0.07s) once at `start: 'top 80%'`. 0.2 is up from the design's 0.14, which was below the skill's 0.2 floor. |
| Hover and state       | CSS transitions, 200ms for opacity and 300ms for transform. The theme switch transitions colour over 300ms.                                                                                                                                                                                                                                                    |
| Micro-interactions    | CSS only, `motion-safe`. Text-link `›` slides 3px on hover; pill buttons press to `scale(0.97)`; a 1px nav underline grows from the left (`scaleX`, 300ms) on hover and on the current section; the theme icon turns 180° in dark (500ms); the dialog ✕ turns 90° on hover.                                                                                    |
| Overlay scrollbar     | On `pointer: fine` the native page scrollbar is hidden and `ScrollBar.astro` draws a 6px `--color-muted` thumb (`--color-fg` on hover) that fades in on scroll or edge hover and out 900ms after, is draggable and track-clickable. Locking scroll for the dialog shifts nothing. Touch devices keep their native overlay scrollbars.                          |

- At most 2 animated elements per view, per the skill's "Animate 1-2 key elements per view." Hover and press
  micro-interactions are user-triggered and don't count toward it.
- No scroll-reveal on every section, no pinning, no SplitText.
- Call `ScrollTrigger.refresh()` after fonts load (`document.fonts.ready`).

---

## Accessibility Baseline

- One h1. Every section has an h2, including About, which lacked one in the design.
- `<main>`, a skip link, and `lang` come from Layout.astro.
- Decorative glyphs such as `›` get `aria-hidden="true"`.
- WCAG 2.2 AA: text 4.5:1, UI boundaries 3:1, targets at least 24×24px everywhere and 44×44px for header
  controls on touch.
- Colour never carries meaning alone: form errors pair an icon with text.
- Theme toggle: `aria-pressed` plus a label, no flash of the wrong theme (inline head script, CSP-hashed by
  Astro).

---

## Anti-Patterns (Do NOT Use)

- ❌ Low-contrast text, and `text-slate-*` defaults. Use the tokens.
- ❌ Placeholder-only labels.
- ❌ Fake success states, or success without a live region.
- ❌ Shadows or gradients (flat design).
- ❌ Motion on more than 2 elements per view, or animating layout properties.
- ❌ Emoji as icons. Icons go through `Icon.astro` (Iconify).
- ❌ Placeholder or lorem content in shipped sections.
- ❌ Hard-coded copy in components. Copy lives in `profile.ts`.

---

## Overridden Skill Output

What `--design-system` returned, and which side won.

| Area        | Skill said                                                                      | Agreed design (wins)                                          | Why                                                                  |
| ----------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Category    | Academic Journal / Scholarly Publishing                                         | Developer portfolio                                           | The query words "editorial serif" pulled it to publishing.           |
| Pattern     | Newsletter / Content First; hero inline form, sticky header form                | Hero → Projects → Experience → About → Contact                | A recruiter audience needs work evidence, not a subscribe flow.      |
| Palette     | Navy `#1E3A5F`, gold CTA `#B45309`, slate bg `#F8FAFC`                          | Warm monochrome with one blue accent (tables above)           | The design's palette; only the AA fixes marked ⚠ changed.            |
| Fonts       | Playfair Display + Source Serif 4 (+ JetBrains Mono) via Google Fonts `@import` | Instrument Serif + Geist via the Astro Fonts API              | Design choice, no external font origin, and the CSP stays unchanged. |
| Shadows     | 4-level shadow scale; cards use `--shadow-md`                                   | None                                                          | The design is flat.                                                  |
| Radius      | 8px buttons and inputs, 12px cards                                              | Pill buttons, 28px cards, 12px fields                         | Design values.                                                       |
| Buttons     | Gold primary, navy outlined secondary, `translateY(-1px)` hover                 | fg pill primary, accent text link as secondary, opacity hover | Design values.                                                       |
| Input focus | `outline: none` + 3px tinted shadow                                             | 2px accent outline, 3px offset                                | Visible 3:1 focus, and the skill's own "Invisible focus states" ban. |
| Grid        | 12-column grid, 1rem gap                                                        | 1080px container, 1–2 column grids                            | The design's layout.                                                 |
| Motion      | Generic scroll reveal (opacity 0, y 12) on elements                             | Only the design's 2 effects                                   | Keeps motion to 2 per view.                                          |
| Spacing     | 24–96px Density 3 table                                                         | Design clamps, snapped to the scale above                     | The design's fluid values.                                           |
| Transitions | `all 200ms`                                                                     | Named properties only (opacity, transform, colour)            | `all` can animate layout.                                            |

**Kept from the skill:** the Density 3 spacing scale, reduced-motion handling, ScrollTrigger registration
notes, the no-JS fallback rule, the anti-patterns, and the checklist below.

---

## Pre-Delivery Checklist

- [ ] No emojis as icons. All icons from one Iconify set through `Icon.astro`.
- [ ] `cursor: pointer` on every clickable element. Hover transitions 150–300ms on named properties.
- [ ] Text contrast 4.5:1 and UI boundaries 3:1, in both themes and inside the contact card.
- [ ] Visible focus on every control. Tab order matches visual order. Focus is not hidden by the sticky header
      (`scroll-margin-top` on sections).
- [ ] `prefers-reduced-motion` renders the final state with no animation.
- [ ] Page is readable and the form works with JS disabled.
- [ ] Form: labels, inline errors, submitting, success and error states all checked, with screen-reader
      announcements.
- [ ] Responsive at 375, 768, 1024 and 1440px. No horizontal scroll. Landscape phone is readable.
- [ ] Images through `astro:assets` with width and height set. CLS < 0.1.
- [ ] Lighthouse performance is no worse than before GSAP.
