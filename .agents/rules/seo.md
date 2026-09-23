# SEO, structured data and machine-readable files

Everything search engines, social cards and LLM crawlers read is generated from
[src/data/profile.ts](../../src/data/profile.ts). Change the data, not the output.

## Where each piece lives

| Output                                                        | Source                                                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `<title>`, description, robots, canonical, OG, Twitter, icons | [src/layouts/Layout.astro](../../src/layouts/Layout.astro)                                        |
| JSON-LD `@graph` (WebSite → ProfilePage → Person)             | same file, `structuredData`                                                                       |
| `/og.png` 1200×630, favicons, touch icons                     | [src/lib/graphics.ts](../../src/lib/graphics.ts) via `src/pages/*.ts`                             |
| `/sitemap-index.xml`                                          | `@astrojs/sitemap` in [astro.config.mjs](../../astro.config.mjs), no `lastmod`                    |
| `/robots.txt`                                                 | [src/pages/robots.txt.ts](../../src/pages/robots.txt.ts) — allows every crawler, AI ones included |
| `/llms.txt`                                                   | [src/pages/llms.txt.ts](../../src/pages/llms.txt.ts), [llmstxt.org](https://llmstxt.org) format   |
| `/site.webmanifest`                                           | [src/pages/site.webmanifest.ts](../../src/pages/site.webmanifest.ts)                              |

## Invariants

- `site` in `astro.config.mjs` reads Netlify's `URL` (the primary domain). Every absolute URL —
  canonical, `og:url`, `og:image`, sitemap, robots, JSON-LD `@id`s — derives from it. A custom
  domain needs no code change.
- **Only production is indexed.** [netlify.toml](../../netlify.toml) sets `PUBLIC_NOINDEX=true` on
  deploy previews and branch deploys; `Layout.astro` then renders `noindex, follow` and drops the
  canonical. Never block previews in `robots.txt` instead — a blocked page cannot show its noindex.
- Pages pass `noindex` for anything that should never rank (the 404 already does); such pages also
  skip the JSON-LD and `og:url`, since they are not the profile.
- Dates are data, not build time: ProfilePage `dateCreated`/`dateModified` come from
  `profile.created`/`profile.updated`. Bump `updated` when the copy changes. The sitemap carries no
  `lastmod`, because a build-time date would claim a change on every deploy.
- JSON-LD nodes reference each other by `@id` (`/#website`, `/#person`, the page URL). Keep one
  Person node; add facts to it, not a second one.
- The Person has **no `image`** on purpose: the OG card is not a photo of the person. Add one only
  when a real headshot exists in `src/assets/`.
- `sameAs` lists only profiles that link back or clearly belong to the person — it is how Google ties
  them into one entity.
- Title pattern: `Name — Role` on the home page; subpages `Page | Name`.
- Description stays under ~155 characters.

## Verify after a change

1. `npm run build`, then read the head of `dist/index.html`.
2. Parse the JSON-LD: `@graph` types are `WebSite, ProfilePage, Person`, `mainEntity` points at
   `/#person`.
3. `PUBLIC_NOINDEX=true npx astro build` renders `noindex, follow` and no canonical; rebuild without
   it afterwards.
4. Lighthouse (SEO, accessibility, best practices) against `http://localhost:4321` — the dev
   toolbar's "Learn more" link is the one expected SEO failure and does not exist in production.
5. After deploy: Google Rich Results Test and the Search Console URL inspection on the live URL.

## Off-site (not in this repo, still load-bearing)

- Verify the domain in Google Search Console (`PUBLIC_GOOGLE_SITE_VERIFICATION` env var renders the
  meta tag) and submit `/sitemap-index.xml`.
- Link the site from LinkedIn, GitHub and the résumé PDF — backlinks plus `sameAs` reciprocity.
