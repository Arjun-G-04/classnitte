describe("User API", () => {
	beforeEach(() => {
		cy.exec("pnpm db:seed");
	});

	afterEach(() => {
		cy.exec("pnpm db:reset");
	});

	describe("exists", () => {
		it("should return false when there is no session", () => {
			cy.request({
				url: "/api/trpc/user.exists",
				method: "GET",
			}).then((response) => {
				expect(response.body.result.data).to.eq(false);
			});
		});

		it("should return false when there is session of unregistered user", () => {
			cy.loginWithoutRegister();
			cy.request({
				url: "/api/trpc/user.exists",
				method: "GET",
			}).then((response) => {
				expect(response.body.result.data).to.eq(false);
			});
		});

		it("should return true when there is session of registered user", () => {
			cy.exec("pnpm db:test");
			cy.login();
			cy.request({
				url: "/api/trpc/user.exists",
				method: "GET",
			}).then((response) => {
				expect(response.body.result.data).to.eq(true);
			});
		});
	});

	describe("register", () => {
		it("should not allow to register if not logged in", () => {
			cy.request({
				url: "/api/trpc/user.register",
				method: "POST",
				body: {
					name: "Arjun",
					email: "111122015@nitt.edu",
					college: "NIT Trichy",
					uid: "111122015",
				},
				failOnStatusCode: false,
			}).then((response) => {
				expect(response.status).to.eq(401);
			});
		});

		it("should not allow to register email not same as session email", () => {
			cy.loginWithoutRegister();
			cy.request({
				url: "/api/trpc/user.register",
				method: "POST",
				body: {
					name: "Arjun",
					email: "sample@sample.com",
					college: "NIT Trichy",
					uid: "111122015",
				},
				failOnStatusCode: false,
			}).then((response) => {
				expect(response.status).to.eq(400);
			});
		});

		it("should not allow to register unavailable college name", () => {
			cy.loginWithoutRegister();
			cy.request({
				url: "/api/trpc/user.register",
				method: "POST",
				body: {
					name: "Arjun",
					email: "111122015@nitt.edu",
					college: "Random XYZ",
					uid: "111122015",
				},
				failOnStatusCode: false,
			}).then((response) => {
				expect(response.status).to.eq(400);
			});
		});

		it("should not allow to register invalid data", () => {
			cy.loginWithoutRegister();
			cy.request({
				url: "/api/trpc/user.register",
				method: "POST",
				body: {
					email: "111122015@nitt.edu",
					college: "NIT Trichy",
					uid: "111122015",
				},
				failOnStatusCode: false,
			}).then((response) => {
				expect(response.status).to.eq(400);
			});
		});
	});

	describe("name", () => {
		it("should not allow if unauthenticated", () => {
			cy.request({
				url: "/api/trpc/user.name",
				method: "GET",
				failOnStatusCode: false,
			}).then((response) => {
				expect(response.status).to.eq(401);
			});
		});

		it("should return name of logged in user", () => {
			cy.exec("pnpm db:test");
			cy.login();
			cy.request({
				url: "/api/trpc/user.name",
				method: "GET",
			}).then((response) => {
				expect(response.body.result.data).to.eq("Arjun");
			});
		});
	});
});
