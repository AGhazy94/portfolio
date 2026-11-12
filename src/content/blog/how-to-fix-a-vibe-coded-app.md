---
title: How to fix a vibe-coded app that breaks with real users
description: How I fix a vibe-coded app built with Lovable, Bolt, Replit or Cursor that works in the demo but breaks once real users sign up, in order.
published: 2026-11-09
updated: 2026-11-12
service: take-over-an-app
imageAlt: A blue replacement piece repairs a bridge of interlocking panels, with a wrench below
relatedArticles:
  - vibe-coded-app-security-checklist
  - how-to-take-a-lovable-app-to-production
faq:
  - question: Should I rebuild a vibe-coded app from scratch?
    answer: Usually not at first. Most of these apps have screens that are fine and a database that is close to right. I fix access, data rules and the broken flows first, and only then look at what is worth rewriting.
  - question: Can I keep using Lovable or Bolt after a developer takes over?
    answer: Yes. Agree who changes what. I usually leave one branch for the AI tool and put everything else through reviewed pull requests, so we don't overwrite each other's work.
  - question: How long does it take to fix a vibe-coded app?
    answer: It depends on what is broken. That's why I start with a short audit. You get the list of problems in order with a cost for each, and you decide how far to go before paying for any fixes.
---

To fix a vibe-coded app that breaks with real users, stop prompting the broken parts, make sure you own the code and the database, lock down who can see what, and get the one flow that makes you money working end to end. After that, set up a safe way to make changes and decide what's worth keeping.

A lot of the apps I'm asked to look at now were built with Lovable, Bolt, Replit or Cursor, and the story is nearly always the same. The demo worked. Then real users signed up and things started breaking. Sign-up fails on some phones. A user sees data that isn't theirs. Someone pays and their account doesn't upgrade. And every new prompt fixes one thing and breaks something else.

That's normal, and most of these apps can be fixed. The AI got you to a working demo fast. It just skipped the boring parts that real users hit first.

I review and fix apps like this every week. Here's each step the way I do it.

## 1. Stop prompting the broken parts

When the app is already failing, another prompt usually moves the bug somewhere else. The tool can rewrite files you never asked it to touch.

So pause new features for a few days.

Write down what's broken, in your users' words. "A new user can't finish sign-up on mobile." "The dashboard shows another company's invoices." That list is what I fix against, and it's the first thing I ask a founder for.

## 2. Make sure you own everything

Before anyone changes code, check that these are in your name, not the tool's or a freelancer's:

- The code, in a GitHub repository you own
- The database, usually a Supabase project
- The hosting and the domain
- Stripe or whatever takes payments, the email service and any API keys

[Lovable](https://docs.lovable.dev/integrations/github) and Bolt can push the code to GitHub. If you haven't connected it yet, do it now. Then every change is saved and can be undone.

## 3. Check who can see what

This is the step I spend the most time on, and the one founders don't expect.

A lot of vibe-coded apps hide other users' data in the screen but not in the database. The page only shows your own orders, but the database will hand every order to any signed-in user who asks. Anyone who opens the browser's developer tools can read it.

In Supabase this comes down to [row level security](https://supabase.com/docs/guides/database/postgres/row-level-security). Every table with user data needs it turned on, with rules that match who should see what. I also check that no secret keys are sitting in the browser code.

I wrote the full list in the [security checklist for vibe-coded apps](/blog/vibe-coded-app-security-checklist/).

## 4. Get the main flow working end to end

Pick the one path that makes you money. For most apps that's sign up, do the main thing, pay.

I go through it as a brand new user, on a phone and on a laptop, and on a slow connection. I write down every failure and fix those first.

A chart that looks a bit off can wait. A sign-up that fails can't.

## 5. Move long work out of the page

AI tools like to do everything in the browser. Calling an AI model, processing an upload, sending emails. It works in the demo. With real users, someone refreshes or closes the tab and the work stops halfway.

Anything long or important should run on the server, and the app should save whether it finished.

I had exactly this on [ScriptBee](/work/scriptbee/). AI agent runs took minutes, and a refresh lost the answer. I moved them into background tasks so they kept running after the tab closed.

## 6. Set up a safe way to make changes

Most of what breaks after launch breaks during a change, not in the first version.

Before the next round of fixes I set up a staging copy with its own database, so changes get tested before real users see them. Changes go in as pull requests. Database changes go in as [migration files](https://supabase.com/docs/guides/deployment/database-migrations), not clicks in the dashboard. And I add error tracking, so you hear about a failure from a tool before a customer emails you.

## 7. Decide what to keep

Once the urgent problems are fixed, I look at the whole app.

Most vibe-coded apps are worth keeping. The screens are usually fine. The parts I most often rewrite are sign-in, payments and anything that touches other people's data.

If you're not sure which way to go, [fix or rebuild](/blog/fix-or-rebuild-an-inherited-web-app/) walks through how I decide.

## If your app is stuck right now

I start with a short audit for a fixed price. I read the code, the database rules and the hosting setup, and I use the app myself. Then I send you a one-page note with what works, what could hurt the business, and the fixes in order with a cost for each.

You can stop there and keep the note. [Taking over an app](/services/take-over-an-app/) has the rest, or tell me what's breaking in the form below.
