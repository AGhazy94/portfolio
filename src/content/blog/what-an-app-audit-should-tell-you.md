---
title: What an app audit should tell you before you pay for fixes
description: What a short audit of a stuck web app should give you. One page in plain words, the risks to your customers, keep, fix or rebuild, and the fixes in order.
published: 2026-11-05
updated: 2026-11-05
service: take-over-an-app
relatedArticles:
  - fix-or-rebuild-an-inherited-web-app
  - how-to-take-over-a-codebase-from-a-developer-who-left
faq:
  - question: How much should an app audit cost?
    answer: It depends on the size of the app, so there is no single number. What matters more is that the price is agreed before it starts, and that you can stop after it and keep the note.
  - question: Do I need to be technical to read the audit?
    answer: No. It should be written for the person who pays for the app. If a risk isn't about your customers or your money, it shouldn't be at the top of the list.
  - question: Should the person who audits the app also fix it?
    answer: They can, but you don't have to decide that up front. A good note is clear enough for any developer to pick up the fixes from it.
---

Your app is stuck. Maybe it was built with an AI tool and breaks once real customers use it. Maybe the developer stopped replying. Either way, someone has to look at the code before anyone can tell you what to do next.

That look is the audit. Here is what you should get back from it, whoever does it.

## One page, in plain words

The audit is for you, not for another developer. You should be able to read it in five minutes and forward it to a co-founder or an investor without explaining it.

If you get twenty pages of tool output or a list of library versions, the work isn't finished. Someone still has to turn it into decisions.

## What works

Start with what is fine. Most stuck apps have more working parts than it feels like when something breaks. The solid parts are the ones you don't have to pay for again.

## What is risky, for your customers

"Technical debt" doesn't tell you anything. A useful note says what could happen to your customers or your business. For example:

- Customers get logged out and can't sign back in.
- Someone sees the wrong data, or another customer's data.
- Payments fail, or go through twice.
- A deploy takes the site down and nobody knows how to roll it back.
- The domain or the code sits in someone else's account.

Each risk should say how likely it is and how bad it would be. That's what lets you put them in order.

## Keep, fix or rebuild

The note should give a clear answer, with the reasons. Most of the time the answer is to keep the app and fix the worst parts. Sometimes one part needs replacing. A full rebuild should be rare, and whoever suggests one should show you why. [Fix or rebuild](/blog/fix-or-rebuild-an-inherited-web-app/) has the signs I look for.

## The fixes in order, each with a price

The note should rank the fixes by how much they hurt users and put a price on each one, so you can decide what to do now and what can wait.

When I audited the frontend of an AI platform for real-estate investors, I ranked the problems that way and fixed them in that order. One of them was expired sessions. A user whose login had expired got an empty page, with no message and no way back to sign-in. One shared handler fixed it on every page. The [case study](/work/real-estate-platform-audit/) has the rest of the list.

## What it shouldn't need

You don't have to hand over production data or payment keys for an audit. Read access to the repository and the hosting dashboard is enough to start, and nothing in production should change while it happens.

You also shouldn't be locked in. The price should be agreed before it starts, and you should be able to stop after it, keep the note and give it to any developer.

## Questions to ask before you agree to one

- What will I get at the end, and how long is it?
- Is the price fixed?
- What access do you need, and what can stay with me?
- Can I stop after the audit and keep the note?

## How I do it

When I take over an app, I start with this audit. I read the code, the deployment and the data model, and I run the app. You get the one-page note for a fixed price, and you can stop there. If you want me to carry on, the fixes go in as pull requests, and nothing reaches production without your OK.

[Taking over an app](/services/take-over-an-app/) has the details. If your app is stuck, tell me in the form below what it does and what's going wrong.
