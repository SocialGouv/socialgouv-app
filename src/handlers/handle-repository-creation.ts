import type { RepositoryCreatedEvent } from "@octokit/webhooks-types"

export default async function handleRepositoryCreation({
  //octokit,
  payload,
}: {
  //octokit: Octokit
  payload: RepositoryCreatedEvent
}) {
  console.log("Event:repository_created ==>", { payload })
}
