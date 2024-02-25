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
    file: ".github/CODEOWNERS",
    issue: {
      message: `### Ajouter un fichier [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
Le fichier \`./.github/CODEOWNERS\` permet de conditionner l'édition certains fichiers du dépôt à une validation par [l'équipe SRE de la Fabrique](https://github.com/orgs/SocialGouv/teams/sre).
Les règles **CODEOWNERS** permettent la protection des fichiers nécessaires au déploiment de l'application, tels que le \`Dockerfile\` ou les fichiers présents dans le répertoire \`.kontinuous\`.
> [!NOTE]
> Utiliser la *pull request* \`[SRE] Code Owners\` pour ajouter un fichier **CODEOWNERS** au dépôt de code.
`,
    },
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
  },

  {
    file: ".kontinuous/values.yaml",
    issue: {
      message: `### Installer [Kontinuous](https://socialgouv.github.io/kontinuous/#/)
**Kontinuous** est la solution de déploiement continu de la Fabrique Numérique.
L'intégration de **Kontinuous** premet de contruire les images Docker de l'application et de les déployer sur la plateforme Kubernetes de la Fabrique.
> [!NOTE]
> Utiliser la pull request \`[SRE] Kontinuous\` pour ajouter **Kontinuous** au dépôt de code.
`,
    },
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
  },

  {
    file: ".yarnrc.yml",
    issue: {
      message: `### Installer [Yarn Berry](https://github.com/devthefuture-org/yarn-plugin-fetch)
**Yarn Berry** permet de mettre en cache les dépendances de l'application.
Cette mise en cache accélère l'exécution des phases de *build* lors des déploiements.
> [!NOTE]
> Utiliser la pull request \`[SRE] Yarn Berry\` pour ajouter **Yarn Berry** au dépôt de code.
`,
    },
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
  },

  {
    file: ".eslintrc.json",
    issue: {
      message: `### Installer [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
L'utilisation des paquets **ESLint** et **Prettier** permet de normer et de formater le code automatiquement.

Lancer le wizard d'installation d'**ESLint**:
\`\`\`shell
npm init @eslint/config -y -- --config standard
\`\`\`
Ajouter les paquets pour **Prettier**:
\`\`\`shell
yarn add -DE prettier eslint-plugin-prettier eslint-config-prettier
\`\`\`
Ajouter le plugin **Prettier** au fichier de configuration \`.eslintrc.json\`:
\`\`\`json
{
  "extends": ["plugin:prettier/recommended"]
}
\`\`\`
> [!TIP]
> Formatter le code automatiquement au moment de la sauvegarde d'un fichier dans **VSCode**
> 1. Installer [l'extension ESLint pour VSCODE](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
> 2. Ajouter la configuration **ESLint** au fichier \`./.vscode/settings.json\`
> \`\`\`json
> {
>   "eslint.format.enable": true,
>   "editor.codeActionsOnSave": {
>     "source.fixAll.eslint": "explicit"
>   }
> }
> \`\`\`
`,
    },
  },
  //   {
  //     file: ".dockerignore",
  //     issue: {
  //       message: `- [ ] Ajouter un fichier \`.dockerignore\`
  // Lister l'ensemble des fichiers à exclure du build Docker de l'application.
  // `,
  //     },
  //   },
  //   {
  //     file: "docker-compose.yml",
  //     issue: {
  //       message: `- [ ] Ajouter un fichier \`docker-compose.yml\`
  // Mettre en place un environnement de développement local à l'aide de Docker Compose.
  // `,
  //     },
  //   },
  {
    file: "sonar-project.properties",
    issue: {
      message: `### Installer [SonarCloud](https://www.sonarsource.com/products/sonarcloud/)
Mettre en place les scans SonarCloud et ajouter le fichier \`sonar-project.properties\` au dêpot.
`,
    },
  },

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
] as Rule[]

export default Rules
