import { Octokit } from "octokit"

import type { Rule, PullRequest } from "../../rules"
import { __ORGANIZATION__, __WORKFLOWS_REPOSITORY__ } from "../../env"

async function createPullRequest({
  octokit,
  options,
  repository,
}: {
  octokit: Octokit
  repository: string
  options: PullRequest
}) {
  console.log("PullRequest:create ==>", { repository, options })

  const { workflow: event_type, ...rest } = options

  await octokit.rest.repos.createDispatchEvent({
    event_type,
    owner: __ORGANIZATION__,
    repo: __WORKFLOWS_REPOSITORY__,
    client_payload: { repository, ...rest },
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
    if (result.pullRequest?.workflow) {
      promises.push(
        createPullRequest({
          octokit,
          repository,
          options: result.pullRequest,
        }),
      )
    }
    return promises
  }, [] as Promise<void>[])

  await Promise.all(promises)
}
