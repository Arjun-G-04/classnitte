/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {
		register(): Chainable<any>;
		login(): Chainable<any>;
	}
}
