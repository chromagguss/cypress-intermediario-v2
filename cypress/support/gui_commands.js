const env = require ('../fixtures/env.json')
const { faker } = require ('@faker-js/faker')

Cypress.Commands.add('login', (user = env.user_name, password = env.user_password) => {
    cy.visit('/users/sign_in')        
    cy.get('[data-qa-selector="login_field"]').type(user)
    cy.get('[data-qa-selector="password_field"]').type(password, {log: false})
    cy.get('[data-qa-selector="sign_in_button"]').click()
})

Cypress.Commands.add('session_login', (user = env.user_name, password = env.user_password, nome = 'Login salvo na sessão') => {
    cy.session (nome, () => {
        cy.visit('/users/sign_in')        
        cy.get('[data-qa-selector="login_field"]').type(user)
        cy.get('[data-qa-selector="password_field"]').type(password, {log: false})
        cy.get('[data-qa-selector="sign_in_button"]').click()
        cy.get('[data-qa-selector="user_menu"]').should('be.visible')
    },
    {
        validate() {
            cy.visit('/')
            cy.location('pathname').should('not.eq', '/users/sign_in')
        },
        cacheAcrossSpecs: true
    }    
    )
    
})

Cypress.Commands.add('logout', () => {
    cy.visit('/')            
    cy.get('[data-qa-selector="user_menu"]').click()
    cy.get('[data-qa-selector="sign_out_link"]').click()
})

Cypress.Commands.add('criar_projeto', (nome, descricao, publico = true, readme = false) => {
    cy.visit('/')
    cy.get('#js-onboarding-new-project-link').click()
    cy.get('.dropdown-menu > ul > li > [href="/projects/new"]').click()
    cy.get('#project_name').type(nome)
    //cy.get('#project_path').type(nome)
    cy.get('#project_description').type(descricao)
    if(publico){
        cy.get('#project_visibility_level_20').click()
    }  
    if(readme){
        cy.get('#project_initialize_with_readme').click()
    }

    cy.get('#blank-project-pane > #new_project > .project-submit').click()
})

Cypress.Commands.add('criar_issue', (token, titulo, descricao) => {
    cy.visit('/')
    cy.get('body').then(($body) => {        
        if($body.find('.projects-list').length == 0){
            let nome_projeto = `project-${faker.string.uuid()}`
            let descricao_projeto = faker.word.words(5)

            cy.criar_projeto_api(token, nome_projeto, descricao_projeto, 'private', true).then((response) => {
                expect(response.status).to.eq(201)
            })
            cy.reload()            
        }
    })    
    cy.get('.projects-list > :nth-child(1) > .project-details > .flex-wrapper > .project-title > .d-flex > .text-plain > .project-full-name > .project-name').click()    
    cy.get('.qa-issues-item').click()
    cy.get('#new_issue_link').click()
    cy.get('.qa-issuable-form-title').type(titulo)
    cy.get('.qa-issuable-form-description').type(descricao)
    

    cy.get('.qa-issuable-create-button').click()
    
})


Cypress.Commands.add('atribuir_label', (token) => {
    cy.visit('/')
    cy.get('body').then(($body) => {        
        if($body.find('.projects-list').length == 0){
            let nome_projeto = `project-${faker.string.uuid()}`
            let descricao_projeto = faker.word.words(5)

            cy.criar_projeto_api(token, nome_projeto, descricao_projeto, 'private', true).then((response) => {
                expect(response.status).to.eq(201)
            })
            cy.reload()            
        }        
    })      
    //cy.intercept('GET', 'root/*/blob/master/*').as('project')
    cy.get('.projects-list > :nth-child(1) > .project-details > .flex-wrapper > .project-title > .d-flex > .text-plain > .project-full-name > .project-name').click()
    //cy.wait('@project').then((interception) => {
    cy.listar_todos_projetos_api(token).then((response) => {
        cy.get('.sidebar-sub-level-items').invoke('show').contains('Labels').click().then(($body) => {
            if($body.find('.other-labels > .content-list').length == 0){
                
                let titulo_label = `project-${faker.word.words(1)}`
                let descricao_label = faker.word.words(5)
                let cor = '#FFAABB'

                cy.criar_label_api(token, titulo_label, cor, descricao_label, response.body[0].id).then((r) => {
                    expect(r.status).to.eq(201)
                })
            }
        })      
    })
    //})
    
    cy.get('.qa-issues-item').click()
    cy.get('.issues-list > :nth-child(1) > .issue-box > .issuable-info-container > .issuable-main-info > .issue-title > .issue-title-text').click()
    cy.get('.qa-edit-link-labels').click()
    cy.get('.dropdown-content > ul > :nth-child(1) > .label-item').click()
    cy.get('body').click()
})

/*Cypress.Commands.add('atribuir_label', (token, titulo, descricao) => {
    cy.visit('/')
    cy.get('body').then(($body) => {        
        if($body.find('.projects-list').length == 0){
            let nome_projeto = `project-${faker.string.uuid()}`
            let descricao_projeto = faker.word.words(5)

            cy.criar_projeto_api(token, nome_projeto, descricao_projeto, 'private', true).then((response) => {
                expect(response.status).to.eq(201)
            })
            cy.reload()            
        }        
    })    
    cy.get('.projects-list > :nth-child(1) > .project-details > .flex-wrapper > .project-title > .d-flex > .text-plain > .project-full-name > .project-name').click()    
    cy.get('.qa-issues-item').click().then(($body) => {
        if($body.find('.issues-holder > .content-list').length == 0){
            
            let titulo_issue = `project-${faker.string.uuid()}`
            let descricao_issue = faker.word.words(5)

            cy.criar_issue_api(token, titulo_issue, descricao_issue).then((response) => {
                expect(response.status).to.eq(201)
            })
        }
    })
    cy.get('.qa-labels-link').click().then(($body) => {
        if($body.find('.other-labels > .content-list').length == 0){
            
            let titulo_label = `project-${faker.string.uuid()}`
            let descricao_label = faker.word.words(5)
            let cor = '#ffaab'

            cy.criar_label_api(token, titulo_label, descricao_label, cor).then((response) => {
                expect(response.status).to.eq(201)
            })
        }
    })
    cy.get('#new_issue_link').click()
    cy.get('.qa-issuable-form-title').type(titulo)
    cy.get('.qa-issuable-form-description').type(descricao)
    

    cy.get('.qa-issuable-create-button').click()
    
})*/