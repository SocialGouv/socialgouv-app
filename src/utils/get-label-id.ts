import type { Octokit } from "octokit"

import getRepositoryLabel from "./get-repository-label"
import createRepositoryLabel from "./create-repository-label"

export default async function getLabelId({
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
  const label = await getRepositoryLabel({
    octokit,
    organization,
    repository,
    name,
  })
  if (label) {
    return label.id
  } else {
    const label = await createRepositoryLabel({
      octokit,
      organization,
      repository,
      name,
    })
    return label.node_id
  }
}
