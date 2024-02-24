import dotenv from "dotenv"

dotenv.config()

export const __APP_ID__ = process.env.APP_ID || ""
export const __BOT_NAME__ = process.env.BOT_NAME || ""
export const __PRIVATE_KEY__ = process.env.PRIVATE_KEY || ""
export const __ISSUE_TITLE__ = process.env.ISSUE_TITLE || ""
export const __ORGANIZATION__ = process.env.ORGANIZATION || ""
export const __ISSUES_LABEL__ = process.env.ISSUES_LABEL || ""
export const __PROJECT_NUMBER__ = process.env.PROJECT_NUMBER || ""
export const __WEBHOOK_SECRET__ = process.env.WEBHOOK_SECRET || ""
export const __REPOSITORY_FOLDER__ = process.env.REPOSITORY_FOLDER || ""
export const __WORKFLOWS_REPOSITORY__ = process.env.WORKFLOWS_REPOSITORY || ""
