---
title: "77 - ChatOS - Trying encryption libraries"
date: 2023-08-04
slug: 100daysofcode-r3-77-chatos-trying-encryption-libraries
publish: true
tags:
- 100DaysOfCode
- ChatOS
- devlog
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/77 - ChatOS - Trying encryption libraries.md
---

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fnarze%2Fposts%2Fpfbid0yLYZ1se1Xm589oCcBiqGv99KnsddP4AyUjQZ7PfvEZC9bdKsTZNaL8Wwb6hqHxPLl&show_text=true&width=500" width="500" height="576" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/4EM8BWhr3Fg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Libraries

*   **Themis** https://www.cossacklabs.com/themis [Github](https://github.com/cossacklabs/themis)
    *   Bear app case study
*   **TweetNaCl.js** https://www.npmjs.com/package/tweetnacl
    *   https://tweetnacl.js.org/#/box

## Resources

*   Keybase Book - Crypto Chat https://book.keybase.io/docs/chat/crypto
*   \[Google Cloud - Security Key Management]\(<https://cloud.google.com/security-key-management>
*   [Kerckhoffs' Principle](https://en.wikipedia.org/wiki/Kerckhoffs%27s_principle) -

Key features to use on ChatOS:

*   Works on browser
*   User can choose any passphrase, long or short
*   End-to-end encryption (Firebase admin cannot decrypt the content)
*   Preferrably 1-key
*   Not too slow

Themis has wasm port - need to append `?url` when imported. https://vitejs.dev/guide/features.html#webassembly

You can try at https://try-encryption-libs.vercel.app (Github: https://github.com/narze/try-encryption-libs)

![](1-Projects/100DaysOfCode-R3/attachments/77%20ChatOS%20-%20Trying%20encryption%20libraries.png)

Themis is very slow I dunno why...

![](1-Projects/100DaysOfCode-R3/attachments/77%20ChatOS%20-%20Trying%20encryption%20libraries-1.png)

![](1-Projects/100DaysOfCode-R3/attachments/77%20ChatOS%20-%20Trying%20encryption%20libraries-2.png)

Passphrase method use PBKDF2 with more than 100k iterations so it takes 2.5 seconds to encrypt, maybe I'll find other libraries to convert passphrase to symmetric key separately.

Found out later that it's 314110 rounds. 🫠

![](1-Projects/100DaysOfCode-R3/attachments/77%20ChatOS%20-%20Trying%20encryption%20libraries-3.png)
