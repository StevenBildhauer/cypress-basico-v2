// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
      });

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preencha os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('steven')
        cy.get('#lastName').type('bildhauer')
        cy.get('#email').type('stevenbildhauer@gmail.com')
        cy.get('#open-text-area').type('longtext')
        cy.get('button[type="submit"]').contains('Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('steven')
        cy.get('#lastName').type('bildhauer')
        cy.get('#email').type('stevenbildhauer@gmail,com')
        cy.get('#open-text-area').type('longtext')
        cy.get('button[type="submit"]').contains('Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone vai continuar vazio se colocar algo que não seja números', function(){
        cy.get('#firstName').type('steven')
        cy.get('#lastName').type('bildhauer')
        cy.get('#email').type('stevenbildhauer@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('longtext')
        cy.get('button[type="submit"]').contains('Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('digita os valores e apaga', function(){
        cy.get('#firstName').type('steven').should('have.value', 'steven')
        .clear()
        .should('have.value', '')
        cy.get('#lastName').type('bildhauer').should('have.value', 'bildhauer')
        .clear()
        .should('have.value', '')
        cy.get('#email').type('stevenbildhauer@gmail.com').should('have.value', 'stevenbildhauer@gmail.com')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').contains('Enviar').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.produto()
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .check()
        .should('be.checked')
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('samplefile')
        cy.get('#file-upload')
        .selectFile('@samplefile')
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
        .contains('Política de Privacidade')
        .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Não salvamos dados')
        .should('be.visible')
    })

    // Simulando o viewport de um dispositivo móvel
  })