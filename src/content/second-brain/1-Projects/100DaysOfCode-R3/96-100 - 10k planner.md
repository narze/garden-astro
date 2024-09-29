---
title: 96-100 - 10k planner
date: 2023-09-02
slug: 100daysofcode-r3-96-100-10k-planner
publish: true
tags:
  - 100DaysOfCode
  - 10k-planner
  - svelte
  - skeleton-ui
draft: false
no_feed: false
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/96-100 - 10k planner.md
---

# 96 - Setup project

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/9Sup8rirE2c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 97 - Setup database & API endpoint

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/9c3YHEV6w9k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Problems found:

*   [Cannot setup multiple db providers in Prisma anymore](https://github.com/prisma/prisma/issues/3834) (sqlite in dev, postgres in prod)
    *   \[ ] Change to Cockroachdb on both dev & prod

\#98 - Setup CockroachDB

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/I6FJ1GHZ_7E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

*   Start Single-node cluster for development https://www.cockroachlabs.com/docs/stable/start-a-local-cluster-in-docker-linux#start-a-single-node-cluster

<details><summary>Docker method</summary>

```shell
docker volume create roach-single
docker network create -d bridge roachnet

docker run -d \
  --rm \
  --env COCKROACH_DATABASE=tenthousand_planner \
  --env COCKROACH_USER=roach \
  --env COCKROACH_PASSWORD=password \
  --name=roach-single \
  --hostname=roach-single \
  # --net=roachnet \
  -p 26257:26257 \
  -p 8080:8080 \
  -v "roach-single:/cockroach/cockroach-data"  \
  cockroachdb/cockroach:v23.1.8 start-single-node \
  --http-addr=localhost:8080 \
  --insecure
```

*   Check logs

```shell
docker exec -it roach-single grep 'node starting' /cockroach/cockroach-data/logs/cockroach.log -A 11
```

*   Connect

```shell
docker exec -it roach-single ./cockroach sql --url="postgresql://root@roach-single:26257/defaultdb" --insecure
```

*   Stop (with 5 min grace period)

```shell
docker stop -t 300 roach-single
```

(however it does not work, so I tried using Homebrew instead)

</details>

```shell
brew install cockroachdb/tap/cockroach

cockroach start-single-node --insecure --store=/tmp/cockroach-data # --background
```

# 99

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/SXVGqOivcN0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

*   Add [autocomplete component](https://www.skeleton.dev/components/autocomplete)
*   Set API cache to 60s using [`setHeaders`](https://kit.svelte.dev/docs/load#headers)

# 100

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/XyiwJUC4QYc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

*   Add overall stats page
*   Add Google Analytics
*   Add fly transitions on cards
