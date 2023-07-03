<script lang="ts">
  import { onMount } from "svelte"

  let searchEntry: string = ""
  let results: any[] = []

  $: if (searchEntry.length == 0) {
    results = []
  } else {
    doSearch(searchEntry)
  }

  async function doSearch(searchEntry: string) {
    const search = await window.pagefind.search(searchEntry)

    const resultsTemp = []

    for (const result of search.results) {
      const data = await result.data()
      resultsTemp.push(data)
    }

    results = resultsTemp
  }
</script>

<input
  id="search"
  type="text"
  class="hidden text-black dark:text-white bg-slate-300 dark:bg-slate-600 p-2 py-1 rounded"
  placeholder="Search"
  bind:value={searchEntry}
/>

{#if results.length}
  <div
    id="results"
    class="absolute top-20 left-0 w-full h-full bg-white dark:bg-slate-800"
  >
    <div class="container max-w-3xl">
      <ul>
        {#each results as result}
          <li class="border border-slate-500 rounded px-4 py-6 my-2">
            <a href={result.url}>
              <h3>{result.meta.title}</h3>
              <p>{result.excerpt}</p>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<svelte:head>
  <script>
    ;(async function () {
      if (document.querySelector("#search").dataset.loaded !== "true") {
        document.querySelector("#search").dataset.loaded = "true"
        document.querySelector("#search").classList.remove("hidden")
        window.pagefind = await import("/pagefind/pagefind.js")
      }
    })()
  </script>
</svelte:head>
