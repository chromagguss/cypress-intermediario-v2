const usuario = require ('../../fixtures/env.json')
const { faker } = require ('@faker-js/faker')

describe('Deletar projetos', () => {
    it('Delete de todos os projetos feito com sucesso via API', () => {      
      cy.deletar_todos_projetos_api(usuario.gitlab_access_token)
    })
  })