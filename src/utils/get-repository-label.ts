import type { Octokit } from "octokit"

interface GetProjectData {
  organization: {
    repository: {
      label: {
        id: string
        name: string
      }
    }
  }
}

export default async function getRepositoryLabel({
  name,
  octokit,
  repository,
  organization,
}: {
  name: string
  octokit: Octokit
  repository: string
  organization: string
}) {
  console.log("RepositoryLabels:get ==>", { organization, repository, name })

  const {
    organization: {
      repository: { label },
    },
  } = (await octokit.graphql(
    `
      query getRepositoryLabels(
        $name: String!
        $repository: String!,
        $organization: String!,
      ) {
        organization(login: $organization) {
          repository(name: $repository) {
            label(name: $name) {
              id
              name
            }
          }
        }
      }
    `,
    { organization, repository, name },
  )) as GetProjectData

  return label
}
