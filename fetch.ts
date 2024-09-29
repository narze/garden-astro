import {
  fetchSecondBrain,
  postProcess,
} from "./src/lib/github-fetch-integration"

const local = process.argv.includes("--local")

;(async () => {
  await fetchSecondBrain(local)
  await postProcess()
})()
