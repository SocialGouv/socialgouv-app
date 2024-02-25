export interface PullRequest {
  body?: string
  title: string
  branch: string
  labels: string
  workflow: string
  commitMessage: string
  bodyTpl: (data: Record<string, unknown>) => string
}

export interface Rule {
  file: string
  success?: boolean
  pullRequest?: PullRequest
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
      labels: "socialgouv",
      bodyTpl: ({
        issueNumber,
      }) => `This pull request has been geenrated automaticaly.
The aim of this pull request is to add \`Yarn Berry\` to this project.
Installation of \`Yarn Berry\` is a technical recommandation of **La Fabrique Numérique** des ministères sociaux.
This pull request resolves #${issueNumber}
`,
    },
    issue: {
      message: `- [ ] Installer \`Yarn Berry\`
Utiliser la pull request \`[SRE] Yarn Berry\` ajoutée à votre repository.
Pour plus de détails, suivre les instructions d'installation présentes sur la page du plugin:
Documentation: https://github.com/devthefuture-org/yarn-plugin-fetch
`,
    },
  },
  {
    file: ".kontinuous/values.yaml",
    pullRequest: {
      workflow: "pr-kontinuous",
      branch: "chore/kontinuous",
      commitMessage: "add kontinuous config",
      title: "[SRE] Kontinuous",
      labels: "socialgouv",
      bodyTpl: ({
        issueNumber,
      }) => `This pull request has been geenrated automaticaly.
The aim of this pull request is to add \`Kontinuous\` to this project.
Installation of \`Kontinuous\` is a requirement to deploy your product at **La Fabrique Numérique** des ministères sociaux.
This pull request resolves #${issueNumber}
`,
    },
    issue: {
      message: `- [ ] Installer \`Kontinuous\`
Utiliser la pull request \`[SRE] Kontinuous\` ajoutée à votre repository.
Pour plus de détails, suivre les instructions d'installation présentes sur la page du plugin:
Documentation: https://socialgouv.github.io/kontinuous/#/
`,
    },
  },
  {
    file: ".github/CODEOWNERS",
    pullRequest: {
      workflow: "pr-codeowners",
      branch: "chore/codeowners",
      commitMessage: "add codeowners",
      title: "[SRE] Code Owners",
      labels: "socialgouv",
      bodyTpl: ({
        issueNumber,
      }) => `This pull request has been geenrated automaticaly.
The aim of this pull request is to add a \`CODEOWNERS\` configuration to this project.
Adding a \`CODEOWNERS\` configuration to this repository is a security requirement from **La Fabrique Numérique** des ministères sociaux.
This pull request resolves #${issueNumber}
`,
    },
    issue: {
      message: `- [ ] Ajouter un fichier \`CODEOWNERS\`
Utiliser la pull request \`[SRE] Code Owners\` ajoutée à votre repository.
Pour plus de détails, suivre les instructions d'installation présentes sur la page du plugin:
Documentation: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
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
