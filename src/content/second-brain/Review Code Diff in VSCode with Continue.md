---
title: Review Code Diff in VSCode with Continue
date: 2024-09-29
tags:
  - ai
  - vscode
draft: false
publish: true
slug: review-code-diff-in-vscode-with-continue
filepath: src/content/second-brain/Review Code Diff in VSCode with Continue.md
---

![](attachments/Arc%202024-09-29%2022.00.13.png)

I created [Custom GPT to help review PR diffs](https://chatgpt.com/g/g-8nODo0oG0-pull-request-review-buddy) before with ChatGPT. With [Continue](https://continue.dev) I can create custom [Slash Command](https://docs.continue.dev/customize/tutorials/build-your-own-slash-command) to get Git diff and make LLM generate code review for me

Create `config.ts` and then add slash command into `modifyConfig`, I name it `review`

```typescript
// ~/.continue/config.ts

export function modifyConfig(config: Config): Config {
  config.slashCommands?.push({
    name: "review",
    description: "Review code changes from diff",
    run: async function* (sdk) {
      const diff = await sdk.ide.getDiff();
      const prompt = [
        diff,
        "The code above is the git diff before commit. Please read only the added/deleted changes and check for any mistakes. You should look for the following, and be extremely vigilant:",
        "- Syntax errors",
        "- Logic errors",
        "- Security vulnerabilities",
        "- Performance issues",
        "- Anything else that looks wrong",
        "Once you find an error, please explain it as clearly as possible, but without using extra words. For example, instead of saying 'I think there is a syntax error on line 5', you should say 'Syntax error on line 5'. Give your answer as one bullet point per mistake found.",
        "Also add code changes in markdown format if applicable.",
      ].join("\n");

      for await (const message of sdk.llm.streamComplete(prompt, {
        maxTokens: 2048,
      })) {
        yield message;
      }
    },
  });
  return config;
}
```

Then I can use `/review` in Continue chat UI to make it review my code diff.
