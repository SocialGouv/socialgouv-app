import { Octokit } from "octokit"

import {
  __BOT_NAME__,
  __ISSUES_LABEL__,
  __ISSUE_TITLE__,
  __ORGANIZATION__,
  __PROJECT_NUMBER__,
} from "../../env"
import type { Rule } from "../../rules"
import getIssue from "../../utils/get-issue"
import pinIssue from "../../utils/pin-issue"
import getLabelId from "../../utils/get-label-id"
import updateIssue from "../../utils/update-issue"
import createIssue from "../../utils/create-issue"
import getProjectId from "../../utils/get-project-id"
import addIssueToProject from "../../utils/add-issue-to-project"

function getIssueBody(results: Rule[]) {
  const errors = results.filter((result) => !result.success)

  return `## Prérequis techniques des produits de la Fabrique Numérique
Cette *issue* liste les prérequis techniques à mettre en place sur tous les produits de la Fabrique.
Ces prérequis techniques tendent à améliorer la sécurité, la maintenabilité et la compatibilité des applications.

Des *pull requests* sont disponibles pour faciliter l'intégration de certains éléments de cette liste au dépôt de code.
> [!IMPORTANT]
> Il est préférable de *merge* les *pull requests* en respectant l'odre établit dans cette liste.
---
${errors.map((error) => error.issue.message).join("\n---\n")}
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

  if (issue) {
    await updateIssue({ octokit, id: issue.id, body })
  } else {
    const labelId = await getLabelId({
      octokit,
      repository,
      name: __ISSUES_LABEL__,
      organization: __ORGANIZATION__,
    })

    issue = await createIssue({
      body,
      octokit,
      repositoryId,
      labelIds: [labelId],
      title: __ISSUE_TITLE__,
    })
  }

  if (!issue.isPinned) {
    await pinIssue({ octokit, issueId: issue.id })
  }

  const projectId = await getProjectId({
    octokit,
    organization: __ORGANIZATION__,
    number: Number(__PROJECT_NUMBER__),
  })

  await addIssueToProject({ octokit, projectId, contentId: issue.id })

  return issue
}
