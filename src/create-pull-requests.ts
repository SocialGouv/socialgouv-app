import { Octokit } from "octokit"

import type { Rule } from "./rules"
import { __ORGANIZATION__, __WORKFLOWS_REPOSITORY__ } from "./env"

async function createPullRequest({
  octokit,
  event_type,
  repository,
}: {
  octokit: Octokit
  event_type: string
  repository: string
}) {
  console.log("PullRequest:create ==>", { repository, event_type })

  await octokit.rest.repos.createDispatchEvent({
    event_type,
    owner: __ORGANIZATION__,
    repo: __WORKFLOWS_REPOSITORY__,
    client_payload: { repository },
  })
}

export default async function createPullRequests({
  results,
  octokit,
  repository,
}: {
  results: Rule[]
  octokit: Octokit
  repository: string
}) {
  const promises = results.reduce((promises, result) => {
    if (result.workflow) {
      promises.push(
        createPullRequest({ octokit, repository, event_type: result.workflow }),
      )
    }
    return promises
  }, [] as Promise<void>[])

  await Promise.all(promises)
}
