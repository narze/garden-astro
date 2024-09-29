---
title: "79 - ChatOS - Generate encryption key with PBKDF2"
date: 2023-08-07
slug: 100daysofcode-r3-79-chatos-generate-encryption-key-with-pbkdf2
publish: true
tags:
- encryption
- ChatOS
- 100DaysOfCode
- pbkdf2
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/79 - ChatOS - Generate encryption key with PBKDF2.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/mObgce2vE7A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[Yesterday](/100daysofcode-r3-78-chatos-encrypt-message-with-tweetnacl-js) I added TweetNaCl.js to encrypt chat messages, by the way it needs a 32-byte encryption key, it is strong but long and hard to memorize.

Using PBKDF2 will enable user to use their own passphrase and generate longer keys, I'll use [`@noble/hashes`](https://www.npmjs.com/package/@noble/hashes) package since it's quite popular and have TypeScript support built-in.

The usage is simple:

```typescript
import { pbkdf2Async } from '@noble/hashes/pbkdf2';
import { sha256 } from '@noble/hashes/sha256';
import { encodeBase64 } from 'tweetnacl-util'; // TweetNaCl needs base64 formatted key

const key = encodeBase64(
    await pbkdf2Async(sha256, "passphrase", 'some-salt', { 
        c: 300000, // No. of iterations
        dkLen: 32, // Length of key
    })
);

localStorage.setItem('encryption-key', key);
```

## PBKDF2 References

* https://en.wikipedia.org/wiki/PBKDF2
* https://support.1password.com/pbkdf2
* https://stackoverflow.com/questions/11298184/about-how-fast-can-you-brute-force-pbkdf2
