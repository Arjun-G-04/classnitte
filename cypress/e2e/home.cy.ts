describe("Home Page", () => {
	it("should redirect away from home page when not logged in", () => {
		cy.visit("/home");
		cy.url().should("not.include", "/home");
	});

	it("should be able to see home page when logged in", () => {
		cy.login();
		cy.visit("/home");
		cy.url().should("include", "/home");
		cy.contains("Welcome Home, Arjun").should("exist");
	});

	it("should be able to logout", () => {
		cy.login();
		cy.visit("/home");
		cy.contains("Logout").click();
		cy.visit("/");
		cy.contains("Login with DAuth").should("exist");
	});
});