import degit from "degit"
import * as fs from "node:fs/promises"

import Rules, { type Rule } from "../../rules"
import { __REPOSITORY_FOLDER__ } from "../../env"

async function deleteRepository(repository: string) {
  console.log("CheckRules:deleteRepository ==>", { repository })

  try {
    await fs.rm(`${__REPOSITORY_FOLDER__}/${repository}`, { recursive: true })
  } catch (error) {
    console.error("CheckRules:deleteRepository Error ==>", {
      repository,
      error,
    })
  }
}

async function checkIfFileExists(path: string) {
  console.log("CheckRules:checkIfFileExists ==>", { path })

  try {
    const stats = await fs.stat(`${__REPOSITORY_FOLDER__}/${path}`)
    return stats.isFile()
  } catch (error) {
    console.error("CheckRules:checkIfFileExists Error ==>", { path, error })
    return false
  }
}

async function getFile(path: string) {
  console.log("CheckRules:getFile ==>", { path })

  try {
    const emitter = degit(path)
    await emitter.clone(`${__REPOSITORY_FOLDER__}/${path}`)
    return true
  } catch (error) {
    // console.error("CheckRules:getFile Error ==>", { path, error })
    return false
  }
}

async function checkRule(repository: string, rule: Rule) {
  const path = `${repository}/${rule.file}`
  await getFile(path)
  return { ...rule, success: await checkIfFileExists(path) }
}

export default async function checkRules({
  owner,
  repository,
}: {
  owner: string
  repository: string
}) {
  const repositoryPath = `${owner}/${repository}`
  const promises = Rules.map((rule) => checkRule(repositoryPath, rule))
  const results = (await Promise.all(promises)) as Rule[]
  await deleteRepository(repositoryPath)
  return results
}
