# Ahmed Ghazy — Portfolio

Personal site built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed on
[Netlify](https://www.netlify.com). Layout inspired by [Brittany Chiang](https://brittanychiang.com)'s portfolio.

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

All copy lives in [`src/data/profile.ts`](src/data/profile.ts): name, tagline, SEO description, About paragraphs,
socials, experience, projects and the interface strings in `ui`. Project thumbnails live in `src/assets/projects/` and
are resized to WebP at build time. The résumé is served from `public/resume.pdf`.

## SEO and social cards

- Canonical URL, sitemap and robots.txt use `site` from `astro.config.mjs`. On Netlify it reads the `URL` env var,
  so adding a custom domain updates every absolute URL on the next deploy.
- `/og.png` and the favicons are drawn by `src/lib/graphics.ts`; the web manifest comes from
  `src/pages/site.webmanifest.ts`. All of them follow the content in `profile.ts`.
- The page head carries a JSON-LD `@graph` of WebSite, ProfilePage and Person. Bump `updated` in `profile.ts` when the
  copy changes.

## Deploy

Connect the repo in Netlify. `netlify.toml` sets the build command, publish directory, noindex flag for previews and
the headers; Node comes from `.nvmrc`.
