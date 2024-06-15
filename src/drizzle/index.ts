import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { samples } from "./schema/samples";
import { DB_CONNECTION_STRING } from "@/utils/config";

const pool = new Pool({
	connectionString: DB_CONNECTION_STRING,
});

export const db = drizzle(pool, { schema: { samples } });
