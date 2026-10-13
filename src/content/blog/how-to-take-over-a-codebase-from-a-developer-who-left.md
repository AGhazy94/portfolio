---
title: How to take over a codebase from a developer who left
description: A practical checklist for founders and new developers, from getting access to shipping a first small change without breaking production.
published: 2026-10-13
updated: 2026-10-13
imageAlt: Illustration of a developer reading a handover checklist next to a laptop showing an unfamiliar codebase
faq:
  - question: What should I do first when my developer leaves?
    answer: Secure access before anything else. List every account the app depends on, make sure you own the ones that matter, and rotate shared passwords and keys. Only then start reading code.
  - question: Can a new developer take over without the old one's help?
    answer: Usually yes, if the code, the hosting and the data are all reachable. A short handover call helps a lot, but it is not required. What blocks a takeover is missing access, not missing explanations.
  - question: How do I know whether the code is any good?
    answer: Ask for an audit before you commit to a plan. A short written review of how the app is built, how it is deployed and what is risky will tell you more than a demo. See [fix or rebuild](/blog/fix-or-rebuild-an-inherited-web-app/) for how to read the result.
---

A developer who built your product has left, or stopped answering. The app still runs, customers still use it and nobody is sure how. This is a common situation and a recoverable one. The order of the steps matters more than the speed.

I take over existing web apps as part of my work, so this is the checklist I would follow. It also works if you are the founder who has to hold the process together.

## 1. Find out what the app depends on

Before anyone reads code, write a list of everything the product touches:

- The code repository (GitHub, GitLab, Bitbucket) and who owns it.
- Hosting: where the app runs, such as Vercel, Netlify, AWS or a plain server.
- The domain name and where its DNS records are managed.
- The database and where backups are kept.
- Third-party services: payments, email, analytics, authentication, file storage, error tracking.
- Any scheduled jobs and where they run.

Many takeovers stall here, because one of these sits under the old developer's personal account. Finding that out early is cheap. Finding it out the day something breaks is not.

## 2. Make sure you own the accounts that matter

For each item in the list, check whose name it is under. The repository, the hosting account, the domain and the payment account should belong to your company, with developers added as members. If any of them sits under a personal account of the old developer, ask for a transfer now, while the relationship is still friendly.

Do this in writing, and keep the answers.

## 3. Secure access

After a developer leaves, remove their access and rotate the secrets they knew: API keys, database passwords, deployment tokens and any shared logins. This is routine hygiene, not an accusation. It also protects you from an old laptop that nobody wiped.

If you can't tell which secrets exist, that is a finding for the audit, not a reason to wait.

## 4. Get a copy running somewhere safe

Before changing anything, run the app on a laptop or a staging server, with test data. If you can't start it from the repository's instructions, write down every step it takes to make it work. Those notes become the first piece of documentation.

Never use real customer data or real payment keys for this. Create separate test accounts and test keys for each service.

## 5. Check backups and restore one

A backup you have never restored is a hope, not a backup. Find where the database backups go, and restore the latest one into a test database. If there are none, set them up before the first change.

## 6. Read the code in the right order

Read the structure first, not the details:

1. The repository layout and the README.
2. The dependencies list, to see the framework, its version and anything old.
3. The data model, because it shows what the product really does.
4. The routes or pages, to see what users can do.
5. The deployment configuration, to see how a change reaches production.
6. The tests, if any, to see what the old developer considered important.

Note what is solid, what is surprising and what looks risky. Don't fix anything yet.

## 7. Understand how a change reaches production

Answer one question in writing: if I change one line, what are the exact steps until users see it? Who or what builds it, where does it go and how do I undo it? A team that can't answer that is one bad deploy from an outage.

## 8. Add basic visibility

You can't fix what you can't see. Make sure there is some form of error reporting and uptime checking, even a simple one. After a takeover, the first weeks are when hidden problems show up.

## 9. Ship one small change

Pick a harmless fix and ship it through the full process: branch, review, deploy, check, done. This proves the whole path works, and it builds trust between you and the new developer.

## 10. Write down what you learned

Keep a short document with the account list, how to run the app, how to deploy it and the known risks. A takeover is only complete when the next takeover would be easy.

## When to ask for help

If steps 1 to 5 reveal problems you can't resolve, such as missing access or no way to run the code, that is the moment to hire someone to audit it. A short, fixed-price audit tells you what you have before you decide what to do with it.

That's the first thing I do when I take over an app: [read the code and report what is solid and what is risky](/services/take-over-an-app/). If your situation sounds like this one, you can describe it in the contact form and I'll reply with an honest view of whether I can help.
