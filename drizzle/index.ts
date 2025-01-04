import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DB_CONNECTION_STRING ?? "",
});

export const db = drizzle(pool);
