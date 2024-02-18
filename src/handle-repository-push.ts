import type { Octokit } from "octokit"
import type { PushEvent } from "@octokit/webhooks-types"

import checkRules from "./check-rules"
import upsertIssue from "./upsert-issue"

export default async function handleRepositoryPush({
  octokit,
  payload: {
    repository: {
      name: repository,
      node_id: repositoryId,
      owner: { name: owner },
    },
  },
}: {
  octokit: Octokit
  payload: PushEvent
}) {
  console.log("Event:push ==>", { owner, repository, repositoryId })

  if (owner && repository) {
    const results = await checkRules({ owner, repository })
    await upsertIssue({ octokit, results, repository, repositoryId })
  } else {
    console.error("Event:push ==> Missing owner or name:", { owner, name })
  }
}
