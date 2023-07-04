/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  DEV: boolean

  pagefind: {
    debouncedSearch: (
      query: string,
      options?: Record<string, any>,
      debounceTime?: number
    ) => Promise<{ results: any[] }>
  }
}
