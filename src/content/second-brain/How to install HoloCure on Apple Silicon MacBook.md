---
title: How to install HoloCure on Apple Silicon MacBook
date: 2023-09-16
slug: how-to-install-holocure-on-apple-silicon-macbook
publish: true
tags:
  - game
  - macos
draft: false
no_feed: false
filepath: src/content/second-brain/How to install HoloCure on Apple Silicon MacBook.md
---

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-8.png)

Tested on MacBook M1 Pro with macOS Ventura 13.5.2

*   Download and unzip [HoloCure](https://kay-yu.itch.io/holocure) to a folder
*   Install tweaked [WineskinServer](https://github.com/Gcenx/WineskinServer)

```shell
brew install --cask --no-quarantine gcenx/wine/wineskin
```

*   Open app `Wineskin Winery`

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-1.png)

*   Click `+` and choose engine `WS11WineCX64Bit22.1.1-14`, then click `Download and Install`
    ![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook.png)

*   (Don't choose the engine with `D3DMetal` as it only works on newer macOS Sonoma)

*   Choose the downloaded engine, then click `Create New Blank Wrapper`

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-2.png)

*   Name it however you like, click OK, and then wait for a while until it's finished

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-3.png)

*   Click `View wrapper in Finder` then open the created wrapper app

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-4.png)

*   Click `Install Software`

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-5.png)

*   Click `Copy a Folder Inside` then choose the HoloCure folder that you unzipped, you should see `HoloCure.exe` in the folder before clicking `Choose`

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-6.png)

*   Click OK to confirm choosing HoloCure.exe

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-7.png)

*   Quit `Wineskin` then open `HoloCure.app` again
*   Now the game is playable! Have fun!

![](attachments/How%20to%20install%20HoloCure%20on%20Apple%20Silicon%20Chip%20MacBook-9.png)

*   Improve fps stability by adding Winetricks plugin [following this guide](https://www.reddit.com/r/holocure/comments/110maj2/holocure_works_perfectly_on_my_macbook_air_m1)
