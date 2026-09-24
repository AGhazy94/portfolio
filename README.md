# Ahmed Ghazy — Portfolio

Personal site, v2. Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) and
[GSAP](https://gsap.com), set in Instrument Serif and Geist, and deployed on [Netlify](https://www.netlify.com). The
design system lives in [`design-system/portfolio-v2/MASTER.md`](design-system/portfolio-v2/MASTER.md). v1 is frozen
on the `v1` branch at [v1.ahmed-ghazy.com](https://v1.ahmed-ghazy.com).

## Commands

| Command            | Action                                           |
| :----------------- | :----------------------------------------------- |
| `npm install`      | Install dependencies                             |
| `npm run dev`      | Start the dev server at `localhost:4321`         |
| `npm run build`    | Build the static site to `./dist/`               |
| `npm run preview`  | Serve the built site locally                     |
| `npm run validate` | Type-check with `astro check` and run `prettier` |
| `npm run format`   | Format every file with Prettier                  |

## Editing content

All copy lives in [`src/data/profile.ts`](src/data/profile.ts): name, tagline, SEO description,
experience, projects, the About statement and paragraphs, socials, and the interface strings in `ui` (including every
contact form label and message). The portrait and project screenshots live in `src/assets/` and are resized at build
time. The résumé is served from `public/resume.pdf`.

## Contact form

The form in `src/components/Contact.astro` uses [Netlify Forms](https://docs.netlify.com/manage/forms/setup/). Netlify
detects it in the built HTML; without JS it posts and redirects to `/thanks/`, and with JS it submits with `fetch` and
shows inline success and error states. Submissions and email notifications are configured in the Netlify UI. Test it on
a Deploy Preview, not on production.

## Theme and motion

Light and dark follow the system setting until the visitor picks one with the header toggle. The colour tokens are
pinned hex pairs in `src/styles/global.css`. GSAP drives two effects, the hero portrait zoom and the About statement
reveal. It loads after the page is idle and is skipped entirely under `prefers-reduced-motion`.

## SEO and social cards

- Canonical URL, sitemap and robots.txt use `site` from `astro.config.mjs`. On Netlify it reads the `URL` env var,
  so adding a custom domain updates every absolute URL on the next deploy.
- `/og.png` and the favicons are drawn by `src/lib/graphics.ts`; the web manifest comes from
  `src/pages/site.webmanifest.ts`. All of them follow the content in `profile.ts`.
- The page head carries a JSON-LD `@graph` of WebSite, ProfilePage and Person. Bump `updated` in `profile.ts` when the
  copy changes.

## Deploy

Netlify deploys every push to `dev`, and opens a deploy preview for each pull request. `netlify.toml` sets the build
command (`validate` runs before `build`, so a failing check blocks the deploy), publish directory, noindex flag for
previews and the headers; Node comes from `.nvmrc`. The `Validate` GitHub workflow runs the same checks on pushes to
`dev` and on pull requests, so failures show up in GitHub too.
