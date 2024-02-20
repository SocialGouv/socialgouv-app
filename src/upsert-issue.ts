import { Octokit } from "octokit"

import {
  __BOT_NAME__,
  __ISSUE_TITLE__,
  __ORGANIZATION__,
  __PROJECT_NUMBER__,
} from "./env"
import type { Rule } from "./rules"
import getIssue from "./utils/get-issue"
import pinIssue from "./utils/pin-issue"
import updateIssue from "./utils/update-issue"
import createIssue from "./utils/create-issue"
import getProjectId from "./utils/get-project-id"
import addIssueToProject from "./utils/add-issue-to-project"

function getIssueBody(results: Rule[]) {
  const errors = results.filter((result) => !result.success)

  return `### Liste des éléments à mettre à jour:
${errors.map((error) => error.message).join("\n---\n")}
`
}

export default async function upsertIssue({
  results,
  octokit,
  repository,
  repositoryId,
}: {
  results: Rule[]
  octokit: Octokit
  repository: string
  repositoryId: string
}) {
  const body = getIssueBody(results)

  let issue = await getIssue({
    octokit,
    repository,
    author: __BOT_NAME__,
    organization: __ORGANIZATION__,
  })

  const projectId = await getProjectId({
    octokit,
    organization: __ORGANIZATION__,
    number: Number(__PROJECT_NUMBER__),
  })

  if (issue) {
    await updateIssue({ octokit, id: issue.id, body })
  } else {
    issue = await createIssue({
      body,
      octokit,
      repositoryId,
      title: __ISSUE_TITLE__,
    })
  }

  if (!issue.isPinned) {
    await pinIssue({ octokit, issueId: issue.id })
  }

  await addIssueToProject({ octokit, projectId, contentId: issue.id })
}
