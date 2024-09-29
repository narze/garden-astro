---
title: "Extract Saved Wi-Fi password on macOS"
date: 2023-07-27
slug: extract-saved-wifi-password-on-macos
publish: true
tags:
- til
- command-line 
filepath: src/content/second-brain/Extract Saved Wi-Fi password on macOS.md
---

Today I learned that I can get saved wifi passwords from macOS Keychain via command line.

```shell
security find-generic-password -ga YOUR_WIFI_SSID | grep "password:"
```

That will ask me to fill in the administrator password, use your macOS login should work.

## Resource

<https://www.howtogeek.com/656994/how-to-see-all-your-saved-wi-fi-passwords-on-macos/>
