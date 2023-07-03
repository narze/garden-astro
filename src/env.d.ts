/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  DEV: boolean

  pagefind: {
    search: (query: string) => Promise<{ results: any[] }>
  }
}
