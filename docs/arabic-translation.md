# Arabic translation

The site is wired for Arabic at `/ar/`. Two kinds of text get translated:

1. **Interface strings** (home page, header, footer, form, privacy and legal pages): one JSON file,
   `src/i18n/ar.json`.
2. **Long-form pages** (services, case studies, articles): one Markdown file each, saved under
   `src/content/ar/<services|work|blog>/` with the **same file name** as the English one. Translate
   them in any order; an untranslated page keeps linking to the English one.

Arabic stays out of production until `locales.ar.published` is `true` in `src/i18n/locales.mjs`.
Dev (`npx astro dev`) and Netlify deploy previews always show it. Publishing fails the build while
any interface string is missing, so the live Arabic site can never show half-English UI.

## 1. Interface strings

1. Run `npx astro dev --background` and open <http://localhost:4321/i18n/ar.todo.json>. It lists
   every string still to translate (270 on 2026-11-26) as `{ "path": { "en": "…", "ar": "" } }`.
2. Paste **Prompt A** into ChatGPT, then the whole JSON.
3. Save the reply as `src/i18n/ar.json`. Later rounds: the todo file only lists new or changed
   strings; merge ChatGPT's reply into the existing `ar.json` (same keys, add the new ones).
4. Check <http://localhost:4321/ar/>. The build stops with a clear message if a placeholder, link
   or `**bold**` marker went missing.

### Prompt A: interface strings (JSON)

```text
You are a senior Arabic copywriter and localizer for a software developer's portfolio website.
Translate the JSON I paste after this message from English into Arabic.

WHO READS IT
- Founders, small teams, agencies and brands in Saudi Arabia, the UAE, Egypt and the wider Gulf who
  want to hire a freelance developer. Recruiters second.
- The site belongs to Ahmed Ghazy, an Egyptian product engineer, full-stack and AI developer who
  takes over stuck web apps, builds MVPs and adds AI features (LLM chat, agents). He writes in the
  first person singular ("I").

VOICE
- Modern Standard Arabic (فصحى معاصرة) that a Gulf business owner reads easily. No Egyptian dialect,
  no stiff legal or academic Arabic, no literal word-for-word English.
- Short, plain sentences. Confident, warm, direct, like the English. Never add claims, numbers,
  promises or adjectives the English does not have. Never drop a fact the English has.
- Address the reader as "أنت" (masculine singular, as Gulf business sites do).

TERMS
- Keep these in Latin letters, as Arab developers and buyers write them: product and brand names
  (Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, Lovable, Bolt, Cursor, Netlify, Google
  Analytics, LinkedIn, Upwork, GitHub, Contra, ScriptBee, LEICHT, caisy, Stake, Smart Bricks, _VOIS),
  "MVP", "Full-Stack", "AI" may appear beside Arabic (e.g. "الذكاء الاصطناعي (AI)") once per
  string at most.
- Use these Arabic terms consistently:
  product engineer = مهندس منتجات
  full-stack developer = مطوّر Full-Stack
  AI developer = مطوّر ذكاء اصطناعي
  web app = تطبيق ويب ; website = موقع ; MVP = النسخة الأولى (MVP)
  take over an app = أتسلّم التطبيق ; ship the next release = أطلق الإصدار التالي
  case study = دراسة حالة ; services = الخدمات ; résumé = السيرة الذاتية
  freelance = مستقل ; retainer = عقد شهري ; audit = مراجعة تقنية
- Search wording Arab buyers actually use, worth using naturally where it fits the meaning:
  "تصميم وبرمجة مواقع", "برمجة مواقع", "تطوير تطبيقات الويب".
- Personal names of people stay exactly as written in Latin letters (Haya Doughan, Mohammed Ahmed
  Abdus, Ahmed Ghazy). Months as Arabic month names; digits stay Western (2026, $5,000, 10).

DO NOT BREAK
- Return ONLY valid JSON, no commentary, no code fence. Same keys, same order.
- For every entry copy "en" back unchanged, character for character, and put the Arabic in "ar".
- Keep every placeholder exactly: {email}, %{formName}.
- Keep inline links as [Arabic link text](same URL): translate the text inside [ ], never the URL
  inside ( ).
- Keep **bold** markers around the matching Arabic words, same count as the English.
- "profile.offerAccent" must be ONE word that appears, spelled identically, inside your Arabic
  "profile.offer". Pick the verb that carries "ship" (e.g. أُطلق).
- Titles ending in "| Ahmed Ghazy" keep "| Ahmed Ghazy" at the end.
- Any key ending in "description" must stay under 160 characters, because Google shows it in
  results. "profile.seoTitle" stays under 60 characters including "| Ahmed Ghazy". Keys ending in
  "metaTitle" stay under 45 characters: the page adds " | Ahmed Ghazy" after them.
- Form choices ("ui.contact.choices.*.options.*") are short labels; keep them short.
- Legal and privacy text: translate faithfully and completely, same meaning, no softening, no
  additions. Keep "GDPR", "UK GDPR" and the Egyptian Personal Data Protection Center (مركز حماية
  البيانات الشخصية) named.

The JSON follows.
```

## 2. Long-form pages (Markdown)

Translate one file per chat (or a few short ones). Start with the pages Arab buyers are most likely
to land on: `services/arabic-rtl-web-apps.md`, `services/take-over-an-app.md`,
`services/mvp-development.md`, `services/ai-products-and-agents.md`,
`services/full-stack-development.md`. A translated `services/` page also turns on `/ar/services/`.

1. Paste **Prompt B**, then the full English file (frontmatter included).
2. Save the reply as `src/content/ar/<collection>/<same-file-name>.md`.
3. Check the page under `/ar/<collection>/<id>/` in dev. `npm run validate` catches frontmatter
   mistakes (missing quotes, descriptions over 160 characters).

### Prompt B: one Markdown page

```text
Translate the Markdown file I paste after this message from English into Arabic, for the same
website and readers as before: founders and businesses in Saudi Arabia, the UAE, Egypt and the Gulf
hiring Ahmed Ghazy, an Egyptian product engineer, full-stack and AI developer. Same voice: Modern
Standard Arabic, plain and direct, first person singular, no claims or numbers the English does not
have, nothing dropped. Same terms list as before (product engineer = مهندس منتجات, full-stack
developer = مطوّر Full-Stack, AI developer = مطوّر ذكاء اصطناعي, MVP stays "MVP", brand and
technology names stay in Latin letters, Western digits).

Return ONLY the complete file, starting with the --- line, no commentary and no code fence.

FRONTMATTER (between the --- lines)
- Keep every key name in English, in the same order.
- Translate the values of: title, heading, description, cardTitle, cardSummary, lead, imageAlt,
  kind, role, period, notFit, every item under fit, gets, steps, experience, terms, and every
  question and answer under faq.
- Do NOT change: order, updated, published, status, service, relatedArticles, href, tags, or any
  value that is a date, number, file id or URL.
- Wrap every translated value in single quotes. If the Arabic contains an apostrophe, use double
  quotes instead.
- description: 160 characters at most, and it must work as the Google snippet in Arabic.
- title: 45 characters at most where possible; the page adds " | Ahmed Ghazy" to make the Google
  title.

BODY
- Translate headings, paragraphs, lists, tables and quotes.
- Links: translate the visible text inside [ ], keep the URL inside ( ) exactly as it is.
- Keep the Markdown structure: same headings (## stays ##), lists, tables, bold and line breaks.
- No HTML, no code fences, no emoji, nothing added at the end.

The file follows.
```

## 3. Going live

1. Every interface string is translated (the todo file returns `{}`).
2. Read the Arabic pages in a deploy preview, on a phone and a desktop.
3. Set `published: true` for `ar` in `src/i18n/locales.mjs`. Production then builds `/ar/`, adds the
   language switch, hreflang tags and the Arabic sitemap entries.
4. After the deploy, submit `https://ahmed-ghazy.com/ar/` in Search Console and Bing Webmaster
   Tools.
