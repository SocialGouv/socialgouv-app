import type { Octokit } from "octokit"

export default async function addIssueToProject({
  octokit,
  projectId,
  contentId,
}: {
  octokit: Octokit
  projectId: string
  contentId: string
}) {
  console.log("Project:addIssue ==>", { projectId, contentId })

  const data = await octokit.graphql(
    `
      mutation addIssueToProject($projectId: ID!, $contentId: ID!) {
        addProjectV2ItemById(
          input: {projectId: $projectId, contentId: $contentId }) {
          item {
            id
          }
        }
      }
    `,
    { projectId, contentId },
  )

  return data
}
