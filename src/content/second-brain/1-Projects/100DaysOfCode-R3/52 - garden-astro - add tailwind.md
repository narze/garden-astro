---
title: "52 - garden-astro - add tailwind"
date: 2023-06-30
slug: 100daysofcode-r3-52-garden-astro-add-tailwind
publish: true
tags:
- Astro
- Digital-Garden
- 100DaysOfCode
- tailwind
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/52 - garden-astro - add tailwind.md
---

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/UQwJ9h1wR3Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

* `pnpm astro add tailwind`
* `pnpm install -D @tailwindcss/typography`
* Add dark mode with switch [ref.](https://www.kevinzunigacuellar.com/blog/dark-mode-in-astro)

```html
<script is:inline>
  const theme = (() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })();

  if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
  window.localStorage.setItem("theme", theme);
</script>
```

* Wrap everything into layout

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />
        <DarkModeScript />
	</head>
	<body class="flex flex-col h-[100svh] bg-white dark:bg-slate-800 text-black dark:text-white">
		<Header title={SITE_TITLE} />
		<main>
            <slot />
		</main>
		<Footer />
	</body>
</html>
```

* Dark theme switcher (Svelte)

```html
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
```

Here's how it look like as of today

![](1-Projects/100DaysOfCode-R3/attachments/Pasted%20image%2020230701000858.png)
