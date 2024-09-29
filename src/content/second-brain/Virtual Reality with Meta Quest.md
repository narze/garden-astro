---
title: "Virtual Reality with Meta Quest"
date: 2022-11-19
slug: virtual-reality-with-meta-quest
publish: true
tags:
- 
filepath: src/content/second-brain/Virtual Reality with Meta Quest.md
---

*   Virtual desktop app with macOS support
    *   https://www.vrdesktop.net
    *   https://immersed.com
        *   https://medium.com/immersedteam/working-from-orbit-39bf95a6d385
*   SideQuest - 3rd party app store
*   BeatSaber custom songs with BMBF
    *   Setting up BMBF
        *   https://bsmg.wiki/quest-modding.html#installing-bmbf-with-sidequest
    *   Downgrading BeatSaber to latest moddable version https://oculusdb.rui2015.me/id/2448060205267927
    *   MoonRider WebXR (Uses song from Beatsaver) - https://moonrider.xyz
    *   Mods https://computerelite.github.io/tools/Beat\_Saber/questmods.html
        *   Install by opening BMBF on quest, go to Tools page, open browser with IP shown (port 50000), drag `.qmod` files in.
*   [McOsu](https://store.steampowered.com/app/607260/McOsu) has VR support

# Tips

*   Disabling Proximity sensor (Sleep when taking the headset off)
    *   https://smartglasseshub.com/disable-quest-2-proximity-sensor
        *   SideQuest -> Headset Settings
        *   Meta Quest Developer Hub application
        *   `adb`
            *   `cd "/Applications/Meta Quest Developer Hub.app/Contents/Resources/bin"`
*   Use `scrcpy` to cast screen from Quest to macOS
    *   `scrcpy -b25M --crop 1600:900:2017:510`
    *   However, the audio is not casting and `sndcpy` does not work with my Quest
*   https://www.youtube.com/watch?v=Ora7OrQHwEs

# Troubleshooting

*   Beatsaber settings not persisted
    *   Upload JSON setting to `ModData/com.beatgames.beatsaber/Mods/datakeeper/settings.cfg`  ![](attachments/Pasted%20image%2020221203222732.png)
