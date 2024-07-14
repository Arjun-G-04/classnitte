import { samples } from "./schema/samples";
import { db } from ".";
import { colleges } from "./schema/colleges";

async function main() {
	console.log("Seeding samples...");
	await db
		.insert(samples)
		.values({ id: 1, name: "Sample 1" })
		.onConflictDoUpdate({ target: samples.id, set: { name: "Sample 1" } });
	console.log("Samples seeded.");
	console.log("Seeding colleges...");
	await db
		.insert(colleges)
		.values({ name: "NIT Trichy" })
		.onConflictDoNothing();
	console.log("Samples seeded.");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
