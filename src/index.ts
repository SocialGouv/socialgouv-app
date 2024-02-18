import http from "http"
import { App, type Octokit } from "octokit"
import type { PushEvent } from "@octokit/webhooks-types"
import { createNodeMiddleware } from "@octokit/webhooks"

import checkFiles from "./check-files"
import upsertIssue from "./upsert-issue"
import { __APP_ID__, __PRIVATE_KEY__, __WEBHOOK_SECRET__ } from "./env"

const app = new App({
  appId: __APP_ID__,
  privateKey: __PRIVATE_KEY__,
  webhooks: {
    secret: __WEBHOOK_SECRET__,
  },
})

async function handleRepositoryPush({
  octokit,
  payload: {
    repository: {
      name,
      owner: { name: owner },
    },
  },
}: {
  octokit: Octokit
  payload: PushEvent
}) {
  console.log("Event:push ==>", { owner, name })
  if (owner && name) {
    const repository = `${owner}/${name}`
    const result = await checkFiles(repository)
    console.log("Event:push ==> result:", result)
    await upsertIssue({ octokit, owner, repo: name, result })
  } else {
    console.error("Event:push ==> Missing owner or name:", { owner, name })
  }
}

app.webhooks.on("push", handleRepositoryPush)

const middleware = createNodeMiddleware(app.webhooks, { path: "/" })

http.createServer(middleware).listen(3000, () => {
  console.log("Server listening at: http://localhost:3000/")
})
