describe("Shop page tests", () => {
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

  it("should display shop section", () => {
    // navigate to the website
    cy.visit("https://p1furniture.ffstage.com/");

    // click on the shop button to open the shop section
    cy.contains("Shop").click();

    // check if the shop section is displayed
    cy.get("h4").contains("Accessories").should("be.visible");
    cy.get("h4").contains("ACOUSTIC").should("be.visible");
    cy.get("h4").contains("CHAIRS").should("be.visible");
    cy.get("h4").contains("Desks And Workspaces").should("be.visible");
    cy.get("h4").contains("Flooring").should("be.visible");
    cy.get("h4").contains("Lightning").should("be.visible");
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

    cy.contains("Proceed to Checkout").click();

    cy.wait(2000);

    cy.url().should("include", "https://p1furniture.ffstage.com/cart/");

    cy.get('[name="firstName"]').type("John");
    cy.get('[name="lastName"]').type("Doe");
    cy.get('[name="email"]').type("s.gajdova@mima-it.net");
    cy.get('[name="phone"]').type("1234567890");
    cy.get('[name="company"]').type("Mima-IT");
    
    cy.get('[name="country"]').select("NORTH MACEDONIA");
    cy.get('[name="city"]').type("Skopje");
    cy.get('[name="address1"]').type("address1");
    cy.get('[name="postcode"]').type("2000");
    cy.contains("Confirm Payment").parent().click();
  });


  it('should successfully add items to cart and remove them', () => {
    // Visit the main page
    cy.visit("https://p1furniture.ffstage.com/");

    // Navigate to Accessories section
    cy.contains("Shop").click();
    cy.contains("Accessories").click();

    // Add first available item to cart// 
    cy.get('a[href="/products/accessories/"]').first().click();


    cy.contains("Workbox").click();

    cy.get("button").contains("Add to cart").click();
    cy.wait(1000);

    // Verify item is in cart
    cy.contains("Cart Summary").should("be.visible");

    // Open cart
    cy.contains("Proceed to Checkout").click();
    cy.wait(1000);

    // Remove item from cart
    cy.contains("×").click();
    cy.wait(1000);

    // Verify cart is empty
    cy.contains("Your cart is empty").should("be.visible");
    cy.url().should("include", "https://p1furniture.ffstage.com/");
  });

  it('should add the same product twice to cart', () => {
    // Visit the product page
    cy.visit("https://p1furniture.ffstage.com/products/accessories/decor/dual-monitor-arm/");

    // Add to cart first time - using force: true to bypass overlay issues
    cy.get("button").contains("Add to cart").click({ force: true });
    cy.wait(1000);

    // Verify first item added
    cy.contains("Cart Summary")
      .parent()
      .parent()
      .parent()
      .contains("Dual Monitor Arm");

    // Add to cart second time - using force: true to bypass overlay issues
    cy.get("button").contains("Add to cart").click({ force: true });
    cy.wait(1000);

    // Verify quantity is 2 and total price is doubled
    cy.contains("Cart Summary")
      .parent()
      .parent()
      .parent()
      .contains("2"); // Check quantity

    cy.contains("Total Price")
      .siblings()
      .contains("150.00") 
      .should("be.visible");

    // Open cart page
    cy.contains("Proceed to Checkout").click();
    cy.wait(1000);

    // Verify on cart page
    cy.url().should("include", "https://p1furniture.ffstage.com/cart/");
    
    // Verify quantity and total again
    cy.contains("Dual Monitor Arm")
      .parent()
      .parent()
      .contains("2");
    
    cy.contains("Total")
      .parent()
      .contains("150.00");
  });
});
