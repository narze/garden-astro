import { test, expect, Page } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/garden/)
})

test("internal links are working", async ({ page }) => {
  test.setTimeout(5 * 60 * 1000)

  const links = ["/"]
  const visited = new Set<string>()
  const linkFromPage: Map<string, string[]> = new Map()

  while (links.length > 0) {
    const link = links.pop()

    if (!link) {
      break
    }

    if (visited.has(link) || link.includes("localhost:3000/blog")) {
      continue
    }

    const response = await page.goto(link)
    expect(
      response?.status(),
      `Invalid link (${response?.status()}): ${link} (from ${linkFromPage.get(
        link
      )}`
    ).toBe(200)

    visited.add(link)

    const pageLinks = await getInternalLinks(page)

    pageLinks.forEach((link: string) => {
      links.push(link)

      if (!linkFromPage.has(link)) {
        linkFromPage.set(link, [])
      }

      linkFromPage.get(link)?.push(page.url())
    })
  }
})

async function getInternalLinks(page: Page) {
  return await page.evaluate(() => {
    return Array.from(document.links)
      .map((item) => item.href)
      .filter((href) => href.startsWith("http://localhost:3000"))
  })
}
