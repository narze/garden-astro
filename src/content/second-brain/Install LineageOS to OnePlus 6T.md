---
title: Install LineageOS to OnePlus 6T
date: 2023-10-23
slug: install-lineageos-to-oneplus-6t
publish: true
tags:
  - notes
draft: false
no_feed: false
filepath: src/content/second-brain/Install LineageOS to OnePlus 6T.md
---

*   Download files https://download.lineageos.org/devices/fajita/builds
    *   lineage-20.0-xxx-signed.zip
    *   boot.img
*   Download google apps plugin https://wiki.lineageos.org/gapps
*   Follow installation steps https://wiki.lineageos.org/devices/fajita/install
    *   Unlock bootloader first
    *   Flash recovery with fastboot
        *   `adb reboot bootloader`
        *   Verify with `fastboot devices`
        *   `fastboot flash boot /path/to/boot.img`
        *   Use phone to restart to recovery mode
    *   Download `copy-partitions-xxx-signed.zip` then sideload it
        *   On phone recovery, select Apply Update -> Apply from ADB
        *   `adb sideload /path/to/copy-partitions.zip`
        *   Advanced -> Reboot to recovery
    *   Sideload lineage-xxx.zip
        *   Apply Update -> Apply from ADB
        *   `adb sideload /path/to/lineage-xxx.zip`
        *   It may stop/fail at 47% but it's ok
        *   Reboot to recovery (again, to install GApps)
    *   Sideload google apps
        *   Apply Update -> Apply from ADB
        *   `adb sideload /path/to/MineTheGapps-xxx.zip`
    *   `Reboot system now`
    *   Done!
