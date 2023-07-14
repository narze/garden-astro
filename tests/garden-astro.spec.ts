import { test, expect, Page } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/garden/)
})

test("internal links are working", async ({ page }) => {
  const links = ["/"]
  const visited = new Set<string>()

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
