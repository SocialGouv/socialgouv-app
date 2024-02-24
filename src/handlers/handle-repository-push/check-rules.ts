import degit from "degit"
import * as fs from "node:fs/promises"

import Rules, { type Rule } from "../../rules"
import { __REPOSITORY_FOLDER__ } from "../../env"

async function deleteRepository(repository: string) {
  try {
    await fs.rm(`${__REPOSITORY_FOLDER__}/${repository}`, { recursive: true })
  } catch (error) {
    console.error(error)
  }
}

async function checkIfFileExists(path: string) {
  try {
    const stats = await fs.stat(`${__REPOSITORY_FOLDER__}/${path}`)
    return stats.isFile()
  } catch (error) {
    console.error(error)
    return false
  }
}

async function getFile(path: string) {
  const emitter = degit(path)
  await emitter.clone(`${__REPOSITORY_FOLDER__}/${path}`)
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
