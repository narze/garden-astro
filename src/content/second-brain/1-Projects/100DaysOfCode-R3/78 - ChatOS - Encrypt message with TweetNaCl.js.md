---
title: "78 - ChatOS - Encrypt message with TweetNaCl.js"
date: "2023-08-06 22:00"
slug: 100daysofcode-r3-78-chatos-encrypt-message-with-tweetnacl-js
publish: true
tags:
- 100DaysOfCode
- ChatOS
- encryption
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/78 - ChatOS - Encrypt message with TweetNaCl.js.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/U3mHOdgJDgc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

After [trying encryption libraries](/100daysofcode-r3-77-chatos-trying-encryption-libraries), I will go with secret key symmetric encryption by using [TweetNaCl.js](https://tweetnacl.js.org)

The logic is quite simple, if the encryption key is set in localstorage (I'll improve this workflow later) then the message will be encrypted and sent to Firestore with `encrypted: true`

```typescript
const encryptionKey = localStorage.getItem('encryption-key');

if (encryptionKey) {
    const encryptedMessage = encryptMessage(message, encryptionKey);

    await messagesCollection.add({
        message: encryptedMessage,
        time: Timestamp.now(),
        type: 'text',
        encrypted: true
    });
} else {
    await messagesCollection.add({
        message,
        time: Timestamp.now(),
        type: 'text'
    });
}
```

Then, when the chat is retrieved, it will check that whether they are the encrypted messages and then try to decrypt them.

```typescript
if (message.encrypted) {
    const key = localStorage.getItem('encryption-key');

    if (!key) {
        return '[no encryption key set]';
    }

    try {
        const decrypted = decryptMessage(message.message, key);

        return decrypted;
    } catch (e) {
        console.info(e);
        return '[decryption failed]';
    }
} else {
    return message.message;
}
```

Both `encryptMessage` and `decryptMessage` functions are wrappers of `tweetnacl` & `tweetnacl-util`, they'll use the key to encrypt the payload and embed with nonce, and vice-versa for decryption.

```typescript
const encryptMessage = (json: string, key: string) => {
    const keyUint8Array = decodeBase64(key);
    const nonce = randomBytes(secretbox.nonceLength);
    const messageUint8 = decodeUTF8(JSON.stringify(json));
    const box = secretbox(messageUint8, nonce, keyUint8Array);

    const fullMessage = new Uint8Array(nonce.length + box.length);
    fullMessage.set(nonce);
    fullMessage.set(box, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
};

const decryptMessage = (messageWithNonce: string, key: string) => {
    const keyUint8Array = decodeBase64(key);
    const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
    const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
    const message = messageWithNonceAsUint8Array.slice(
        secretbox.nonceLength,
        messageWithNonce.length
    );
    
    const decrypted = secretbox.open(message, nonce, keyUint8Array);
    
    if (!decrypted) {
        throw new Error('Could not decrypt message');
    }
    
    const base64DecryptedMessage = encodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
};
```

Lastly, I add a simple lock icon 🔒 to indicate that the message is encrypted, I'll plan to add more features like decrypting or changing the encryption key later.

![](1-Projects/100DaysOfCode-R3/attachments/78%20-%20ChatOS%20-%20Encrypt%20message%20with%20TweetNaCl.js.png)

![](1-Projects/100DaysOfCode-R3/attachments/78%20-%20ChatOS%20-%20Encrypt%20message%20with%20TweetNaCl.js-1.png)

([See code changes in Pull Request](https://github.com/narze/chat-os/pull/2))
