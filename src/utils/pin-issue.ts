import type { Octokit } from "octokit"

import type { Issue } from "./get-issue"

interface GetProjectData {
  pinIssue: {
    issue: Issue
  }
}

export default async function pinIssue({
  issueId,
  octokit,
}: {
  issueId: string
  octokit: Octokit
}) {
  console.log("Issue:pin ==>", { issueId })

  const {
    pinIssue: { issue },
  } = (await octokit.graphql(
    `
      mutation pinIssue($issueId: ID!) {
        pinIssue(input: { issueId: $issueId }) {
          issue {
            id
            title
            number
            isPinned
          }
        }
      }
    `,
    { issueId },
  )) as GetProjectData

  return issue
}
