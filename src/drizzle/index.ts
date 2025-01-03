import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users } from "./schema/users";

const pool = new Pool({
	connectionString: process.env.DB_CONNECTION_STRING!,
});

export const db = drizzle(pool, { schema: { users } });
