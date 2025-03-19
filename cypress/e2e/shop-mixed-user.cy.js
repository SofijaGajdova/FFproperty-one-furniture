describe("Shop page tests", () => {
  let token;
  // This will run before each test
  before(() => {
    // This will ignore errors coming from react
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.stack.includes("react")) {
        return false; // Ignore errors coming from that file
      }
      return true;
    });
  });

  it('should order one "Dual Monitor Arm"', () => {
    cy.visit(
      "https://p1furniture.ffstage.com/products/accessories/decor/dual-monitor-arm/"
    );

    cy.get("button").contains("Add to cart").click();

    cy.wait(2000);

    // check if the product is added to the cart
    cy.contains("Cart Summary")
      .parent()
      .parent()
      .parent()
      .contains("Dual Monitor Arm");

    // check if the total price is correct
    cy.contains("Total Price")
      .siblings()
      .contains("75.00")
      .should("be.visible");

    cy.wait(2000);

    cy.login("s.gajdova@mima-it.net", "BestQA123!");

    cy.get("img[src='/icons/cart.svg']").click({
      multiple: true,
      force: true,
    });

    cy.wait(2000);

    cy.contains("Proceed to Checkout").click();

    cy.wait(2000);

    cy.url().should("include", "https://p1furniture.ffstage.com/cart/");

    // cy.get('[name="firstName"]').type("John");
    // cy.get('[name="lastName"]').type("Doe");
    // cy.get('[name="email"]').type("s.gajdova@mima-it.net");
    // cy.get('[name="phone"]').type("1234567890");
    // cy.get('[name="company"]').type("Mima-IT");
    // select the country from select dropdown where value is MK
    // cy.get('[name="country"]').select("NORTH MACEDONIA");
    // cy.get('[name="city"]').type("Skopje");
    // cy.get('[name="address1"]').type("address1");
    // cy.get('[name="postcode"]').type("2000");
    cy.contains("Confirm Payment").parent().click();

    cy.wait(2000);
    cy.logout();
  });
});
