import {
  fetchSecondBrain,
  postProcess,
} from "./src/lib/github-fetch-integration"
;(async () => {
  await fetchSecondBrain()
  await postProcess()
})()
