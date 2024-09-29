---
title: "*.localhost subdomains"
date: 2023-07-25
slug: star-dot-localhost-subdomains
publish: true
tags:
- til 
filepath: src/content/second-brain/star.localhost subdomains.md
---

I have been developing many projects and a lot of them share the same port `3000`, this causes the browser history to have many urls with `localhost:3000` while the path is from different websites.

![](attachments/star.localhost%20subdomains.png)

I previously used `lvh.me` subdomains to separate local projects like so:

*   foo.lvh.me
*   bar.lvh.me:3000
*   whatever.lvh.me:3000

All of them will resolves to `localhost`, but if I'm off the grid and I have no network access I'm out of luck.

Until I found out that [`*.localhost` also works natively on Firefox and Chromium browsers.](https://stackoverflow.com/a/67877376) and so it works on [Arc](https://arc.net) too!

So I'm now adapting to use `projectname.localhost:port` from now on to make my browser history more searchable.

![](attachments/star.localhost%20subdomains-1.png)
