import type { Octokit } from "octokit"

interface GetProjectData {
  organization: {
    projectV2: {
      id: string
    }
  }
}

export default async function getProjectId({
  number,
  octokit,
  organization,
}: {
  number: number
  octokit: Octokit
  organization: string
}) {
  console.log("Project:get ==>", { organization, number })

  const {
    organization: {
      projectV2: { id },
    },
  } = (await octokit.graphql(
    `
      query getProject($organization: String!, $number: Int!) {
        organization(login: $organization){
          projectV2(number: $number) {
            id
          }
        }
      }
    `,
    { organization, number },
  )) as GetProjectData

  return id
}
