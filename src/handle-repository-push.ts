import type { Octokit } from "octokit"
import type { PushEvent } from "@octokit/webhooks-types"

import checkFiles from "./check-files"
import upsertIssue from "./upsert-issue"

export default async function handleRepositoryPush({
  octokit,
  payload: {
    repository: {
      name,
      owner: { name: owner },
    },
  },
}: {
  octokit: Octokit
  payload: PushEvent
}) {
  console.log("Event:push ==>", { owner, name })
  if (owner && name) {
    const repository = `${owner}/${name}`
    const result = await checkFiles(repository)
    console.log("Event:push ==> result:", result)
    await upsertIssue({ octokit, owner, repo: name, result })
  } else {
    console.error("Event:push ==> Missing owner or name:", { owner, name })
  }
}
