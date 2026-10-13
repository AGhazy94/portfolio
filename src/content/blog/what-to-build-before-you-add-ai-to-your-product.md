---
title: What to build before you add AI to your product
description: A checklist for adding an LLM feature or an agent to a real product, from the narrow job to limits, logging and a person in the loop.
published: 2026-10-14
updated: 2026-10-14
faq:
  - question: Should I start with an agent or a simple LLM call?
    answer: Start with the simplest thing that does the job, usually one model call with a clear prompt. Add tools and multiple steps only when a single call can't do it, because each step adds cost, delay and ways to fail.
  - question: How do I know whether the AI feature is good enough?
    answer: Write down 20 to 50 real examples with the answers you'd accept, and run the feature against them every time you change it. Without that list, you are judging by feel.
  - question: Do I need to train my own model?
    answer: Almost never for a first version. Hosted models through an API are enough to find out whether people want the feature. Training is a later decision, with a real reason.
---

Adding AI to a product has become easy to start and hard to finish. A demo takes an afternoon. A feature that is reliable, affordable and safe for real users takes planning. This is the list I'd work through before and during the build, whether you hire someone or do it yourself.

I build web apps with AI features, so a lot of this comes from the product side, not the model side.

## 1. Choose one narrow job

"Add an AI assistant" is not a job. "Draft a reply to a customer email using the order history" is. A narrow job gives you something you can test, price and improve. A broad one gives you something that is sometimes impressive and often wrong.

Write the job in one sentence, and write down what the AI should not do.

## 2. Decide how you'll know it works

Before building, collect 20 to 50 real examples: the input, and the output you would accept. This is your test set. You'll run the feature against it each time you change the prompt, the model or the code.

Without a test set, every change is a guess, and a fix for one case quietly breaks another.

## 3. Start with the simplest thing

Often one model call with a clear prompt does the job. Reach for tools and multi-step agents only when a single call can't. Each extra step adds cost, waiting time and a new way to fail.

When you do need an agent, give it a small set of tools with clear names, and limit what each can do. A tool that can read is safer than one that can write, and a tool that can write should ask for confirmation.

## 4. Keep a person in the loop for anything that matters

Models make confident mistakes. For anything that sends a message, changes data or spends money, let a person review it first. You can loosen this later, for the cases where the test set shows the feature is reliable.

## 5. Plan for slow and long tasks

Model calls can take seconds, and agent tasks can take minutes. Don't make the user stare at a frozen page.

- Show output as it arrives where you can (streaming).
- Run long tasks in the background, with a progress indicator and a way to come back.
- Handle failure: a retry, a clear message and a way to continue.

This is ordinary product work, and it is where many AI demos fall apart.

## 6. Set limits and watch the cost

Model usage is billed per use, and a bug or a heavy user can run up a large bill quickly.

- Cap the size of the input.
- Limit how often one user can call the feature.
- Set a spending limit with your provider.
- Log how much each call costs, so you can see the cost per user and per feature.

## 7. Log what was asked and answered

When something goes wrong, you need to see the input, the prompt, the output and the error. Store these safely, with care for personal data. Logs are how you find the 5% of cases that your test set didn't cover, and they become part of the test set.

## 8. Think about the data you're sending

What you send to a model provider leaves your system. Decide what is allowed to go: customer names, emails, documents. Read the provider's data terms. Remove what the task doesn't need.

## 9. Make it easy to turn off

Put the feature behind a switch. If the provider has an outage, or the feature misbehaves, you can turn it off without a deploy, and the rest of the product keeps working.

## 10. Tell users what it is

Say clearly that a feature is AI-generated, and give users a way to correct or report a bad answer. Trust grows when users can see the limits.

## A sensible order of work

1. Write the one-sentence job and the "must not" list.
2. Collect the test set.
3. Build the simplest version behind a sign-in and a switch.
4. Add logging and limits.
5. Try it with a few real users.
6. Improve using their examples, and add them to the test set.
7. Only then widen the scope.

## Where I fit

I build the product around the AI feature: the interface, the calls to the model, the tools, the background tasks, the data and the deployment. I've done this on ScriptBee, where I built the chat interface and the background tasks, and on caisy, where I added AI translation to an editor. I don't train models or build research-heavy retrieval systems.

If you have a feature in mind, [the AI page](/services/ai-products-and-agents/) explains how I'd approach it, and the contact form is the place to describe the job and the data it needs.
