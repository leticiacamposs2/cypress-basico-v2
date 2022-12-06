Cypress._.times(3, () => {
    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html');
    
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    
        cy.contains('Talking About Testing')
            .should('be.visible')
    })
})