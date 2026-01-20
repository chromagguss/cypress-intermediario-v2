const env = require ('../fixtures/env.json')
const { faker } = require ('@faker-js/faker')

//APIs Gitlab https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/api/openapi/openapi_v2.yaml
//API de projetos https://docs.gitlab.com/api/projects/
Cypress.Commands.add('clone_ssh', projeto => {
  const domain = Cypress.config('baseUrl').replace('http://', '')

  cy.exec(`cd cypress/downloads/ && git clone git@${domain}:${env.user_name}/${projeto.nome}.git`)
})