import { db } from "..";
import { sql } from "drizzle-orm";

async function main() {
	const query1 = sql.raw("DROP SCHEMA public CASCADE;");
	await db.execute(query1);
	const query2 = sql.raw("DROP SCHEMA drizzle CASCADE;");
	await db.execute(query2);
	const query3 = sql.raw("CREATE SCHEMA public;");
	await db.execute(query3);
	console.log("Reset complete.");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
