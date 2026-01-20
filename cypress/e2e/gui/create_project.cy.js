const usuario = require ('../../fixtures/env.json')
const { faker } = require ('@faker-js/faker')
const options = { env: { snapshotOnly: true }}

describe('Criar projeto', options, () => {
    const nome_projeto = `project-${faker.string.uuid()}`
    const descricao_projeto = faker.word.words(5)

    before(() => {
        cy.deletar_todos_projetos_api(usuario.gitlab_access_token)
    })

    it('Criação feita com sucesso', () => {
      cy.session_login()
      
      cy.criar_projeto(nome_projeto, descricao_projeto, false, false)
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${usuario.user_name}/${nome_projeto}`)
    })
  })