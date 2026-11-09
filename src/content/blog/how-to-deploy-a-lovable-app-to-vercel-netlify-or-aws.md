---
title: How to deploy a Lovable app to Vercel, Netlify or AWS
description: How I move a Lovable app's hosting to Vercel, Netlify, Cloudflare or AWS, for both older Vite apps and newer TanStack Start apps, without breaking sign-in.
published: 2026-11-09
updated: 2026-11-09
service: take-over-an-app
relatedArticles:
  - how-to-take-a-lovable-app-to-production
  - vibe-coded-app-security-checklist
faq:
  - question: Will my lovable.app address stop working after I move hosting?
    answer: No. It stays on Lovable and keeps showing the last version you published there. The Publish button in Lovable only publishes to Lovable hosting, so your new host deploys from GitHub instead.
  - question: Can I keep editing in Lovable after deploying somewhere else?
    answer: Yes. Lovable keeps syncing with your GitHub repository, and the new host deploys from that repository. Every change you push, from Lovable or from a developer, can trigger a new deploy.
  - question: Do I have to move the database too?
    answer: No. You can move only the front end and keep the backend where it is, pointed at by environment variables. Moving the database is a separate job, because auth, storage, edge functions and scheduled jobs all have to move with it.
---

Most founders I talk to want to move their Lovable app off Lovable hosting for one of a few reasons. They want it in accounts they already pay for. They want a preview link for every change. Or a developer is joining and wants the usual setup.

The good news is that the front end moves easily. The part that catches people is everything around it: environment variables, sign-in redirects and refreshing a page that isn't the home page.

This is how I do it.

## 1. Connect GitHub first

Your new host deploys from a Git repository, not from Lovable. So connect the Lovable project to GitHub under your own account. It works on every Lovable plan.

Lovable keeps syncing both ways with that repository. You can keep editing in Lovable, and the host picks up each change.

## 2. Find out which kind of Lovable app you have

This decides almost everything after it.

Open package.json in Lovable's Code tab or in GitHub. If you see @tanstack/react-start in the dependencies, it's a TanStack Start app. Lovable has created new apps this way since May 2026. It runs server code, so the host has to run a server too.

If it isn't there, it's an older React and Vite app. That builds to plain static files, which any host can serve.

## 3. Set up the build on the new host

The settings are short:

- Build command: npm run build
- Node version: 22
- Output folder for a Vite app: dist on Netlify and Cloudflare Pages. Vercel finds it on its own

If the repository only has a bun.lock file and no package-lock.json, either use Bun on the host or generate the lock file first. Otherwise the install step fails.

For a TanStack Start app, Vercel, Netlify and Cloudflare Pages detect the server setup by themselves. On AWS or your own server, it runs as a Node app. Set NITRO_PRESET to node-server, build, and start the server it outputs.

## 4. Copy the environment variables

This is where most first deploys break.

The values are in the project's .env file. A Lovable app usually needs VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY and VITE_SUPABASE_PROJECT_ID. A TanStack Start app also needs the same three without the VITE_ prefix, for its server code.

Two things to know. The VITE_ values get baked in when the app builds, so change one and you have to rebuild. And server secrets, like a Stripe secret key, are not in the repository at all. You add them on the host by hand.

## 5. Make refresh work on every page (Vite apps)

Classic first-deploy bug. The home page loads fine, but open /dashboard and press refresh, and you get a 404.

A Vite app needs the host to send every unknown path back to index.html. On Netlify and Cloudflare Pages that's a _redirects file. On Vercel it's a rewrite in vercel.json. On AWS CloudFront it's a custom error response that returns 200. Don't use an S3 error page for this, because it still sends a 404 status.

TanStack Start apps don't need this, since the server handles routing.

## 6. Add the new domain to sign-in

If users sign in with Google, GitHub or a magic link, the sign-in provider only redirects back to addresses it knows. Add the new domain to the allowed redirect URLs, or sign-in will fail on the new host while working fine on lovable.app.

If you're still on Lovable Cloud's built-in backend, some of this is managed for you. Once you move the backend to your own Supabase project, you manage it yourself.

## 7. Point your domain

Point the custom domain at the new host and let it issue the certificate. Your lovable.app address keeps working and shows the last version you published there. That's useful as a fallback while you test.

## 8. Decide what to do with the backend

You don't have to move the backend to move hosting. The new front end can keep using Lovable Cloud through the same variables.

If you do want your own Supabase project, it's a bigger job. The database export has to include user accounts. Storage files get copied separately. Edge functions get deployed, sign-in providers and secrets get set up again, and scheduled jobs get recreated. Git sync only carries the code and migration files, not the data.

I always do this on a separate deployment first, and switch only once it works.

## 9. Test before you switch traffic

Before the domain points at the new host, I check:

- A nested page loads after a refresh
- Sign-up, sign-in and sign-out work, including Google if you use it
- Reading, saving and uploading data all work
- Payments go through and the account updates

Lovable can't test deployments outside its own preview, so this part is on you or your developer.

## If you'd rather not do it alone

Moving hosting is often the first step when a Lovable app becomes a real product. I usually do it together with [the other production checks](/blog/how-to-take-a-lovable-app-to-production/) and [a security pass](/blog/vibe-coded-app-security-checklist/).

I start with a short audit of the project, the backend and the hosting. [Taking over an app](/services/take-over-an-app/) explains how that works, or tell me about your app in the form below.
