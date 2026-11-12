---
title: 'Vibe coding security checklist: what I check before real users'
description: The vibe coding security checks I run on Lovable, Bolt, Replit or Cursor apps, from database rules and leaked keys to payments and sign-in.
published: 2026-11-09
updated: 2026-11-12
service: take-over-an-app
relatedArticles:
  - how-to-fix-a-vibe-coded-app
  - how-to-take-a-lovable-app-to-production
faq:
  - question: Is Lovable's security scan enough?
    answer: It's a good start and you should run it. Lovable itself says the scans can't guarantee complete security. They also can't know your business rules, like which team member should see which invoice, so someone still has to check those by hand.
  - question: What is the most common security problem in vibe-coded apps?
    answer: In the apps I review, it's database access. The screen hides other users' data, but the database still gives it to anyone signed in. In Supabase that means row level security is off or too loose on some tables.
  - question: Do I need a security review before launch?
    answer: If the app stores personal data, takes payments or holds anything a customer would be upset to see leaked, yes. A review before launch costs far less than telling customers their data was exposed.
---

When someone sends me an app built with Lovable, Bolt, Replit or Cursor, security is the first thing I check. Everything else can wait a day.

These tools are good at building screens. They're less careful about who's allowed to see what. The app looks right and works in the demo, so nobody notices until a curious user opens the developer tools.

The short version: check the database rules on every table, keep secret keys out of the browser, make sure only your server can mark someone as paid, and limit who can call your AI features. Those four cover most of the serious problems I find.

This is the full list I go through. You can run most of it yourself.

## 1. Database rules on every table

Most of these apps use Supabase. In Supabase, the browser talks to the database directly, so the database rules, called [row level security](https://supabase.com/docs/guides/database/postgres/row-level-security), are the only thing standing between one user and another user's data.

For every table that holds user data, I check:

- Row level security is turned on
- The rules match the business. A user sees their own rows, a team member sees their team's rows, and nobody sees everything
- Insert and update rules are there too, not just read rules. I often find tables where any signed-in user can edit any row

A quick test: sign in as one user, copy a request from the network tab, and change the ID to another user's. If you get their data back, the rules are wrong.

## 2. No secret keys in the browser

Anything in the front-end code can be read by anyone who visits the site.

I search the code for API keys. The usual ones are OpenAI, Stripe secret keys, the Supabase secret key and email service keys. The Supabase publishable key (called "anon" on older projects) is fine to be public. The secret key (the older "service_role" key) [never is](https://supabase.com/docs/guides/getting-started/api-keys), because it skips every database rule.

Lovable has a [Secrets](https://docs.lovable.dev/features/secrets) feature for this. Keys go there, and the calls that need them run on the server, in an edge function, not in the page.

I also check the GitHub history. A key that was committed once and deleted later is [still in the history](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository), so it needs to be rotated.

## 3. Sign-in and password reset

I go through sign-up, sign-in, sign-out and password reset as a new user. I'm looking for:

- Email confirmation that can be skipped
- Reset links that don't expire or can be reused
- Admin pages that only hide the button but let anyone open the URL
- Leaked-password protection turned off. In Supabase it's [a setting](https://supabase.com/docs/guides/auth/password-security), and Lovable's scan flags it

## 4. Payments that can be faked

This one costs money directly.

If the app marks a user as paid because the browser said so, anyone can upgrade themselves for free. The paid status should only change when the payment provider tells your server, through a Stripe webhook for example, and the server should [check the signature](https://docs.stripe.com/webhooks) to make sure the webhook really came from Stripe.

## 5. AI features that can be abused

If the app calls an AI model, I check who can call it and how often. An open endpoint with your OpenAI key behind it can run up a big bill in a night.

I add a sign-in check, a limit per user and a hard spending cap where the provider has one.

## 6. File uploads

Storage buckets have [their own rules](https://supabase.com/docs/guides/storage/security/access-control), separate from the tables. I check that private files are in a private bucket, that one user can't list or download another user's files, and that there's a size limit.

## 7. Dependencies and the security scan

Lovable runs a quick security scan when you publish, and has a deeper scan you can run yourself. Run both and fix what they find.

Then I run [npm audit](https://docs.npmjs.com/cli/commands/npm-audit/) on the code from GitHub. The scans are useful, but [Lovable says itself](https://docs.lovable.dev/features/security) that they can't promise complete security. They also don't know your business rules. Only someone who knows the app can tell that a sales rep shouldn't see the finance table.

## 8. Logs and a way to find out

Last, I make sure there's error tracking and a log of sign-ins and admin actions. If something does go wrong, you want to see it before your users tell you.

## If you want me to check yours

This list is a big part of my audit. I go through it on your real app, plus the code, the hosting and the main user flows, and send you a one-page note with what's risky and what to fix first, with a cost for each.

[Taking over an app](/services/take-over-an-app/) has the details, and [how to fix a vibe-coded app](/blog/how-to-fix-a-vibe-coded-app/) covers what comes after security. If you think something's already leaking, tell me in the form below and I'll look at that first.
