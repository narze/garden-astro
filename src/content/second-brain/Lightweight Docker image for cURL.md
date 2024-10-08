---
title: Lightweight Docker image for cURL
date: 2024-10-07
slug: lightweight-docker-image-for-curl
publish: true
filepath: src/content/second-brain/Lightweight Docker image for cURL.md
---

It's `curlimages/curl` which its compressed size is less than 10 MB.

I often get confused with Docker networks and hostnames, so to test I'm using this one-liner.

```shell
docker run -it --network=$NETWORK --rm curlimages/curl "$HOST:$PORT"
```

Replace variables with your network name, host, and port.
