import type { Octokit } from "octokit"

import { __ISSUE_TITLE__ } from "../env"

export interface Issue {
  id: string
  title: string
  number: number
  isPinned: boolean
}

interface GetIssuesData {
  organization: {
    repository: {
      issues: {
        nodes: Issue[]
      }
    }
  }
}

export default async function getIssue({
  author,
  octokit,
  repository,
  organization,
}: {
  author: string
  octokit: Octokit
  repository: string
  organization: string
}) {
  console.log("Issue:get ==>", { organization, repository, author })

  const {
    organization: {
      repository: {
        issues: { nodes: issues },
      },
    },
  } = (await octokit.graphql(
    `
      query getIssue($organization: String!, $repository: String!, $author: String!) {
        organization(login: $organization) {
          repository(name: $repository) {
            issues(first: 10, filterBy: {createdBy: $author}) {
              totalCount
              nodes {
                id
                title
                number
                isPinned
              }
            }
          }
        }
      }
    `,
    { organization, repository, author },
  )) as GetIssuesData

  const issue = issues.find((issue) => issue.title === __ISSUE_TITLE__)

  return issue
}
