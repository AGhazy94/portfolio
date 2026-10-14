---
title: Fix or rebuild? How to decide on an inherited web app
description: A way to decide whether an inherited web app should be repaired or rewritten, with the signs that point each way and a safer middle path.
published: 2026-10-13
updated: 2026-10-14
service: take-over-an-app
relatedArticles:
  - how-to-take-over-a-codebase-from-a-developer-who-left
imageAlt: Illustration of a worn building being repaired on one side and a new one framed on the other
faq:
  - question: Is a rewrite ever the right call?
    answer: Yes, but less often than developers who dislike the code claim. A rewrite makes sense when the data model is wrong, the platform can't be maintained, or every change breaks something else.
  - question: Can I rebuild in stages instead of all at once?
    answer: Usually, and it is often the safer route. Replace one part at a time behind the existing app, and keep users on a working product while you do.
  - question: Who should make the decision?
    answer: You, with a written audit from someone who has read the code. The person who would earn more from a rewrite should not be the only voice.
---

Someone gives you a web app that they didn't build. It works, mostly, and it looks like a mess. The first instinct of many developers is to say "we should rewrite this". Sometimes that's right. Usually it's expensive, and it's almost never the first step. Here is how I decide.

## Why the question is hard

Reading old code is harder than writing new code, so most developers feel the code is worse than it is. At the same time, a rewrite takes longer than anyone expects, because the old app contains years of small decisions and fixes that nobody wrote down. A rewrite has to rediscover all of them.

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

Separately, I moved the property pages' data fetching to the server with the Next.js App Router and split them into server-rendered sections. The initial response could include the page content instead of waiting for browser-side requests to fill it in.

These changes addressed specific failure modes without replacing the whole application.

## Signs that point to rebuilding

- The data model is wrong in a way that touches every feature.
- The platform is no longer supported and can't be upgraded.
- Nobody can run or deploy it, and the cause is deep, not a missing instruction.
- Every change breaks something unrelated, and there is no way to catch it.
- Serious security problems are baked into the design.
- The product has changed so much that the old structure fights every new feature.

One of these alone doesn't mean rebuild. Several together do.

## The middle path: replace one piece at a time

Between fixing and a full rewrite lies a safer route: keep the product running and replace its parts in order.

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

A good answer is specific. A weak answer is "the code is bad".

## The cost of each choice

| Approach          | When it fits                              | Trade-off                                                 |
| ----------------- | ----------------------------------------- | --------------------------------------------------------- |
| Repair            | A working product with isolated faults    | Less disruption, but structural limits may remain         |
| Replace in stages | A useful product with a few weak areas    | Continued delivery, with temporary integration complexity |
| Rebuild           | Structural blockers confirmed by an audit | Migration risk and a longer wait for the replacement      |

Compare the work and migration plan for your app, not only the quoted development price. A replacement also has to preserve the behavior that existing users rely on.

## What I do

When I take over an app, I start with the audit and give you a short written view: what is solid, what is risky and what I'd do first, with a recommendation between these three options. I don't start a rewrite unasked. If you want that view for your own app, [describe it in the form](/services/take-over-an-app/) and I'll say whether I can help.
