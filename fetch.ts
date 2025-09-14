import {
  cleanupSecondBrainContent,
  fetchSecondBrain,
  postProcess,
} from "./src/lib/github-fetch-integration"

const local = process.argv.includes("--local")
const cleanup = process.argv.includes("--cleanup")
// read --repo=org/repo (single repo)
const singleRepo = process.argv
  .find((arg) => arg.startsWith("--repo="))
  ?.split("=")[1]
// read REPOS environment variable (comma-separated list)
const reposEnv = process.env.REPOS
// determine which repos to fetch
const reposToFetch = singleRepo
  ? [singleRepo]
  : reposEnv
    ? reposEnv
        .split(",")
        .map((repo) => repo.trim())
        .filter(Boolean)
    : ["narze/second-brain"]

;(async () => {
  if (cleanup) {
    cleanupSecondBrainContent()
  }

  // Fetch from all specified repositories
  for (const repo of reposToFetch) {
    console.log(`\n🔄 Fetching from ${repo}...`)
    await fetchSecondBrain(local, repo)
  }

  await postProcess()
})()
