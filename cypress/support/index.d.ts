/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {
		register(): Chainable<Subject>;
		login(): Chainable<Subject>;
		loginWithoutRegister(): Chainable<Subject>;
	}
}
