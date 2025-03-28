---
title: How to hide Qwerty layout from macOS
date: 2023-12-09
slug: how-to-hide-qwerty-layout-from-macos
publish: true
tags:
  - commandline
  - notes
draft: false
no_feed: false
filepath: src/content/second-brain/How to hide Qwerty layout from macOS.md
---

![350](attachments/How%20to%20hide%20Qwerty%20layout%20from%20macOS.png)

If you add non standard English keyboard layout to macOS, the default one `ABC` aka. Qwerty cannot be removed in macOS settings as normally it will cause trouble if there are no English layouts left on the system.

To remove it you have to edit the plist file, first select your non standard English layout. Then edit the plist file using these commands in terminal.

```shell
# Convert .plist fincle so that it can be edited in text editors rather than XCode
plutil -convert xml1 ~/Library/Preferences/com.apple.HIToolbox.plist

# Use your favorite text editor such as vim or vscode
code ~/Library/Preferences/com.apple.HIToolbox.plist
```

Delete `<dict>...</dict>` which has layout name which you want to remove e.g. `ABC`

![How to hide Qwerty layout from macOS-1|600](attachments/How%20to%20hide%20Qwerty%20layout%20from%20macOS-1.png)

Save the file, and restart the mac.

![350](attachments/How%20to%20hide%20Qwerty%20layout%20from%20macOS-2.png)
