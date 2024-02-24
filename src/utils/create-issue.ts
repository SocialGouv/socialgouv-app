import type { Octokit } from "octokit"

import type { Issue } from "./get-issue"

interface CreateIssueData {
  createIssue: {
    issue: Issue
  }
}

export default async function createIssue({
  body,
  title,
  octokit,
  labelIds,
  repositoryId,
}: {
  body: string
  title: string
  octokit: Octokit
  labelIds: string[]
  repositoryId: string
}) {
  console.log("Issue:create ==>", { repositoryId, title, body })

  const {
    createIssue: { issue },
  } = (await octokit.graphql(
    `
      mutation createIssue(
        $body: String!,
        $title: String!,
        $labelIds: [ID!],
        $repositoryId: ID!,
      ) {
        createIssue(
          input: {
            body: $body,
            title: $title,
            labelIds: $labelIds,
            repositoryId: $repositoryId,
          }
        ) {
          issue {
            id
            title
            number
            isPinned
          }
        }
      }
    `,
    { body, title, repositoryId, labelIds },
  )) as CreateIssueData

  return issue
}
