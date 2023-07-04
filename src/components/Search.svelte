<script lang="ts">
  let searchEntry: string = ""
  let results: any[] = []
  let loading = false

  $: if (searchEntry.length == 0) {
    results = []
  } else {
    doSearch(searchEntry)
  }

  async function doSearch(searchEntry: string) {
    loading = true
    const search = await window.pagefind.debouncedSearch(searchEntry)

    if (!search) {
      // a more recent search call has been made, nothing to do
      return
    }

    const resultsTemp = []

    for (const result of search.results) {
      const data = await result.data()
      resultsTemp.push(data)
    }
    loading = false

    results = resultsTemp
  }
</script>

<input
  id="search"
  type="text"
  disabled={true}
  class="text-black dark:text-white bg-slate-300 dark:bg-slate-600 p-2 py-1 rounded"
  placeholder="Search"
  bind:value={searchEntry}
/>

{#if searchEntry.length}
  <div
    id="results"
    class="absolute top-20 left-0 w-full h-full bg-white dark:bg-slate-800"
  >
    <div class="container max-w-3xl">
      {#if loading}
        <p class="text-center mt-4">Searching...</p>
      {:else if results.length}
        <ul>
          {#each results as result}
            <li class="border border-slate-500 rounded px-4 py-6 my-2">
              <a href={result.url}>
                <h3>{result.meta.title}</h3>
                <!-- Pagefind will return <mark> tags -->
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                <p>{@html result.excerpt}</p>
              </a>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-center mt-4">No results found.</p>
      {/if}
    </div>
  </div>
{/if}

<svelte:head>
  <script>
    ;(async function () {
      if (document.querySelector("#search").dataset.loaded !== "true") {
        document.querySelector("#search").dataset.loaded = "true"
        // document.querySelector("#search").classList.remove("hidden")
        document.querySelector("#search").removeAttribute("disabled")
        window.pagefind = await import("/pagefind/pagefind.js")
      }
    })()
  </script>
</svelte:head>
