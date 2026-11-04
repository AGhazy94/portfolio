---
title: 'ScriptBee: AI chat that keeps running after the tab closes'
description: How I moved long-running AI chat into background tasks, saved the results and connected task progress to ScriptBee's Next.js interface.
kind: AI marketing platform · Client work through caisy
order: 1
updated: 2026-11-04
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

## The problem: refreshing the page lost the answer

An agent run on ScriptBee took two to ten minutes, because the agent called several tools before it answered. Inside a normal request, a user who refreshed the page lost the answer.

## What I changed

I integrated Trigger.dev so the agent work runs as a background task. I built the route that starts a run, saved the conversation messages to the database, and connected run status back to the chat interface and a separate Tasks page.

The hardest part was keeping the chat screen connected to work happening outside the browser request. The interface needed to follow the right run and load its saved messages when the work finished.

1. The chat request starts a background run with the chat and workspace context.
2. The background task processes the agent work and saves the messages.
3. The chat widget and Tasks page show the run's status.
4. When the work finishes, the chat loads the saved result.

## The result

A run keeps going after the tab closes, and the user can return to the saved result. Completing a long request no longer depends on keeping the chat screen open.

## The rest of my work

- **Sign-in and workspaces.** Login with a magic link, a two-step login, a waitlist and a workspace switcher.
- **The chat interface.** The chat screens, suggestions, sidebar and loading states.
- **Agent tools.** A Google Keyword Planner tool and a YouTube video analysis tool that the AI agent can call.
- **The Google Ads connection.** An OAuth flow, customer selection and metrics.
- **Onboarding.** Persona generation, team invitations, a workspace step, email-verification rate limiting, access control and bulk personas, plus popup sign-in for the Google Ads, Google Analytics and Search Console connections, with success and error handling.

## Building tools for the agent

The agent decides which tool to call from the tool's description and its parameters. When those were loose, it called my tools with vague inputs, and tightening the parameter types and descriptions fixed more than prompt changes did. The Keyword Planner tool had a second catch: Google Ads test accounts return no real keyword data, so the tool could only be judged against a real account.

## What it shows

Shipping product features in a team's Next.js codebase, including sign-in, background jobs, agent tools and third-party OAuth connections. That is the work behind [AI features and agents](/services/ai-products-and-agents/), [taking over an existing app](/services/take-over-an-app/) and [building an MVP](/services/mvp-development/).
