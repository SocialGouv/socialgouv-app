import type { Octokit } from "octokit"

import type { Issue } from "./get-issue"

interface UpdateIssueData {
  updateIssue: {
    issue: Issue
  }
}

export default async function updateIssue({
  id,
  body,
  octokit,
}: {
  id: string
  body: string
  octokit: Octokit
}) {
  console.log("Issue:update ==>", { id, body })

  const {
    updateIssue: { issue },
  } = (await octokit.graphql(
    `
      mutation updateIssue($id: ID!, $body: String!) {
        updateIssue(input: {id: $id, body: $body}) {
          issue {
            id
            title
            number
            isPinned
          }
        }
      }
    `,
    { id, body },
  )) as UpdateIssueData

  return issue
}
