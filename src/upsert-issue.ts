import { Octokit } from "octokit"

import type { Result } from "./check-files"
import { __BOT_NAME__, __ISSUE_TITLE__ } from "./env"

async function getIssue({
  repo,
  owner,
  octokit,
}: {
  repo: string
  owner: string
  octokit: Octokit
}) {
  // const issues2 = await octokit.paginate(octokit.rest.issues.listForRepo, {
  //   repo,
  //   owner,
  //   per_page: 100,
  //   creator: __BOT_NAME__
  // });
  // console.log("ISSUES:", issues2.length);
  const { data: issues } = await octokit.rest.issues.listForRepo({
    repo,
    owner,
    creator: __BOT_NAME__,
  })
  return issues.find(
    (issue) => !issue.pull_request && issue.title === __ISSUE_TITLE__,
  )
}

function getIssueBody(result: Result) {
  return `### Liste des éléments à mettre à jour:
\`\`\`json
${JSON.stringify(result)}
\`\`\`
`
}

async function isIssuePinned({
  repo,
  owner,
  number,
  octokit,
}: {
  repo: string
  owner: string
  number: number
  octokit: Octokit
}) {
  const {
    organization: {
      repository: {
        issue: { isPinned },
      },
    },
  } = (await octokit.graphql(
    `
    query($owner: String!, $repo: String!, $number: Int!) {
      organization(login: $owner) {
        repository(name: $repo) {
          issue(number: $number) {
            isPinned
          }
        }
      }
    }
  `,
    { owner, repo, number },
  )) as Record<
    "organization",
    Record<"repository", Record<"issue", Record<"isPinned", boolean>>>
  >

  return isPinned
}

function pinIssue({ issueId, octokit }: { issueId: string; octokit: Octokit }) {
  console.log("Issue:pin ==>", { issueId })

  return octokit.graphql(
    `
    mutation pinIssue($issueId: ID!) {
      pinIssue(input: { issueId: $issueId }) {
        issue {
          repository {
            id
          }
        }
      }
    }
  `,
    { issueId },
  )
}

function updateIssue({
  repo,
  owner,
  result,
  number,
  octokit,
}: {
  repo: string
  owner: string
  result: Result
  number: number
  octokit: Octokit
}) {
  console.log("Issue:update ==>", { owner, repo, number })

  return octokit.rest.issues.update({
    repo,
    owner,
    state: "open",
    issue_number: number,
    title: __ISSUE_TITLE__,
    body: getIssueBody(result),
  })
}

function createIssue({
  repo,
  owner,
  result,
  octokit,
}: {
  repo: string
  owner: string
  result: Result
  octokit: Octokit
}) {
  return octokit.rest.issues.create({
    repo,
    owner,
    title: __ISSUE_TITLE__,
    body: getIssueBody(result),
  })
}

export default async function upsertIssue({
  repo,
  owner,
  result,
  octokit,
}: {
  repo: string
  owner: string
  result: Result
  octokit: Octokit
}) {
  let issueId, number
  const issue = await getIssue({ owner, repo, octokit })

  if (issue) {
    await updateIssue({ owner, repo, result, octokit, number: issue.number })
    number = issue.number
    issueId = issue.node_id
  } else {
    const { data: issue } = await createIssue({ owner, repo, result, octokit })
    number = issue.number
    issueId = issue.node_id
  }

  const isPinned = await isIssuePinned({ owner, repo, octokit, number })

  if (!isPinned) {
    await pinIssue({ octokit, issueId })
  }
}
