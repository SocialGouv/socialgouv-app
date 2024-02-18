import http from "http"
import { App } from "octokit"
import { createNodeMiddleware } from "@octokit/webhooks"

import handleRepositoryPush from "./handle-repository-push"
import { __APP_ID__, __PRIVATE_KEY__, __WEBHOOK_SECRET__ } from "./env"

const app = new App({
  appId: __APP_ID__,
  privateKey: __PRIVATE_KEY__,
  webhooks: {
    secret: __WEBHOOK_SECRET__,
  },
})

app.webhooks.on("push", handleRepositoryPush)

const middleware = createNodeMiddleware(app.webhooks, { path: "/" })

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("OK")
  } else {
    middleware(req, res)
  }
})

server.listen(3000, () => {
  console.log("Server listening at: http://localhost:3000/")
})
