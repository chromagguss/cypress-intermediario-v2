const usuario = require ('../../fixtures/env.json')
const { faker } = require ('@faker-js/faker')
const options = { env: { snapshotOnly: true }}

describe('Atribuir label a issue', options, () => {
    const titulo = faker.word.words(1)
    const descricao = faker.word.words(5)
    const cor = '#ffaabb'

    before(() => {
      cy.deletar_todos_projetos_api(usuario.gitlab_access_token)
    })

    it('Criação feita com sucesso', () => {
      cy.session_login()
      
      cy.atribuir_label(usuario.gitlab_access_token)
      //cy.get('.qa-title').should('contain', titulo)
      //cy.get('.description > .md > p').should('contain', descricao)
      //cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${usuario.user_name}/${nome_projeto}`)
    })
  })