#!/usr/bin/env node

/**
 * Pre-commit hook to prevent committing files with unlisted: true in frontmatter
 */

import { readFileSync } from "fs"
import { execSync } from "child_process"

// Colors for output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
}

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function getStagedFiles() {
  try {
    const output = execSync(
      "git diff --cached --name-only --diff-filter=ACMR",
      { encoding: "utf8" }
    )
    return output
      .trim()
      .split("\n")
      .filter((file) => file && /\.(md|mdx)$/.test(file))
  } catch (error) {
    log("Error getting staged files", "red")
    process.exit(1)
  }
}

function checkFileForUnlisted(filePath) {
  try {
    const content = readFileSync(filePath, "utf8")

    // Check if file has frontmatter
    if (!content.startsWith("---")) {
      return false
    }

    // Find the end of frontmatter
    const frontmatterEnd = content.indexOf("---", 3)
    if (frontmatterEnd === -1) {
      return false
    }

    // Extract frontmatter
    const frontmatter = content.substring(0, frontmatterEnd + 3)

    // Check for unlisted: true
    return /^unlisted:\s*true$/m.test(frontmatter)
  } catch (error) {
    log(`Error reading file ${filePath}: ${error.message}`, "red")
    return false
  }
}

function main() {
  log("🔍 Checking for unlisted content in staged files...", "yellow")

  const stagedFiles = getStagedFiles()

  if (stagedFiles.length === 0) {
    log("✅ No markdown files staged for commit", "green")
    process.exit(0)
  }

  const violations = []

  for (const file of stagedFiles) {
    if (checkFileForUnlisted(file)) {
      violations.push(file)
    }
  }

  if (violations.length > 0) {
    log("", "reset")
    log('❌ Commit blocked: Files with "unlisted: true" detected', "red")
    log("", "reset")
    log(
      'The following files contain "unlisted: true" in their frontmatter:',
      "yellow"
    )
    violations.forEach((file) => {
      log(`  • ${file}`, "red")
    })
    log("", "reset")
    log("To fix this:", "yellow")
    log('  1. Remove "unlisted: true" from the frontmatter, or', "reset")
    log("  2. Unstage the files: git reset HEAD <file>", "reset")
    log(
      "  3. Or use --no-verify to bypass this check: git commit --no-verify",
      "reset"
    )
    log("", "reset")
    process.exit(1)
  }

  log("✅ No unlisted content detected in staged files", "green")
  process.exit(0)
}

main()
