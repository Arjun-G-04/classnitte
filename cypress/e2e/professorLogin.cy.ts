describe("Professor Login", () => {
	beforeEach(() => {
		cy.exec("pnpm db:seed");
	});

	afterEach(() => {
		cy.exec("pnpm db:reset");
	});

	it("should successfully login with valid credentials", () => {
		cy.visit("/professor/login");
		cy.get("input[name=email]").type("professor@example.com");
		cy.get("input[name=password]").type("validpassword");
		cy.contains("Submit").click();
		cy.url().should("include", "/professor/home");
	});

	it("should show error for invalid email", () => {
		cy.visit("/professor/login");
		cy.get("input[name=email]").type("invalid@example.com");
		cy.get("input[name=password]").type("validpassword");
		cy.contains("Submit").click();
		cy.contains("User not found").should("exist");
	});

	it("should show error for invalid password", () => {
		cy.visit("/professor/login");
		cy.get("input[name=email]").type("professor@example.com");
		cy.get("input[name=password]").type("invalidpassword");
		cy.contains("Submit").click();
		cy.contains("Invalid password").should("exist");
	});
});
