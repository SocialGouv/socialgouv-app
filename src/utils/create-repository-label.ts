import type { Octokit } from "octokit"

export default async function createRepositoryLabel({
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
  console.log("RepositoryLabels:create ==>", { organization, repository, name })

  const { data: label } = await octokit.rest.issues.createLabel({
    name,
    color: "e1000f",
    repo: repository,
    owner: organization,
  })

  return label
}
