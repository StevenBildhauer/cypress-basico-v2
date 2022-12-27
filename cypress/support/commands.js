// ***********************************************
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('steven')
    cy.get('#lastName').type('bildhauer')
    cy.get('#email').type('stevenbildhauer@gmail.com')
    cy.get('#open-text-area').type('longtext')
    cy.get('button[type="submit"]').contains('Enviar').click()
    cy.get('.success').should('be.visible')
})

Cypress.Commands.add('produto', function(){
    cy.get('#product')
    .select('blog')
    .should('have.value', 'blog')
})