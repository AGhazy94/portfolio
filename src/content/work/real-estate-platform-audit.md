---
title: 'AI real-estate platform: an audit, then the fixes in order'
description: How I audited the live frontend of an AI platform for real-estate investors, ranked the problems by how much they hurt users and fixed them in that order.
kind: AI platform for real-estate investors · Frontend lead
order: 2
updated: 2026-11-05
tags:
  - Next.js
  - TypeScript
  - React
  - App Router
---

## The project

An AI platform for real-estate investors, with property pages and valuation and score views. I led its frontend from 2025 to 2026. The app was live and people were using it.

## Audit first

I audited the frontend before changing anything. I listed the problems, ranked them by how much they hurt users and fixed them in that order.

## What I found and fixed

- **Expired sessions failed silently.** A user whose login had expired got an empty page, with no message and no way back to sign-in. I sent every request through one shared client with a single handler for expired sessions, and that fixed it on every page.
- **A missing setting looked like a backend outage.** The app could start without a required setting and then fail on every request. Now it checks its settings at startup and won't run without them.
- **One broken section took down the whole property page.** Each section got its own error boundary, so a failure stays inside that section and the rest of the page still works.
- **Property pages loaded empty.** The pages fetched their data from the browser after they loaded. That was slow, the requests waited on each other, and Google saw an empty page. I moved the data fetching to the server with the Next.js App Router and split the pages into server-rendered sections, so the first response carries the content.

## The result

Error reports went down, and more property pages got indexed by Google. All of it was fixed inside the existing app, with no rewrite.

## What I check in other apps

When I take over an app, I check these early:

- An expired login sends people back to sign-in.
- The app stops at startup when a setting is missing.
- One broken part can't take down a whole page.
- The first response carries the content.

[Taking over an existing app](/services/take-over-an-app/) explains how I work, and [fix or rebuild](/blog/fix-or-rebuild-an-inherited-web-app/) explains how I decide what to keep.
