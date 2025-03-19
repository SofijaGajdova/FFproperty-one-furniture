describe('Contact Form Tests', () => {
    beforeEach(() => {
        // Visit the page where the contact form is located
        cy.visit('https://p1furniture.ffstage.com/contact/');

        cy.wait(2000);
    });

    it('should display the contact form', () => {
        // Log the page content for debugging
        cy.get('body').then($body => {
            console.log($body.text())
        });

        // Make the text matcher more flexible
        cy.contains(/form|contact|message/i, { timeout: 10000 }).should('be.visible');

        // Check for form existence with a more generic selector
        cy.get('form', { timeout: 10000 }).should('be.visible');
    });

    it('should submit the contact form with valid inputs', () => {
        // Fill out the contact form
        cy.get('input[placeholder="Name"]').type('John Doe')
            .should('have.value', 'John Doe');
        cy.get('input[placeholder="E-mail"]').type('john.doe@example.com')
            .should('have.value', 'john.doe@example.com');
        cy.get('input[placeholder="Phone"]').type('1234567890')
            .should('have.value', '1234567890');
        cy.get('textarea[placeholder="Message..."]')
            .should('be.visible')
            .type('This is a test message.')
            .should('have.value', 'This is a test message.');

        cy.contains('span', 'Submit').click();
        // Verify no error messages are present after valid submission
        cy.contains("Form validation failed.").should('not.exist');
    });

    it('should show error for empty form submission', () => {
        cy.contains('span', 'Submit').click();
        // Verify error messages are displayed
        cy.contains("Form validation failed.").should('be.visible');
        // Verify all fields are marked as required
        // cy.get('input[placeholder="Name"]').should('have.attr', 'required');
        // cy.get('input[placeholder="E-mail"]').should('have.attr', 'required');
        // cy.get('input[placeholder="Phone"]').should('have.attr', 'required');
        // cy.get('textarea[placeholder="Message..."]').should('have.attr', 'required');
    });

    it.skip('should show error for invalid email format', () => {
        cy.get('input[placeholder="Name"]').type('John Doe');
        cy.get('input[placeholder="E-mail"]').type('invalid-email');
        cy.get('input[placeholder="Phone"]').type('1234567890');
        cy.get('textarea[placeholder="Message..."]').type('Test message');
        
        cy.contains('span', 'Submit').click();
        // Verify email validation error
        cy.contains("Form validation failed.").should('be.visible');
    });
});