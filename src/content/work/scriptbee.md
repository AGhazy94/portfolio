---
title: 'ScriptBee: AI chat, agent tools and background tasks in Next.js'
description: Case study of the chat interface, background tasks, agent tools, Google Ads connection and onboarding I built on ScriptBee's Next.js app.
kind: AI marketing platform · Client work through caisy
order: 1
updated: 2026-10-14
href: https://www.scriptbee.ai/
imageAlt: Illustration of an AI marketing assistant chat connected to ad accounts and background tasks
tags:
  - Next.js
  - TypeScript
  - Trigger.dev
  - Drizzle
  - Google Ads API
---

## The project

ScriptBee is an AI marketing platform. I worked on its Next.js app from May to July 2025, through caisy, as part of the product team.

## What I built

- **Sign-in and workspaces.** Login with a magic link, a two-step login, a waitlist and a workspace switcher.
- **The chat interface.** The chat screens and the experience around them.
- **A task widget and background tasks.** Chat work that runs in the background through Trigger.dev, and a Tasks page to see it.
- **Agent tools.** A Google Keyword Planner tool and a YouTube video analysis tool that the AI agent can call.
- **The Google Ads connection.** An OAuth flow, customer selection and metrics.
- **Onboarding.** Persona generation, team invitations, a workspace step, email-verification rate limiting, access control and bulk personas, plus popup sign-in for the Google Ads, Google Analytics and Search Console connections, with success and error handling.

## The long-running chat problem

An agent run on ScriptBee took two to ten minutes, because the agent called several tools before it answered. Inside a normal request, a user who refreshed the page lost the answer.

I integrated Trigger.dev so chat work runs as a background task, added the API route that starts a run and the Tasks page that lists them, and built the route that hands the browser a token to follow a run live. A run now keeps going after the tab closes, and the user can come back to the result. The hardest part was getting progress from the background run back onto the chat screen.

## Building tools for the agent

The agent decides which tool to call from the tool's description and its parameters. When those were loose, it called my tools with vague inputs, and tightening the parameter types and descriptions fixed more than prompt changes did. The Keyword Planner tool had a second catch: Google Ads test accounts return no real keyword data, so the tool could only be judged against a real account.

## What it shows

Shipping product features in a team's Next.js codebase, including sign-in, background jobs, agent tools and third-party OAuth connections. That is the work behind [AI features and agents](/services/ai-products-and-agents/), [taking over an existing app](/services/take-over-an-app/) and [building an MVP](/services/mvp-development/).
