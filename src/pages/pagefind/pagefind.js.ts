import type { APIContext } from "astro"

// A quick hack to mock pagefind out on development
// Ref. https://blog.otterlord.dev/post/astro-search/#adding-a-dev-endpoint

export async function get({}: APIContext) {
  return {
    body: `export const search = async () => {
      // Wait for 0.5 second to simulate a slow network
      await new Promise((resolve) => setTimeout(resolve, 500))

      return {
        results: [
          {
            data: () => ({
              url: "/",
              meta: {
                title: "Homepage",
              },
              excerpt: "This is the fake result for development",
            })
          },
          {
            data: () => ({
              url: "/tags",
              meta: {
                title: "Tags",
              },
              excerpt: "This is the tag pages",
            })
          },
        ]
      }
    }`,
  }
}
