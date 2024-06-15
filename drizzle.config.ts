import { DB_CONNECTION_STRING } from "@/utils/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/drizzle/schema/*",
	out: "./src/drizzle/migrations",
	dbCredentials: {
		url: DB_CONNECTION_STRING,
	},
});
