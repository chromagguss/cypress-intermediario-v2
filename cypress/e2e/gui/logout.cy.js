const env = require ('../../fixtures/env.json')



describe('Logout', () => {
    beforeEach(() => {
        cy.session_login(env.user_name, env.user_password)       
    })
    
    it('Logout feito com sucesso', () => {
        cy.logout()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    })
})