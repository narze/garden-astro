<script lang="ts">
  export let projects: Project[] = []

  let filterTag = ""

  interface Project {
    name: string
    description: string
    source_url: string
    website_url: string
    tags: string[]
    image_url?: string
  }

  const imageUrl = (url: string) =>
    `https://pptr.io/api/screenshot?width=400&height=300&deviceScaleFactor=1&dark=1&url=${url}`

  $: filteredProjects = projects.filter((project) => {
    if (!filterTag?.length) {
      return true
    }

    return project.tags?.includes(filterTag)
  })
</script>

{#if filterTag?.length}
  Filter: <button
    class="px-2 py-1 mb-4 mr-1 text-xs font-medium tracking-wide text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-200"
    on:click={() => (filterTag = "")}>{filterTag} x</button
  >
{/if}

<main
  class="not-prose grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-cols-fr gap-4"
>
  {#each filteredProjects as project}
    <div
      class="maxw-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <img
        class="rounded-t-lg object-cover w-full"
        src={project.image_url ?? imageUrl(project.website_url)}
        alt={project.name}
      />
      <div class="p-5 prose">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {project.name}
        </h5>

        {#if project.tags?.length}
          <div class="flex flex-wrap mb-3 -mx-1">
            {#each project.tags as tag}
              <button
                class="px-2 py-1 mb-1 mr-1 text-xs font-medium tracking-wide text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-200"
                on:click={() => (filterTag = tag)}
              >
                {tag}
              </button>
            {/each}
          </div>
        {/if}

        {#if project?.description?.length}
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {project.description}
          </p>
        {/if}

        <div class="flex justify-end gap-2">
          {#if project.website_url}
            <a
              href={project.website_url}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
            >
              Website
            </a>
          {/if}

          {#if project.source_url}
            <a
              href={project.source_url}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
            >
              Source
            </a>
          {/if}
        </div>
      </div>
    </div>
  {/each}
</main>
