# Ahmed Ghazy — Portfolio

Personal site, v2. Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) and
[GSAP](https://gsap.com), set in Instrument Serif and Geist, and deployed on [Netlify](https://www.netlify.com). v1 is frozen
on the `v1` branch at [v1.ahmed-ghazy.com](https://v1.ahmed-ghazy.com).

## Commands

| Command            | Action                                         |
| :----------------- | :--------------------------------------------- |
| `npm install`      | Install dependencies                           |
| `npm run dev`      | Start the dev server at `localhost:4321`       |
| `npm run build`    | Build the static site to `./dist/`             |
| `npm run preview`  | Serve the built site locally                   |
| `npm test`         | Run mocked IndexNow regression tests           |
| `npm run validate` | Run tests, Astro checks, and formatting checks |
| `npm run format`   | Format every file with Prettier                |

## Editing content

Home-page and interface copy lives in [`src/data/profile.ts`](src/data/profile.ts): name, tagline, SEO description,
experience, projects, the About statement and paragraphs, socials, and the interface strings in `ui` (including every
contact form label and message). Long-form pages live in the Markdown collections under `src/content/services/`,
`src/content/blog/`, and `src/content/work/`, validated by [`src/content.config.ts`](src/content.config.ts).

Each article names a primary `service` and may name up to two `relatedArticles` by collection ID. These relationships
drive related links on both articles and service pages. Draft articles and case studies remain excluded from production.

The portrait and content illustrations live in `src/assets/` and are resized at build time. The current case-study
covers are illustrations, not product screenshots. The résumé is served from `public/ahmed-ghazy-resume.pdf`.

The home page leads with selected work, followed by compact service rows, named recommendations, experience, About,
writing, and contact. Mobile navigation uses a native disclosure and keeps Contact visible. Articles include a visible
byline and a section list generated from their Markdown headings.

## Contact form

The form in `src/components/Contact.astro` uses [Netlify Forms](https://docs.netlify.com/manage/forms/setup/). Netlify
detects it in the built HTML; without JS it posts and redirects to `/thanks/`, and with JS it submits with `fetch` and
shows inline success and error states. Submissions and email notifications are configured in the Netlify UI. Test it on
a Deploy Preview, not on production.

The optional project details are labeled as optional. The hidden `page` field records the submission page, and header
contact links stay on that page wherever a form exists. It is not a record of the visitor's original acquisition source.

## Theme and motion

Light and dark follow the system setting until the visitor picks one with the header toggle. The colour tokens are
pinned hex pairs in `src/styles/global.css`. GSAP drives two effects, the hero portrait zoom and the About statement
reveal. It loads after the page is idle and is skipped entirely under `prefers-reduced-motion`.

## SEO and social cards

- Canonical URL, sitemap and robots.txt use `site` from `astro.config.mjs`. On Netlify it reads the `URL` env var,
  so adding a custom domain updates every absolute URL on the next deploy.
- `/og.png` and the favicons are drawn by `src/lib/graphics.ts` and follow the content in `profile.ts`.
  There is no web app manifest; a portfolio doesn't need to install as an app.
- The page head carries a JSON-LD `@graph` of WebSite, ProfilePage and Person. Bump `updated` in `profile.ts` when the
  copy changes.
- Collection pages add their own structured data and use their content image for social previews. Article descriptions
  and service relationships come from frontmatter; do not add ad-hoc metadata in components.
- The IndexNow plugin runs only on production deploys, uses a 10-second deadline, and warns rather than failing a deploy
  when a notification is rejected. Its tests mock the network and never notify search engines.

## Deploy

Netlify deploys every push to `dev`, and opens a deploy preview for each pull request. `netlify.toml` sets the build
command (`validate` runs before `build`, so a failing check blocks the deploy), publish directory, noindex flag for
previews and the headers; Node comes from `.nvmrc`. The `Validate` GitHub workflow runs the same checks on pushes to
`dev` and on pull requests, so failures show up in GitHub too.
