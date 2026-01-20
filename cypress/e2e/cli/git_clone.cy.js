const usuario = require ('../../fixtures/env.json')

const { faker } = require ('@faker-js/faker')

describe('git clone', () => {
  const projeto = {
    nome: `project-${faker.string.uuid()}`,
    descricao: faker.word.words(5)
  }

  beforeEach(() => {
    cy.deletar_todos_projetos_api(usuario.gitlab_access_token)
    cy.criar_projeto_api(usuario.gitlab_access_token, projeto.nome, projeto.descricao)
  })

  it('successfully', () => {
    cy.clone_ssh(projeto)

    cy.readFile(`cypress/downloads/${projeto.nome}/README.md`)
      .should('contain', `# ${projeto.nome}`)
      .and('contain', projeto.descricao)
  })
})