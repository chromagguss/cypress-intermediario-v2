//const env = require ('../fixtures/env.json')
const { faker } = require ('@faker-js/faker')

//APIs Gitlab https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/api/openapi/openapi_v2.yaml
//API de projetos https://docs.gitlab.com/api/projects/
Cypress.Commands.add('criar_projeto_api', (token, nome, descricao, visibilidade = 'private', readme = false) => {    
    cy.request({
        method: 'POST',
        url: '/api/v4/projects/',
        body: {
            name: nome,
            description: descricao,
            initialize_with_readme: true,
            visibility: visibilidade
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})

Cypress.Commands.add('listar_todos_projetos_api', (token) => {    
    cy.request({
        method: 'GET',
        url: '/api/v4/projects/',        
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})


Cypress.Commands.add('deletar_todos_projetos_api', (token) => {    
    cy.listar_todos_projetos_api(token).then((response) => {
        response.body.forEach((projeto) => {
            cy.request({
                method: 'DELETE',
                url: `/api/v4/projects/${projeto.id}`,        
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                expect(res.status).to.eq(202)
            })   
        });     
    })
    
})

Cypress.Commands.add('listar_todas_issues_do_projeto_api', (token, id_projeto) => {    
    cy.request({
        method: 'GET',
        url: `/api/v4/projects/${id_projeto}/issues/`,        
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})


Cypress.Commands.add('criar_issue_api', (token, titulo, descricao, id_projeto = null) => {  
    let nome_projeto
    let descricao_projeto

    cy.listar_todos_projetos_api(token).then((response) => {        
        if(response.body.length <= 0){
            nome_projeto = `project-${faker.string.uuid()}`
            descricao_projeto = faker.word.words(5)

            cy.criar_projeto_api(token, nome_projeto, descricao_projeto, 'private', true).then((response) => {
                expect(response.status).to.eq(201)
                cy.request({
                    method: 'POST',
                    url: `/api/v4/projects/${response.body.id}/issues/`,
                    body: {
                        title: titulo,
                        description: descricao            
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })             
            })           
        }
        else {
            if (id_projeto == null) {
                id_projeto = response.body[0].id
            }

            cy.request({
                method: 'POST',
                url: `/api/v4/projects/${id_projeto}/issues/`,
                body: {
                    title: titulo,
                    description: descricao            
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    })
})



Cypress.Commands.add('criar_label_api', (token, titulo_label, cor, descricao_label, id_projeto) => {  

    cy.listar_todas_issues_do_projeto_api(token, id_projeto).then((response) => {        
        if(response.body.length <= 0){
            let titulo_issue = faker.word.words(2)
            let descricao_issue = faker.word.words(5)             

            cy.criar_issue_api(token, titulo_issue, descricao_issue, id_projeto).then((response) => {
                expect(response.status).to.eq(201)                             
            })           
        }

        cy.request({
        method: 'POST',
        url: `/api/v4/projects/${id_projeto}/labels/`,
        body: {
            name: titulo_label,
            description: descricao_label,
            color: cor         
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    })
})