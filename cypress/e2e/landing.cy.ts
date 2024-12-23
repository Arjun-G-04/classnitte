describe("Landing Page", () => {
	beforeEach(() => {
		cy.exec("pnpm db:seed");
	});

	afterEach(() => {
		cy.exec("pnpm db:reset");
	});

	it("should be able to register a user via DAuth", () => {
		cy.register();
	});

	it("should be able to login a user via DAuth", () => {
		cy.exec("pnpm db:test");
		cy.login();
	});

	it("should redirect to home page when logged in", () => {
		cy.exec("pnpm db:test");
		cy.login();
		cy.visit("/");
		cy.url().should("include", "/home");
		cy.contains("Welcome Home, Arjun").should("exist");
	});
});
