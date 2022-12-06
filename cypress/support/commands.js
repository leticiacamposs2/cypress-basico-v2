const firstName = 'Leticia';
const lastName = 'Campos';
const email = 'le@teste.com.br';
const textArea = 'Simulação de testes cypress';
const phone = '00000000';
const inputFirstName = '#firstName';
const inputLastName = '#lastName';
const inputEmail = '#email';
const inputTextArea = '#open-text-area';

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get(inputFirstName)
        .type(firstName)
        .should('have.value', firstName)
        .click()

    cy.get(inputLastName)
        .type(lastName)
        .should('have.value', lastName)
        .click()

    cy.get(inputEmail)
        .type(email)
        .should('have.value', email)
        .click()

    cy.get(inputTextArea)
        .type(textArea)
        .should('have.value', textArea)
        .click()

    cy.contains('button', 'Enviar')
        .click()
})