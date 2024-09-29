---
title: "56 - puppeteer rabbit hole"
date: 2023-07-05
slug: 100daysofcode-r3-56-puppeteer-rabbit-hole
publish: true
tags:   
- #puppeteer
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/56 - puppeteer rabbit hole.md
---

pomo

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/Ma-alp_6K58" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

I plan to replace Open Graph Image of each page in this website, since now it's `Built with Astro` default image. ![](1-Projects/100DaysOfCode-R3/attachments/56%20-%20puppeteer%20rabbit%20hole.png)

There are many solutions, one of them is to take a screenshot of the page and use it as the OG image. The popular idea is to use Puppeteer with Serverless Function like AWS Lambda or Vercel. Here are the ones that I found and try to copy™️ it and host on my Vercel account.

*   https://github.com/choraria/pptr-io
*   https://github.com/vijayhardaha/webscreenshot.now.sh
*   https://github.com/dtinth/personal-puppeteer

By the way, as I try to run it I found some blockers, such as Vercel has function size limit at 50mb. So I have to use `chrome-aws-lambda` like everyone did previously.

![](1-Projects/100DaysOfCode-R3/attachments/56%20-%20puppeteer%20rabbit%20hole-1.png)

But `chrome-aws-lambda` is quite outdated and cannot run on newer NodeJS versions, I tried the fork version `@sparticuz/chrome-aws-lambda` and switch Chromium & NodeJS version and settled on `@sparticuz/chrome-aws-lambda@v14.4.1` and NodeJS v14

(The newer package `@sparticuz/chromium` & `@sparticuz/chromium` does not work with Vercel as I tried both and got size limit and timeouts.)

![](1-Projects/100DaysOfCode-R3/attachments/56%20-%20puppeteer%20rabbit%20hole-5.png)

The rabbit hole goes on and on, since Vercel will drop Node v14 deployments next month I cannot use the existing code after the deadline. ![](1-Projects/100DaysOfCode-R3/attachments/56%20-%20puppeteer%20rabbit%20hole-2.png)

By the way @Thai did comment in the livestream regarding `personal-puppeteer`

(Youtube)
![](1-Projects/100DaysOfCode-R3/attachments/56%20-%20puppeteer%20rabbit%20hole-3.png)

(Twitch)
![](1-Projects/100DaysOfCode-R3/attachments/56%20-%20puppeteer%20rabbit%20hole-4.png)

I finally deployed pptr-io to https://pptrio.narze.live but it still returns 504 timeout 🫠

I'll learn how to use Google Cloud Run soon

References:

*   https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725
*   https://github.com/orgs/vercel/discussions/103
*   https://github.com/dtinth/pptraas
