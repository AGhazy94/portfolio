---
title: How to take a Lovable app to production
description: What I check and set up before a Lovable app gets real users, from GitHub and Supabase ownership to staging, migrations, payments and hosting.
published: 2026-11-09
updated: 2026-11-12
service: take-over-an-app
imageAlt: A small product model moves from paper supports onto a solid foundation with a blue safety rail
relatedArticles:
  - vibe-coded-app-security-checklist
  - how-to-fix-a-vibe-coded-app
faq:
  - question: Can I export my Lovable app and host it somewhere else?
    answer: Yes. Connect the project to GitHub and the code syncs to your repository. From there you can deploy it to Vercel, Netlify or your own server. Plan the move of the database and the secrets along with it.
  - question: Do I have to stop using Lovable once a developer works on the code?
    answer: No. Lovable syncs both ways with one branch on GitHub. I keep Lovable on its own branch and merge its changes through reviewed pull requests, so nothing reaches users without a check.
  - question: Is a Lovable app good enough for production?
    answer: Many are, after some work. The screens and the basic data model are often fine. What usually needs work is database access rules, server-side logic for payments and AI calls, and a safe way to change the app once people depend on it.
---

Taking a Lovable app to production means owning the code and the database, fixing the database access rules, moving secrets and payment logic to the server, and adding a staging copy so changes get tested before real users see them. Where you host it matters less than people think.

Lovable is great for getting a product in front of people fast. The trouble starts when that app needs to hold real customers and real money. Then the questions change. Who owns the code? What happens if a change breaks sign-up on a Friday night? Is customer data actually private?

I take Lovable apps to production as part of my work. This is what I check and set up, in order.

## 1. Connect GitHub and own the repository

First thing. Connect the Lovable project to GitHub, under your account or your company's, not a freelancer's.

[Lovable syncs both ways](https://docs.lovable.dev/integrations/github) with one branch, usually main. Changes you make in Lovable go to GitHub, and changes pushed to that branch come back into Lovable. That means a developer can work in their own editor without breaking your Lovable project.

It also means you have a full history. If something breaks, you can see what changed and roll it back.

## 2. Own the database too

Most Lovable apps keep their data in Supabase, either a project you connected or Lovable Cloud.

I check who owns it and who can log in to it. Then I check the backups. Lovable Cloud keeps [daily backups](https://docs.lovable.dev/features/database-backups), and a Supabase project has [its own](https://supabase.com/docs/guides/platform/backups). If the database is gone tomorrow, how much do you lose? On a real product the answer has to be "nearly nothing".

## 3. Fix database access before anything else

This is where I find the most serious problems.

The app shows each user only their own data, but the database rules often allow much more. Every table with user data needs row level security turned on, with rules that match who should see what. Lovable shows these rules in its [database access view](https://docs.lovable.dev/features/database-access).

I go through this in detail in the [security checklist](/blog/vibe-coded-app-security-checklist/). Lovable's [security scan](https://docs.lovable.dev/features/security) helps here too. Run it, and still check the rules by hand.

## 4. Move secrets and important logic to the server

Anything in the browser can be read and changed by the user.

So API keys go in [Lovable's Secrets](https://docs.lovable.dev/features/secrets), never in the code. Calls to OpenAI, Stripe or your email service run in a server function. And anything that decides money or access, like marking a user as paid, happens on the server after the payment provider confirms it.

## 5. Add a staging copy

Right now, if you're like most founders I talk to, every change goes straight to the live app.

Before real users depend on it, I set up a second copy for testing with its own database. Changes go there first. Only after they work there do they go live.

Lovable can work on a separate branch, which makes this easier. The important part is that staging has its own data, so a test can never touch a real customer.

## 6. Turn database changes into migration files

In a Lovable project, the database often changes through prompts or clicks in the dashboard. Fine for building. Risky once there's real data.

I turn those changes into [migration files](https://supabase.com/docs/guides/deployment/database-migrations) in the repository. Then the same change runs on staging first and on the live database after, and you can see exactly what changed and when.

## 7. Decide where to host it

You can keep publishing from Lovable, or deploy the GitHub code to Vercel, Netlify or your own server.

I usually move hosting out when the app needs a custom server setup, preview links for every change, or when the founder wants everything in accounts they already pay for. If Lovable hosting is doing the job, there's no rush. When you do move, [this is how I deploy a Lovable app to Vercel, Netlify or AWS](/blog/how-to-deploy-a-lovable-app-to-vercel-netlify-or-aws/).

## 8. Set up error tracking and a first look at speed

Before launch I add error tracking, so you see a failure before a user reports it. I also check the main pages on a normal phone with a normal connection. An app that loads a lot of code up front can feel slow on a first visit from a phone.

## 9. Write down how to make changes

Last, a short page in the repository: how to run the app, how to deploy, where the secrets live, how to change the database. It sounds boring. It's the thing that lets the next developer, or you in six months, change the app without fear.

## If you're about to launch

I can do this with you. I start with a short audit of the Lovable project, the database and the hosting, and send you a one-page note with what's ready, what's risky and what to fix first, with a cost for each.

[Taking over an app](/services/take-over-an-app/) explains how it works. If something is already breaking, [how to fix a vibe-coded app](/blog/how-to-fix-a-vibe-coded-app/) is the place to start. Or tell me about your app in the form below.
