import { db } from ".";
import { colleges } from "./schema/colleges";
import { users } from "./schema/users";
import { eq } from "drizzle-orm";

async function main() {
	console.log("Adding users test data...");
	const college = await db
		.select()
		.from(colleges)
		.where(eq(colleges.name, "NIT Trichy"));
	await db.insert(users).values({
		name: "Arjun",
		email: "111122015@nitt.edu",
		uid: "111122015",
		collegeId: college[0].id,
	});
	console.log("Added users test data");
	console.log("Completed adding test data");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
