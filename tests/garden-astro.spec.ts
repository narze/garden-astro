import { test, expect, Page } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/garden/)
})

test("internal links and images are working", async ({ page }) => {
  test.setTimeout(5 * 60 * 1000)

  const links = ["/"]
  const visited = new Set<string>()
  const linkFromPage: Map<string, string[]> = new Map()

  const brokenImages = []

  while (links.length > 0) {
    const link = links.pop()

    if (!link) {
      break
    }

    if (visited.has(link) || link.includes("localhost:4321/blog")) {
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

    // Test images on the page
    const locator = page.locator("img")
    const images = await locator.evaluateAll((imgs: HTMLImageElement[]) =>
      imgs
        .map((img) => img.src)
        .filter((src) => src.startsWith("http://localhost:4321"))
    )

    for (const imageSrc of images) {
      const isLoaded = await page.evaluate(isImageLoaded, imageSrc)
      if (!isLoaded) {
        console.error("Broken image", imageSrc, "on page", link)

        brokenImages.push({ image: imageSrc, page: link })
      }
    }
  }

  expect(brokenImages.length).toEqual(0)
})

async function getInternalLinks(page: Page) {
  return await page.evaluate(() => {
    return Array.from(document.links)
      .map((item) => item.href)
      .filter((href) => href.startsWith("http://localhost:4321"))
  })
}

async function isImageLoaded(src: string) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}
