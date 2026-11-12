---
title: 'Take Over a Web App From a Previous Developer'
heading: 'I take over web apps that are stuck and ship the next release.'
description: 'Did your developer leave, or does your Lovable or Bolt app break with real users? I audit the code first, then fix it and ship the next release.'
cardTitle: 'Take over a stuck app'
cardSummary: "The developer left, the prototype won't hold up with real users, or the team can't keep up. I read the code, tell you what is solid and what is risky, then ship the next release."
order: 1
updated: 2026-11-09
imageAlt: 'An audited app has a broken path repaired in blue, leading to a finished release'
lead: "The developer left, the prototype won't hold up with real users, or the team can't keep up. I read the code, tell you what is solid and what is risky, then ship the next release."
fit:
  - 'You built the first version with an AI tool such as Lovable, Bolt or Cursor. It works in the demo, but sign-in, payments or data break once real customers use it. I wrote up [how I fix these apps](/blog/how-to-fix-a-vibe-coded-app/) and [the security checks I run first](/blog/vibe-coded-app-security-checklist/).'
  - 'The developer who built your app stopped replying, or left, and nobody else knows how it runs.'
  - 'You have a working product with real users and a backlog that keeps growing.'
  - "An agency handed over a repository and you can't tell whether it is in good shape."
  - 'You have one in-house developer and need a second pair of hands who can start without a long handover.'
notFit: 'Not what you need if you want a brand-new product built from nothing. [MVP development](/services/mvp-development/) covers that.'
gets:
  - title: 'A one-page audit first'
    text: "I read the code, the deployment and the data model, and I run the app. You get one page in plain words. It says what works, what could hurt your customers, whether I'd keep, fix or rebuild, and the fixes in order with a price for each. You can forward it to a co-founder or investor as it is."
  - title: 'You can stop after the audit'
    text: 'The audit has a fixed price. If you stop there, the note is yours to keep and to give to any developer.'
  - title: 'Access stays in your name'
    text: "The repository, hosting, domain and other accounts stay yours. I'm added as a guest."
  - title: 'Nothing goes live without your OK'
    text: "Fixes go in as pull requests you can read, or have someone read for you. If the deployment isn't safe yet, they go to a staging copy first."
  - title: 'A short update every working day'
    text: 'A few lines at the end of each day on what I did and what comes next.'
  - title: 'Notes as I go'
    text: 'How the app runs, how to deploy it and what I changed, so the next developer can start fast.'
steps:
  - title: 'Access, audit and a plan'
    text: 'Read access, a local copy, the audit and a short call to go through the note. We agree what to fix first, or you stop there.'
  - title: 'First fixes and first feature'
    text: "The first fixes and the first small feature, shipped to production if the deployment is safe to use, or to a staging copy if it isn't."
experience:
  - "Since 2022 most of my work has been in codebases other people set up. The largest was caisy's CMS editor, a repository with more than 5,000 commits. I read the data model first, then traced one feature from the screen through the API to the database before I changed anything. At caisy I also built features on Next.js, tRPC and Drizzle codebases, including schema and migrations for Stripe billing and subscriptions."
  - 'On an AI platform for real-estate investors, I audited the live frontend, ranked the problems by how much they hurt users and fixed them in that order. Users whose login had expired used to land on an empty page with no way back to sign-in. One shared handler now catches that on every page. The [audit case study](/work/real-estate-platform-audit/) has the rest.'
  - "On ScriptBee's Next.js app, agent runs took two to ten minutes and were lost if a user refreshed the page. I moved them to background tasks that keep going after the tab closes. The [ScriptBee case study](/work/scriptbee/) has the details."
terms:
  - 'Most of the apps I have taken on were TypeScript, React and Next.js, with Node.js and PostgreSQL behind them.'
  - 'The audit has a fixed price, and you can stop after it. If you want me to carry on, I price the first fixes per phase. After that we agree a monthly retainer or a price per task, depending on how much you need me.'
  - "Tell me what the app does, which stack it uses and what has gone wrong, and I'll reply with next steps."
faq:
  - question: 'The developer who built our app left with no documentation. Can you take it over?'
    answer: 'Yes. I start with read access to the repository and the hosting, run the app locally, and write the missing documentation as I go: how it runs, how it deploys and where the risks are. The audit tells you what is solid before anything changes.'
  - question: 'Can you fix an app built with Lovable, Bolt, Replit or Cursor?'
    answer: 'Yes, if the code can live in a repository you own. I treat it like any app someone handed over. I read it and check sign-in, data access, payments and deployment against what real customers will do, then fix the riskiest parts first. Sometimes keeping the code is right and sometimes a partial rebuild is cheaper. The audit tells you which before you pay for either.'
  - question: 'How long does the first audit take?'
    answer: "It depends on the size of the app. I look at the repository and the deployment first, then tell you how long the audit will take before I start. For a small app it's a few days."
  - question: 'Do I need to give you access to everything on day one?'
    answer: 'No. I start with read access to the repository and the hosting dashboard. Production data, payment keys and admin accounts stay with you until we agree what I need and why.'
  - question: 'Will you break the app for our current users?'
    answer: "Nothing goes to production without your OK. If the deployment isn't safe to use yet, I fix that first and ship to a staging copy until it is."
  - question: 'What if the code is a mess?'
    answer: "Messy code isn't always broken code. The audit lists what is actually broken and says what to keep and what to fix. Nothing gets rewritten until we agree on it. [Fix or rebuild](/blog/fix-or-rebuild-an-inherited-web-app/) covers how I decide."
  - question: 'Can you work next to my other developer?'
    answer: 'Yes. I work in the same repository through pull requests, follow the conventions already there and write down what I change. Your developer or CTO decides what I work on.'
  - question: "We're an agency. Can you take over a client's app for us?"
    answer: 'Yes. I work under your brand and in your tools, and I never contact your client. The audit has a fixed price, so you know your margin before you quote.'
  - question: 'What do I own at the end?'
    answer: 'Everything. The code, the repository, the hosting accounts and the notes stay in your accounts. I work in them as a guest.'
---
