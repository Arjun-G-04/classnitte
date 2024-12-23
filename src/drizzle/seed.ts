import { db } from ".";
import { colleges } from "./schema/colleges";

async function main() {
	console.log("Seeding colleges...");
	await db
		.insert(colleges)
		.values({ name: "NIT Trichy" })
		.onConflictDoNothing();
	console.log("Colleges seeded.");
	console.log("Seed complete.");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
