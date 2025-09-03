import type { Octokit } from "octokit"

export default async function updateTeamsRepository({
  octokit,
  teamIds,
  repositoryId,
}: {
  octokit: Octokit
  teamIds: string[]
  repositoryId: string
}) {
  console.log("Repository:update_teams ==>", { repositoryId, teamIds })

  await octokit.graphql(
    `
      mutation updateTeamsRepository($repositoryId: ID!, $teamIds: [ID!]!) {
        updateTeamsRepository(input: {
          repositoryId: $repositoryId
          teamIds: $teamIds
        }) {
          clientMutationId
        }
      }
    `,
    { repositoryId, teamIds },
  )
}
