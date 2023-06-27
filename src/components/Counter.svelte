<!-- Svelte Counter -->
<script>
  export let count = 0
</script>

<button on:click={() => (count += 1)}>Svelte Counter: {count}</button>
