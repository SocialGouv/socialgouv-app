import degit from "degit"
import * as fs from "node:fs/promises"

import { __REPOSITORY_FOLDER__ } from "./env"

export type Result = Record<string, boolean>[]

const __FILES__ = [
  "README.md",
  ".yarnrc.yml",
  "toto.txt", // for testing purposes
  ".eslintrc.json",
  ".dockerignore",
  ".gitignore",
  "docker-compose.yml",
  "sonar-project.properties",
]

async function deleteRepository(repository: string) {
  try {
    await fs.rm(`${__REPOSITORY_FOLDER__}/${repository}`, { recursive: true })
  } catch (error) {
    console.log(error)
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

async function checkFile(repository: string, file: string) {
  const path = `${repository}/${file}`
  await getFile(path)
  return { [file]: await checkIfFileExists(path) }
}

export default async function checkFiles(repository: string) {
  const promises = __FILES__.map((file: string) => checkFile(repository, file))
  const result = (await Promise.all(promises)) as Result
  await deleteRepository(repository)
  return result
}
