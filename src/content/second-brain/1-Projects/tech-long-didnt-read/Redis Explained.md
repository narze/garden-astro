---
title: "Redis Explained"
date: 2022-09-04
slug: tech-long-didnt-read-redis-explained
publish: true
tags:
- tech-long-didnt-read 
filepath: src/content/second-brain/1-Projects/tech-long-didnt-read/Redis Explained.md
---

![](1-Projects/tech-long-didnt-read/Images/Redis%20Explained.png)

[Source](https://architecturenotes.co/redis)

* Redis (**RE**mote **DI**ctionary **S**ervice) - key-value db
* In-memory database, backup to disk
* Use as cache in the past
* Like Memcached, but more features
* Many architecture configurations supported
  * Single instance - Main db only
  * HA (High Availability) - Has replications to secondary db
  * Sentinel - Has Sentinel(s) to monitor main & secondaries
  * Cluster - Horizontal scaling, gossipping nodes
* Many persistence models
  * No persistence
  * RDB (Redis Database) file - Save db as file snapshot, faster than AOF
  * AOF (Append Only File) - Log write operations to be replayed again, more durable that RDB
    * Flushes to disk with fsync when possible
  * RDB + AOF - More durable but slower
* Forking - OS creates process copy, but shares memory with copy-on-write technique
  * Redis uses this technique to persist the data performantly.
