---
title: "71 - ChatOS - Setup Firebase Emulator"
date: "2023-07-24 23:00"
slug: 100daysofcode-r3-71-chatos-setup-firebase-emulator
publish: true
tags:
- 100DaysOfCode 
- ChatOS 
- firebase
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/71 - ChatOS - Setup Firebase Emulator.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/NB2st_z-2_k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

https://firebase.google.com/docs/emulator-suite

Setup Firebase CLI & emulator

```shell
curl -sL firebase.tools | bash

# Choose Emulators, and other services you'd like to use e.g. Firestore, Auth
firebase init

# Start emulators
firebase emulators:start
```

Then, connect the app to emulator in your Firebase initialization step. You can add condition to connect to the emulator.

```javascript
import { getAuth, connectAuthEmulator } from 'firebase/auth';

export const auth = getAuth(app);

// Connect to Firebase Emulator only in development
if (process.env.NODE_ENV === 'development') {
	connectAuthEmulator(auth, 'http://localhost:9099');
}
```

Then try logging in, instead of redirecting to Google login, you'll see this page.

![](1-Projects/100DaysOfCode-R3/attachments/71%20-%20ChatOS%20-%20Setup%20Firebase%20Emulator.png)

Then add new account and fill in user information, or auto generate it.

![](1-Projects/100DaysOfCode-R3/attachments/71%20-%20ChatOS%20-%20Setup%20Firebase%20Emulator-1.png)

Adding Firebase Emulator for other services can be done in a similar fashion

```javascript
import { getAuth, connectAuthEmulator, type User } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

export const auth = getAuth(app);
export const firestore = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
	connectAuthEmulator(auth, 'http://localhost:9099');
	connectFirestoreEmulator(firestore, 'localhost', 8080);
}
```
