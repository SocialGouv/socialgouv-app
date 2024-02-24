//import type { Octokit } from "octokit"
import type { PullRequestEvent } from "@octokit/webhooks-types"

export default async function handleRepositoryPullRequest({
  //octokit,
  payload,
}: {
  //octokit: Octokit
  payload: PullRequestEvent
}) {
  console.log("Event:pull_request ==>", { payload })
  const actions = ["opened", "synchronize"]

  if (actions.includes(payload.action)) {
    console.log("OKAY")
  }
}
