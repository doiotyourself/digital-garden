---
layout: post
title: "Hello World"
date: 2023-01-24
alias:
  - "Hello-World"
tags:
  - obsolete
  - email
  - GitHub
  - Jekyll
  - Cloudflare
---

Welcome to my blog about the Internet of Things.

Today I created this blog. It took a few hours to go from email address signup to first post published.

Here is how.

## First Step - Create an email address

Thank you Gmail.

## Step Two - Create a GitHub account

Thank you GitHub for [github.com/doiotyourself](https://github.com/doiotyourself/).

## Step Three - Fork Jekyll Now

I'm following [this guide in Smashing Magazine](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/). I did what they said and forked the [Jekyll Now repository](https://github.com/barryclark/jekyll-now).

## Review progress

GitHub wasn't publishing my page on github.io. I needed to make a commit on master to kick off the build. I was logged in to GitHub so I made a minor change to `_config.yml` using the browser editor.

OK we're online at [GitHub pages](https://doiotyourself.github.io).

## Step Four - Register my domain name

- Create a Cloudflare account
- Register the domain [doiotyourself.com](https://doiotyourself.com).

## What is this? Cloudflare Pages

Hmm, looks very cool but I can host a static page with a [custom domain at GitHub pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site). Yeah-but, SSL works out of the box with Cloudflare pages and it is two-clicks simple to set up the DNS record for my domain. Cloudflare you won me over.

## Step Five - Migrate jekyll from GitHub pages to Cloudflare pages

I'll follow [this guide at Cloudflare Docs](https://developers.cloudflare.com/pages/migrations/migrating-jekyll-from-github-pages/). It says I have to create a Gemfile and install the github-pages gem. It is time to clone the repository to my local machine.

## Detour

I'm on a fresh installation of [NeptuneOS](https://neptuneos.com/) so there were a few extra steps to get my environment setup.

### Install jekyll

Easy, it's in Muon package manager.

### Install VSCodium

VSCodium is the first software that I haven't found in the package manager. Never mind, to install it is as easy as:

``` console
$ sudo apt install extrepo
$ sudo extrepo enable vscodium
$ sudo apt update
$ sudo apt install codium
```

### Configure Git

This is a fresh install so I have to go through the basics:

```console
$ git config --global user.name "josh-sanders"
$ git config --global user.email "josh@doiotyourself.com"
```

```console
$ git config --global user.name "josh-sanders"
$ git config --global user.email "josh@doiotyourself.com"
```

### [Add new ssh key to my GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

### Invite a collaborator

In the the diyiotyourself GitHub account I invited [my personal GitHub account](https://github.com/josh-sanders/) to [collaborate on the repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository).Then switch accounts and accept the invitation.

### `$ git clone`

At this point I can sync local changes with master.

## Step Five - continued

[Complete this section](https://developers.cloudflare.com/pages/migrations/migrating-jekyll-from-github-pages/#preparing-your-github-pages-repository).

## Step Six - Cloudflare Pages setup

Cloudflare pages is very user friendly.

- create a project
- link to GitHub repository. (Very easy when logged in to GitHub account in the same browser.)
- setup build
- deploy to [Cloudflare Pages](https://doiotyourself.pages.dev).

## Step Seven - Set up custom domain to point to my site

Final step for tonight is setup the DNS records for my new domain. This is very easy when the domain is registered with Cloudflare. There's a tab in your Pages project called 'custom domains' - click and go.

Thanks for visiting [doiotyourself.com](https://doiotyourself.com).

## Bonus Step - Set up email forwarding to Gmail

I'll add DNS configuration to forward emails sent to <josh@doiotyourself.com> to the email account that I setup in Step One. [Start here](https://dash.cloudflare.com/?to=/:account/:zone/email/overview) - it's only 3 clicks to set up.

Sent a test email from another Gmail account to <josh@doiotyourself.com>. Cloudflare forwarded it but Gmail put it in spam. Need to do further testing.

See you soon.
