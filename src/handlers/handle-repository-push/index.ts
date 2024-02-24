import type { Octokit } from "octokit"
import type { PushEvent } from "@octokit/webhooks-types"

import checkRules from "./check-rules"
import upsertIssue from "./upsert-issue"
import createPullRequests from "./create-pull-requests"
import { __BOT_NAME__, __WORKFLOWS_REPOSITORY__ } from "../../env"

export default async function handleRepositoryPush({
  octokit,
  payload,
  // payload: {
  //   repository: {
  //     name: repository,
  //     node_id: repositoryId,
  //     owner: { name: owner },
  //   },
  // },
}: {
  octokit: Octokit
  payload: PushEvent
}) {
  // console.log("Event:push ==>", { payload })
  // console.log("Event:push ==>", { owner, repository, repositoryId })
  const {
    repository: {
      name: repository,
      node_id: repositoryId,
      owner: { name: owner },
    },
    sender: { login: sender },
  } = payload

  const branch = payload.ref.split("/").pop()

  if (owner && repository && branch) {
    if (repository === __WORKFLOWS_REPOSITORY__) {
      console.log("Event:push ==> Skipping workflows repository", {
        repository,
      })
    } else if (sender === __BOT_NAME__) {
      console.log("Event:push ==> Skipping bot push", {
        repository,
        branch,
      })
      // } else if (!payload.deleted) {
      //   console.error("Event:push ==> Skipping branch deletion", {
      //     repository,
      //     branch,
      //   })
    } else if (!["main", "master"].includes(branch)) {
      console.log("Event:push ==> Skipping non master/main branches", {
        repository,
        branch,
      })
    } else {
      const results = await checkRules({ owner, repository })
      const issue = await upsertIssue({
        octokit,
        results,
        repository,
        repositoryId,
      })
      issue.number
      if (process.env.NODE_ENV !== "production") {
        await createPullRequests({
          octokit,
          results,
          repository,
          issueNumber: issue.number,
        })
      }
    }
  } else {
    console.error("Event:push ==> Missing owner or name:", {
      owner,
      repository,
    })
  }
}
