---
title: "Glob import modules with Vite"
date: 2023-07-19
slug: glob-import-modules-with-vite
publish: true
tags:
- javascript
- vite
filepath: src/content/second-brain/Glob import modules with Vite.md
---

By default it is not possible to import multiple files without specifying the filename in Javascript (It's possible in NodeJS though by [using `fs`](https://stackoverflow.com/a/55049040) )

```javascript
fs.readdir('./someDir', (err, files) => {
    files.forEach(file => {
        const module = import('./' + file).then(m =>
            m.callSomeMethod()
        )
        // or const module = await import('file')
    })
})
```

In [Vite](https://vitejs.dev), there is a way to import all the files with wildcard by using `import.meta.glob` [1]

```javascript
const modules = import.meta.glob('./dir/*.js')
```

The code will then be transform by Vite after build:

```javascript
const modules = { 
    './dir/foo.js': () => import('./dir/foo.js'),
    './dir/bar.js': () => import('./dir/bar.js'),
}
```

Then you can loop through each module to use it like so:

```javascript
for (const path in modules) {
    modules[path]().then((mod) => {
        console.log(path, mod)
    })
}

// Or

Object.keys(modules).map((path) => {
    const mod = modules[path]()
    console.log(path, mod)
});
```

If you want it to be immediately loaded, add `eager: true` option

```javascript
const modules = import.meta.glob('./dir/*.js', { eager: true })

Object.keys(modules).map((path) => {
    const mod = modules[path].default // Already loaded so it's the actual module
});
```

[1]: https://vitejs.dev/guide/features.html#glob-import
