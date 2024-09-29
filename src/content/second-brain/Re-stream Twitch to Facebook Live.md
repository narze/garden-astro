---
title: "Re-stream Twitch to Facebook Live"
date: 2023-03-04
slug: re-stream-twitch-to-facebook-live
publish: true
filepath: src/content/second-brain/Re-stream Twitch to Facebook Live.md
---

*   Open Facebook live producer https://www.facebook.com/live/producer
*   Copy stream key into variable

```shell
# Using read -s so you won't leak the stream key
read -s FB_STREAM_KEY

# Verify that it's set by printing out the length of the key
echo ${#FB_STREAM_KEY}
```

*   Go live on twitch, then use `youtube-dl` to get stream url from twitch

```shell
TWITCH_USER=narzelive
TWITCH_STREAM_URL=$(youtube-dl -f best -g https://www.twitch.tv/$TWITCH_USER)

echo ${TWITCH_STREAM_URL}
```

*   Stream through facebook with `ffmpeg`

```shell
ffmpeg -i "$TWITCH_STREAM_URL" -c copy -f flv "rtmps://live-api-s.facebook.com:443/rtmp/$FB_STREAM_KEY"

# Beware stream key leak if error occurred, so filter stream key out
ffmpeg -i "$TWITCH_STREAM_URL" -c copy -f flv "rtmps://live-api-s.facebook.com:443/rtmp/$FB_STREAM_KEY" 2>&1 | sed "s/$FB_STREAM_KEY/$(printf '%*s' ${#FB_STREAM_KEY} | tr ' ' '*'))/g"
```

*   Wait for the video feed, then you can go live in Facebook
