---
layout: post
title: Will this blog make any money?
date: 2023-01-25
draft: "true"
---

Ok, so I ask myself why did I start this blog? And will this blog make any money?

## My answers so far

### 1. Pay it forward

For my projects, I have leveraged the experience of other web-citizens that they have documented in their blogs. I hope this blog helps a reader to achieve their projects.

### 2. As a personal journal

I could make these notes and not publish them. In fact, I have been doing this for more than a year now, but the journal is messy, and the quality is ho-hum. Maybe if I publish it to the Internet there will be a forever-record, somewhat influencing me to up my game. 

My journal started out with a purpose to document work in progress adequately enough that I could keep reasonable productivity after time away from the project - raising three young children takes priority over projects.

And then there is my desire to help my future-self fix what ever I have made when it eventually breaks.

### 3. To make money?

Well, wouldn't that be nice. It would be great to share this bounty with the developers of the tools I use.

However it's 2023, if I'm hoping for advertising revenue, I need to be on YouTube. I really don't want ads on my site. Both because it creates a mess and I don't want telemetry feeding my readers' data to big-tech.

#### Am I running a business?

Not presently. This is a hobby.

If this endeavour became a business at some point in the future it may help to have some historical financial records. I would also need to review the licensing for the tools that I use, as initially I've started using them for non-commercial purposes. To keep my upfront costs down I will use free software where I can. As soon as the money comes pouring in, I'll start purchasing the software licences. Some of this may need to be done retrospectively.

## My tasks for today

1. Track my expenses
2. Track my licences

## Track my expenses using markdown

A quick search and I found [some python that imports markdown into GNUCash](https://codeberg.org/hjacobs/gnucash-markdown-import).

### I ♥ markdown

### I ♥ GNUCash

I have been using GNUCash for my personal finance since version 2.6 and I think it's great. My favourite feature is that you can save the ledgers in a somewhat human-readable text-based file. I then sync to a remote git repository for backup and sharing. Post idea?

### Back to the code

I haven't tested it.

I haven't forked it.

But I'll start using the markdown format:

```md
# 2022-11-29

$1.50 Ice cream
$4.80 Coffee

# 2022-11-30

$32 Groceries
+$60 John paid back
```

My understanding of the markdown parser:

- if the line starts with # then it parses the remainder of the line as a date
- else it parses before the first space as an amount and following the first space as the description and leading + is entered as a negative expense.

### Done

Here it is in all it's glory - [my IoT expense tracker]({% link expense-tracker.md %})

## Track my software licences

Another page to create: [my software licence tracker]({% link licence-tracker.md %})

See you later-ciao!
