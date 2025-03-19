// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => {
  // navigate to the website
  cy.visit("https://p1furniture.ffstage.com/user/sign-in/");

  // fill in the username and password
  cy.get('[name="email"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get("input[type='checkbox']").click();
  cy.get("form").contains("Sign In").parent().click();

  cy.wait(2000);

  // check if the user is redirected to the home page
  cy.url().should("include", "https://p1furniture.ffstage.com/");
});

Cypress.Commands.add("logout", () => {
  // click on the profile icon
  cy.get("img[src='/icons/profileactive.svg']").click({
    multiple: true,
    force: true,
  });
  // click on the logout button

  cy.get("header").contains("Sign Out", { timeout: 10000 }).click({ multiple: true, force: true });
  
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
