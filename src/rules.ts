export interface PullRequest {
  body: string
  title: string
  branch: string
  workflow: string
  commitMessage: string
}
export interface Rule {
  file: string
  success?: boolean
  pullRequest: PullRequest
  issue: {
    message: string
  }
}

const Rules = [
  {
    file: "README.md",
    issue: {
      message: `- [ ] Ajouter un fichier \`README.md\`
Ce fichier doit comporter les éléments suivants:
  - La procédure d'installation locale
  - La liste des variables d'environnement et leurs significations
  - La licence utilisée
`,
    },
  },
  {
    file: ".yarnrc.yml",
    pullRequest: {
      workflow: "pr-yarn-berry",
      branch: "chore/yarn-berry",
      commitMessage: "add yarn berry",
      title: "[SRE] Yarn Berry",
      body: `This pull request has been geenrated automaticaly.
The aim of this pull request his to add \`Yarn Berry\` to this project.
Installation of \`Yarn Berry\` is a technical recommandation of **La Fabrique Numérique** des ministères sociaux.
`,
    },
    issue: {
      message: `- [ ] Installer Yarn Berry
Utiliser la pull request \`[SRE] Yarn Berry\` ajoutée à votre repository.
Pour plus de détails, suivre les instructions d'installation présentes sur la page du plugin:
Documentation: https://github.com/devthefuture-org/yarn-plugin-fetch
`,
    },
  },
  {
    file: ".eslintrc.json",
    issue: {
      message: `- [ ] Installer le packge \`EsLint\`
Installation:
  \`\`\`shell
  npm init @eslint/config
  \`\`\`
  Documentation: https://eslint.org/docs/latest/use/getting-started
`,
    },
  },
  {
    file: ".dockerignore",
    issue: {
      message: `- [ ] Ajouter un fichier \`.dockerignore\`
Lister l'ensemble des fichiers à exclure du build Docker de l'application.
`,
    },
  },
  {
    file: ".gitignore",
    issue: {
      message: `- [ ] Ajouter un fichier \`.gitignore\`
Lister l'ensemble des fichiers à exclure du dêpot de fichiers Git.
`,
    },
  },
  {
    file: "docker-compose.yml",
    issue: {
      message: `- [ ] Ajouter un fichier \`docker-compose.yml\`
Mettre en place un environnement de développement local à l'aide de Docker Compose.
`,
    },
  },
  {
    file: "sonar-project.properties",
    issue: {
      message: `- [ ] Ajouter un fichier \`sonar-project.properties\`
Mettre en place les scans SonarCloud et ajouter le fichier \`sonar-project.properties\` au dêpot.
`,
    },
  },
] as Rule[]

export default Rules
