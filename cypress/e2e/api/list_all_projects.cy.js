const usuario = require ('../../fixtures/env.json')
const { faker } = require ('@faker-js/faker')

describe('Listar projetos', () => {
    it('Listagem feita com sucesso via API', () => {      
      cy.listar_todos_projetos_api(usuario.gitlab_access_token).then((response) => {
        expect(response.status).to.eq(200)
      })      
    })
  })