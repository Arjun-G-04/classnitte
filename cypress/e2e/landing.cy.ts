describe("Landing Page", () => {
	it("should be able to register a user via DAuth", () => {
		cy.register();
	});

	it("should be able to login a user via DAuth", () => {
		cy.login();
	});

	it("should redirect to home page when logged in", () => {
		cy.login();
		cy.visit("/");
		cy.url().should("include", "/home");
		cy.contains("Welcome Home, Arjun").should("exist");
	});
});
