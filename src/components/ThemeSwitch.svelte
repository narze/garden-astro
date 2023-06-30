<script lang="ts">
  let theme = localStorage.getItem("theme") ?? "light"

  $: {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light"
  }
</script>

<button on:click={toggleTheme}>{theme === "light" ? "🌞" : "🌙"}</button>
