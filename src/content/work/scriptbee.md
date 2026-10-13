---
title: ScriptBee
description: Case study of the chat interface, background tasks, Google Ads connection and onboarding I built on ScriptBee's Next.js app, and what teammates built instead.
kind: AI marketing platform · Client work through caisy
order: 1
updated: 2026-10-13
href: https://www.scriptbee.ai/
tags:
  - Next.js
  - TypeScript
  - Trigger.dev
  - Drizzle
  - Google Ads API
---

## The project

ScriptBee is an AI marketing platform. I joined the team's Next.js app in May 2025, through caisy, and worked on it until July 2025. It was a shared codebase with a lead engineer who had set up the base: the framework, the database layer and the project structure.

## What I built

- **Sign-in and workspaces.** Login with a magic link, a two-step login, a waitlist and a workspace switcher.
- **The chat interface.** The chat screens and the experience around them.
- **A task widget and background tasks.** Chat work that runs in the background through Trigger.dev, and a Tasks page to see it.
- **The Google Ads connection.** An OAuth flow, customer selection and metrics.
- **Agent tools.** A Google Keyword Planner tool and a YouTube video analysis tool that the AI agent can call.
- **Onboarding.** I built the flow on top of an initial scaffold from a teammate: persona generation, team invitations, a workspace step, email-verification rate limiting, access control and bulk personas. In onboarding I also built the popup sign-in for the Google Ads, Google Analytics and Search Console connections, with success and error handling.

## What I didn't build

Teammates built the project's base setup, the first scaffold of the onboarding components and the first version of the Search Console integration. They also built the retrieval and workflow logic behind the AI features. My part was the product interface, the background work and the integrations listed above.

## What it shows

Joining an existing team's repository and shipping product features in it, including sign-in, background jobs and third-party OAuth connections. That's the kind of work in [taking over an existing app](/services/take-over-an-app/) and [building an MVP](/services/mvp-development/).
