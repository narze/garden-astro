---
title: "62 - garden-astro - add tests"
date: 2023-07-14
slug: 100daysofcode-r3-62-garden-astro-add-tests
publish: true
tags:
- garden-astro
- 100DaysOfCode 
- testing
- playwright
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/62 - garden-astro - add tests.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/VIHdRut87u0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Test links

To test that all links on the site are working, I'll use [Playwright](https://playwright.dev) as a tool to crawl and test the links.

\#til `document.links` contains all `<a>` links in a page [1] ![](1-Projects/100DaysOfCode-R3/attachments/62%20-%20garden-astro%20-%20add%20tests.png)

The test code will navigate to the homepage, then get all the internal links and `await page.goto()` one by one while excluding already visited pages.

```typescript
test("internal links are working", async ({ page }) => {
  const links = ["/"]
  const visited = new Set<string>()

  while (links.length > 0) {
    const link = links.pop()

    if (!link) break
    if (visited.has(link)) continue

    const response = await page.goto(link)
    expect(
      response?.status(),
      `Link error (code${response?.status()}): ${link} `
    ).toBe(200)

    visited.add(link)
    ;(await getInternalLinks(page)).forEach((link: string) => links.push(link))
  }
})

async function getInternalLinks(page: Page) {
  return await page.evaluate(() => {
    return Array.from(document.links)
      .map((item) => item.href)
      .filter((href) => href.startsWith("http://localhost:3000"))
  })
}
```

If the test fail I'll know the bad links and fix them accordingly.

![](1-Projects/100DaysOfCode-R3/attachments/62%20-%20garden-astro%20-%20add%20tests-1.png)

## CI with Github Actions

Firstly, config the Playwright `webServer` configuration [2], then add the Github Action workflow provided from Playwright installation [3]. I also add Pnpm setup with caching.

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      # Pnpm
      - uses: pnpm/action-setup@v2
        name: Install pnpm
        id: pnpm-install
        with:
          version: 8
          run_install: false
      - name: Get pnpm store directory
        id: pnpm-cache
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT
      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install
      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps
      - name: Build
        run: pnpm run build
      - name: Run Playwright tests
        run: pnpm exec playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

Push code and then see the actions running https://github.com/narze/garden-astro/actions ✅

[1]: https://testerops.com/2022/10/03/getting-all-links-in-a-page-using-playwright

[2]: https://playwright.dev/docs/test-webserver#configuring-a-web-server

[3]: https://playwright.dev/docs/ci-intro#github-actions
