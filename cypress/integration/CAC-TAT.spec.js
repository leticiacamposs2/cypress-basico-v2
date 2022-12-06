/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    const firstName = 'Leticia';
    const lastName = 'Campos';
    const email = 'le@teste.com.br';
    const textArea = 'Simulação de testes cypress';
    const success = '.success';
    const error = '.error';
    const phone = '00000000';
    const inputFirstName = '#firstName';
    const inputLastName = '#lastName';
    const inputEmail = '#email';
    const inputTextArea = '#open-text-area';
    const inputPhone = '#phone';
    const checkboxPhone = '#phone-checkbox';
    const selectProduct = 'select#product';
    const successMessage = 'Mensagem enviada com sucesso.';
    const errorMessage = 'Valide os campos obrigatórios!';
    const buttonSubmit = 'button[type="submit"]';
    const THREE_SECONDS_IN_MS = 3000;

    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verifica o titulo da aplicação', () => {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()
        
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get(success)
            .should('be.visible')
            .contains(successMessage)

        cy.tick(THREE_SECONDS_IN_MS);

        cy.get(success)
            .should('not.be.visible')
    })

    it('texto longo escrito em milisegundos', () => {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis magna ligula, porttitor nec interdum in, ullamcorper eget nisi. Vivamus bibendum, ligula elementum aliquam accumsan, diam dolor tincidunt lectus, nec euismod nibh nunc id nulla. Donec in volutpat tortor. Aliquam erat volutpat. Morbi iaculis nibh quis nunc eleifend accumsan. Duis porta ante neque, a consequat dolor fringilla sed. Pellentesque nec metus elementum, convallis leo egestas, suscipit tellus. Nunc a tincidunt dolor. Cras elementum sit amet augue at ultrices. Nam id eros eu purus ullamcorper congue quis non quam. Morbi rhoncus bibendum tempor. In hac habitasse platea dictumst. Etiam vehicula tempus justo vitae sagittis. Nunc in erat a ipsum porta feugiat. Sed sit amet neque euismod, iaculis dolor vitae, tempus turpis. Curabitur convallis turpis massa, sit amet dapibus velit viverra ut.';
        cy.get(inputTextArea)
            .type(longText, { delay: 0 })
            .click()
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        
        cy.get(inputFirstName)
            .type(firstName)
            .should('have.value', firstName)
            .click()
        
        cy.get(inputLastName)
            .type(lastName)
            .should('have.value', lastName)
            .click()

        cy.get(inputEmail)
            .type('X')
            .should('have.value', 'X')
            .click()
        
        cy.get(inputTextArea)
            .type(textArea)
            .should('have.value', textArea)
            .click()

        cy.contains('button', 'Enviar')
            .click()
        
        cy.get(error)
            .should('be.visible')
            .contains(errorMessage)

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get(error)
            .should('not.be.visible')

    })

    it('prenche o telefone com valor não numerico e valida se o input ficará vazio', () => {
        cy.get(inputPhone)
            .type('abc')
            .should('have.value', '')        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        
        cy.get(checkboxPhone)
            .check()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get(error)
            .should('be.visible')
            .contains(errorMessage)
        
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get(error)
            .should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get(inputFirstName)
            .type(firstName)
            .should('have.value', firstName)
            .clear()
            .should('have.value', '')

        cy.get(inputLastName)
            .type(lastName)
            .should('have.value', lastName)
            .clear()
            .should('have.value', '')

        cy.get(inputEmail)
            .type(email)
            .should('have.value', email)
            .clear()
            .should('have.value', '')

        cy.get(inputPhone)
            .type(phone)
            .should('have.value', phone)
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()

        cy.get(selectProduct)
            .select('blog')
        
        cy.get(checkboxPhone)
            .check()

        cy.get(buttonSubmit)
            .click()
        
        cy.get(error)
            .should('be.visible')
            .contains(errorMessage)
        
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get(error)
            .should('not.be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.clock()
        
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get(success)
            .should('be.visible')
            .contains(successMessage)
        
        cy.tick(THREE_SECONDS_IN_MS);

        cy.get(success)
            .should('not.be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get(selectProduct)
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get(selectProduct)
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get(selectProduct)
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

        // OUTRA FORMA DE FAZER
        // cy.get('input[type="radio"]')
        //     .check('feedback')
        //     .should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })

            // OUTRA FORMA DE VALIDAR
            // .then(($input) => {
            //     const files = $input[0].files
            //     expect(files[0].name).to.eq('example.json')
            // })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing')
            .should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get(success)
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', successMessage)
          .invoke('hide')
          .should('not.be.visible')

        cy.get(error)
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', errorMessage)
          .invoke('hide')
          .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)
      
        cy.get(inputTextArea)
          .invoke('val', longText)
          .should('have.value', longText)
    })

    it('faz uma requisição HTTP', () => {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
          }).then((response) => {
            const { status, statusText, body } = response
            expect(status).to.equal(200);
            expect(statusText).to.equal('OK');
            expect(body).include('CAC TAT')
          })       
    })

})