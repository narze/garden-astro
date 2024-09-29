---
title: "VSCode Extension Pack"
date: 2023-01-01
slug: vscode-extension-pack
publish: true
tags:
- 
filepath: src/content/second-brain/VSCode Extension Pack.md
---

1.  Install Yeoman & `generator-code`
    ```shell
    npm install -g yo generator-code
    ```
2.  Bootstrap VSCode extension pack
    ```shell
    yo code
    # Choose "New Extension Pack"
    ```
3.  Edit `package.json` -> `extensionPack`
4.  Publish
    ```shell
    vsce publish
    ```
