/// <reference types="cypress" />

Cypress.Commands.add("register", () => {
	cy.session("registerSession", () => {
		cy.intercept(
			"/api/oauth/authorize",
			{
				hostname: "auth.delta.nitt.edu",
			},
			() => {},
		).as("oauthCallback");
		cy.visit("/");
		cy.contains("Login").click();
		cy.origin("https://auth.delta.nitt.edu", () => {
			cy.get("input[name=webmailId]").type(Cypress.env("email"));
			cy.get("input[name=password]").type(Cypress.env("password"));
			cy.get(".submit_button").click();
		});
		cy.wait("@oauthCallback").then((interception) => {
			const response = interception.response?.body;
			const tempElement = document.createElement("div");
			tempElement.innerHTML = response;
			const link = tempElement.querySelector("a")?.getAttribute("href");
			cy.visit(link!);
		});
		cy.get('[name="name"]').type("Arjun");
		cy.contains("Submit").click();
		cy.url().should("include", "/home");
	});
});

Cypress.Commands.add("login", () => {
	cy.session(
		"loginSession",
		() => {
			cy.intercept(
				"/api/oauth/authorize",
				{
					hostname: "auth.delta.nitt.edu",
				},
				() => {},
			).as("oauthCallback");
			cy.visit("/");
			cy.contains("Login").click();
			cy.origin("https://auth.delta.nitt.edu", () => {
				cy.get("input[name=webmailId]").type(Cypress.env("email"));
				cy.get("input[name=password]").type(Cypress.env("password"));
				cy.get(".submit_button").click();
			});
			cy.wait("@oauthCallback").then((interception) => {
				const response = interception.response?.body;
				const tempElement = document.createElement("div");
				tempElement.innerHTML = response;
				const link = tempElement
					.querySelector("a")
					?.getAttribute("href");
				cy.visit(link!);
			});
			cy.url().should("include", "/home");
		},
		{
			cacheAcrossSpecs: true,
		},
	);
});

Cypress.Commands.add("loginWithoutRegister", () => {
	cy.session("loginWithoutRegisterSession", () => {
		cy.intercept(
			"/api/oauth/authorize",
			{
				hostname: "auth.delta.nitt.edu",
			},
			() => {},
		).as("oauthCallback");
		cy.visit("/");
		cy.contains("Login").click();
		cy.origin("https://auth.delta.nitt.edu", () => {
			cy.get("input[name=webmailId]").type(Cypress.env("email"));
			cy.get("input[name=password]").type(Cypress.env("password"));
			cy.get(".submit_button").click();
		});
		cy.wait("@oauthCallback").then((interception) => {
			const response = interception.response?.body;
			const tempElement = document.createElement("div");
			tempElement.innerHTML = response;
			const link = tempElement.querySelector("a")?.getAttribute("href");
			cy.visit(link!);
		});
	});
});
