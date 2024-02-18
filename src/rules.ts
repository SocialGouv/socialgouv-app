export interface Rule {
  file: string
  message: string
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
    message: `- [ ] Ajouter le cache yarn
Suivre les instructions d'installation présentes sur la page du plugin:
Documentation: https://github.com/devthefuture-org/yarn-plugin-fetch
`,
  },
  {
    file: "toto.txt", // for testing purposes
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
  },
  {
    file: ".gitignore",
  },
  {
    file: "docker-compose.yml",
  },
  {
    file: "sonar-project.properties",
  },
] as Rule[]

export default Rules
