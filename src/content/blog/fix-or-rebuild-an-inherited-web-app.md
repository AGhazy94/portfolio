---
title: Fix or rebuild? How to decide on an inherited web app
description: A way to decide whether an inherited web app should be repaired or rewritten, with the signs that point each way and a safer middle path.
published: 2026-10-13
updated: 2026-11-12
service: take-over-an-app
relatedArticles:
  - how-to-take-over-a-codebase-from-a-developer-who-left
  - what-an-app-audit-should-tell-you
imageAlt: Illustration of a worn building being repaired on one side and a new one framed on the other
faq:
  - question: Is a rewrite ever the right call?
    answer: Yes, but less often than developers who dislike the code claim. A rewrite makes sense when the data model is wrong, the platform can't be maintained, or every change breaks something else.
  - question: Can I rebuild in stages instead of all at once?
    answer: Usually, and it is often the safer route. Replace one part at a time behind the existing app, and keep users on a working product while you do.
  - question: Who should make the decision?
    answer: You, with a written audit from someone who has read the code. The person who would earn more from a rewrite should not be the only voice.
---

Fix it, in most cases. Rebuild only when an audit shows the data model is wrong across the app, the platform can't be upgraded, or every change breaks something unrelated. Even then, replacing one part at a time is usually safer than starting over.

Someone hands you a web app they didn't build. It works, mostly, and it looks like a mess. The first instinct of many developers is to say "we should rewrite this". Sometimes that's right. Usually it's expensive, and it's almost never the first step. Here's how I decide.

## Why the question is hard

Reading old code is harder than writing new code, so most developers feel the code is worse than it is. At the same time, a rewrite takes longer than anyone expects, because the old app contains years of small decisions and fixes that nobody wrote down. A rewrite has to rediscover all of them. Joel Spolsky made this case in 2000 in [Things You Should Never Do](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/), and it still holds.

So the decision shouldn't rest on how the code feels. It should rest on evidence.

## Start with an audit, not a verdict

Before choosing, find out what you have:

- **How is it built?** Framework, language, database and how they fit together.
- **How old are the pieces?** Are the main dependencies supported, or abandoned?
- **Can it be deployed?** Can a developer run it locally and ship a change safely?
- **Are there tests?** Even a few tell you what mattered to the previous team.
- **What is risky?** Exposed secrets, no backups, no error reporting.
- **What do users actually use?** The parts people rely on matter more than the parts that look odd.

A short audit answers these. [Taking over a codebase](/blog/how-to-take-over-a-codebase-from-a-developer-who-left/) has a checklist for the early steps.

## Signs that point to fixing

- The app works for users and the bugs are specific and fixable.
- The framework is current or close to it.
- The data model matches how the business works.
- A new developer can run it locally within a day.
- Changes are slow but they don't break unrelated things.

In this case, a rewrite would spend months to reach where you already are. Fix the worst problems, add tests around what matters and keep shipping.

## What fixing looked like on a real app

In 2026 I audited the frontend of an AI platform for real-estate investors. The app worked, and it had the kind of problems that make a rewrite tempting. I listed them, ranked them by how much they hurt users, and fixed them in that order:

- **Expired sessions failed silently.** A user whose login had expired got an empty page, with no message and no way back to sign-in. One shared request client with a single handler for expired sessions fixed it on every page.
- **A missing setting looked like a backend outage.** The app started without a required setting and then failed on every request. It now checks its settings at startup and refuses to run without them.
- **One broken section took down the whole page.** Each section of the property page got its own error boundary, so a failure stays inside that section.

Separately, I moved the property pages' data fetching to the server with the Next.js App Router and split them into server-rendered sections. Before that, the pages loaded empty and filled in from the browser. That was slow, and Google saw an empty page. Now the first response carries the content.

Error reports went down, and more property pages got indexed. I fixed all of it inside the existing app. The [full case study](/work/real-estate-platform-audit/) has the details.

## Signs that point to rebuilding

- The data model is wrong in a way that touches every feature.
- The platform is no longer supported and can't be upgraded.
- Nobody can run or deploy it, and the cause is deep, not a missing instruction.
- Every change breaks something unrelated, and there is no way to catch it.
- Serious security problems are baked into the design.
- The product has changed so much that the old structure fights every new feature.

One of these alone doesn't mean rebuild. Several together do.

## The middle path: replace one piece at a time

Between fixing and a full rewrite lies a safer route: keep the product running and replace its parts in order. Martin Fowler calls it the [strangler fig](https://martinfowler.com/bliki/StranglerFigApplication.html) approach.

1. Pick the part that hurts most, such as the billing flow or the admin screens.
2. Build its replacement next to the old one.
3. Move users over, then remove the old part.
4. Repeat.

This keeps a working product in front of customers the whole time, and each step is small enough to review. It takes longer to say "we have a new app", and it risks far less.

## Questions to ask whoever recommends a rewrite

- What specific problem does a rewrite solve that repair can't?
- How will we avoid losing behaviour that the old app has?
- What is the plan if the rewrite takes twice as long?
- Can we do it in stages?
- Who gains from the larger project?

Ask what exactly is wrong. "The code is bad" doesn't answer that.

## The cost of each choice

| Approach          | When it fits                              | Trade-off                                                 |
| ----------------- | ----------------------------------------- | --------------------------------------------------------- |
| Repair            | A working product with isolated faults    | Less disruption, but structural limits may remain         |
| Replace in stages | A useful product with a few weak areas    | Continued delivery, with temporary integration complexity |
| Rebuild           | Structural blockers confirmed by an audit | Migration risk and a longer wait for the replacement      |

Don't compare only the quoted price. A rebuild also has to move your data over and keep everything your users already rely on, and that work is easy to leave out of a quote.

## What I do

When I take over an app, I start with the audit. You get one page that says what works, what is risky, whether I'd keep, fix or rebuild, and the fixes in order with a price for each. The audit has a fixed price, and you can stop after it and keep the note. I don't start a rewrite unless you ask for one.

If you want that for your own app, [describe it in the form](/services/take-over-an-app/) and I'll tell you whether I can help.
