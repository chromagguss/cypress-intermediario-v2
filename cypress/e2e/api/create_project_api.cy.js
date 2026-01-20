const usuario = require ('../../fixtures/env.json')
const { faker } = require ('@faker-js/faker')

describe('Criar projeto', () => {
    const nome_projeto = `project-${faker.string.uuid()}`
    const descricao_projeto = faker.word.words(5)
    const visibilidade = 'public'

    before(() => {
      cy.deletar_todos_projetos_api(usuario.gitlab_access_token)
    })

    it('Criação feita com sucesso via API', () => {      
      cy.criar_projeto_api(usuario.gitlab_access_token, nome_projeto, descricao_projeto, visibilidade, false).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.name).to.eq(nome_projeto)
        expect(response.body.description).to.eq(descricao_projeto)
      })
      
    })
  })