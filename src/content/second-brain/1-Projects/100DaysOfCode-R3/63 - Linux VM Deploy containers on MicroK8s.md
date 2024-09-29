---
title: "63 - Linux VM - Deploy containers on MicroK8s"
date: 2023-07-15
slug: 100daysofcode-r3-63-linux-vm-deploy-containers-on-microk8s
publish: true
tags:
- microk8s
- dagger
- 100DaysOfCode 
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/63 - Linux VM Deploy containers on MicroK8s.md
---

(Continue from [60 - Setup Linux VM on Digitalocean](/100daysofcode-r3-60-setup-linux-vm-on-digitalocean))

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/PFlLpBuac70" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## MicroK8s

Running a basic nginx container to test that the cluster is indeed working

```shell
microk8s start
microk8s kubectl create deployment nginx-webserver --image=nginx
microk8s kubectl expose deployment nginx-webserver --type="NodePort" --port 80
microk8s kubectl get svc nginx-webserver # See random exposed port and access on browser
```

## Dagger

I want to try [Dagger](https://dagger.io) instead of creating Dockerfile, here's the config for [narze/heychat](https://github.com/narze/heychat) a NodeJS websocket server. Dagger enables building and pushing Docker images with TypeScript.

```typescript
import { connect } from "@dagger.io/dagger"

connect(
  async (client) => {
    // use a node:18-slim container
    // mount the source code directory on the host
    // at /src in the container
    const source = client
      .container()
      .from("node:18-slim")
      .withDirectory("/src", client.host().directory("."), {
        exclude: ["node_modules/", "ci/", "tmp/"],
      })

    // set the working directory in the container
    // install application dependencies
    const runner = source
      .withWorkdir("/src")
      .withExec(["yarn", "install", "--frozen-lockfile"])

    // build application
    // write the build output to the host
    const buildDir = runner.withExec(["yarn", "build"]).directory("./dist")

    await buildDir.export("./dist")

    const e = await buildDir.entries()

    console.log("build dir contents:\n", e)

    // use an node:18-slim container
    // copy the dist/ directory into the container filesystem
    // publish the resulting container to a registry
    const imageRef = await client
      .container()
      .from("node:18-slim")
      .withDirectory("/app", buildDir)
      .withDirectory("/app/node_modules", runner.directory("./node_modules"))
      .withEntrypoint(["node", "/app/index.js"])
      .withExposedPort(8080)
      .publish("ttl.sh/heychat-" + Math.floor(Math.random() * 10000000))
    console.log(`Published image to: ${imageRef}`)
  },
  { LogOutput: process.stdout }
)
```

Run the code with `node` then the image will be built and pushed to [ttl.sh](https://ttl.sh), a temporary Docker image registry. Then I pull the image and run locally to see that it is working.

```shell
node ci/index.mjs

docker pull ttl.sh/heychat-8015391
docker run ttl.sh/heychat-8015391

docker ps # Verify that the container is working
```
