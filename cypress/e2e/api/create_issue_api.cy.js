const usuario = require ('../../fixtures/env.json')
const { faker } = require ('@faker-js/faker')

describe('Criar issue', () => {
  const titulo = faker.word.words(2)
  const descricao = faker.word.words(5)

  it('Criação de issue feita com sucesso via API', () => {      
    cy.criar_issue_api(usuario.gitlab_access_token, titulo, descricao).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.title).to.eq(titulo)
      expect(response.body.description).to.eq(descricao)
    })
    
  })
})