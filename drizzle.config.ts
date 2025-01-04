import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./drizzle/schema/*",
	out: "./drizzle/migrations",
	dbCredentials: {
		url: process.env.DB_CONNECTION_STRING ?? "",
	},
});
