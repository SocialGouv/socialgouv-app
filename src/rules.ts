export interface Rule {
  file: string
  message: string
  workflow: string
  success?: boolean
}

const Rules = [
  {
    file: "README.md",
    message: `- [ ] Ajouter un fichier \`README.md\`
Ce fichier doit comporter les éléments suivants:
  - La procédure d'installation locale
  - La liste des variables d'environnement et leurs significations
  - La licence utilisée
`,
  },
  {
    file: ".yarnrc.yml",
    workflow: "pr-yarn-berry",
    message: `- [ ] Ajouter le cache yarn
Suivre les instructions d'installation présentes sur la page du plugin:
Documentation: https://github.com/devthefuture-org/yarn-plugin-fetch
`,
  },
  {
    file: ".eslintrc.json",
    message: `- [ ] Installer le packge \`EsLint\`
Installation:
  \`\`\`shell
  npm init @eslint/config
  \`\`\`
  Documentation: https://eslint.org/docs/latest/use/getting-started
`,
  },
  {
    file: ".dockerignore",
    message: `- [ ] Ajouter un fichier \`.dockerignore\`
Lister l'ensemble des fichiers à exclure du build Docker de l'application.
`,
  },
  {
    file: ".gitignore",
    message: `- [ ] Ajouter un fichier \`.gitignore\`
Lister l'ensemble des fichiers à exclure du dêpot de fichiers Git.
`,
  },
  {
    file: "docker-compose.yml",
    message: `- [ ] Ajouter un fichier \`docker-compose.yml\`
Mettre en place un environnement de développement local à l'aide de Docker Compose.
`,
  },
  {
    file: "sonar-project.properties",
    message: `- [ ] Ajouter un fichier \`sonar-project.properties\`
Mettre en place les scans SonarCloud et ajouter le fichier \`sonar-project.properties\` au dêpot.
`,
  },
] as Rule[]

export default Rules
