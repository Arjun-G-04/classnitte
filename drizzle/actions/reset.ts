import { db } from "..";
import { sql } from "drizzle-orm";

type TableNameRow = { table_name: string };

async function main() {
	const query = sql<TableNameRow>`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';`;
	const tables = await db.execute<TableNameRow>(query);
	for (const table of tables.rows) {
		const query = sql.raw(`DROP TABLE "${table.table_name}" CASCADE;`);
		await db.execute(query);
	}
	console.log("Reset complete.");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
