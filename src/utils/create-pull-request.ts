import { Octokit } from "octokit"

import type { PullRequest } from "../rules"
import { __ORGANIZATION__, __WORKFLOWS_REPOSITORY__ } from "../env"

export default async function createPullRequest({
  octokit,
  options,
  repository,
}: {
  octokit: Octokit
  options: PullRequest
  repository: string
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
