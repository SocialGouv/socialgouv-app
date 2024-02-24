import { Octokit } from "octokit"

import type { Rule } from "../../rules"
import createPullRequest from "../../utils/create-pull-request"

export default async function createPullRequests({
  results,
  octokit,
  repository,
  issueNumber,
}: {
  results: Rule[]
  octokit: Octokit
  repository: string
  issueNumber: number
}) {
  const promises = results.reduce((promises, { pullRequest }) => {
    if (pullRequest?.workflow) {
      pullRequest.body = pullRequest.bodyTpl({ issueNumber })
      promises.push(
        createPullRequest({
          octokit,
          repository,
          options: pullRequest,
        }),
      )
    }
    return promises
  }, [] as Promise<void>[])

  await Promise.all(promises)
}
