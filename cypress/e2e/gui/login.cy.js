const env = require ('../../fixtures/env.json')

describe('Login', () => {
  it('Login feito com sucesso', () => {
    cy.login(env.user_name, env.user_password)

    cy.get('[data-qa-selector="user_menu"]').should('be.visible')
  })
})