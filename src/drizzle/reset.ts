import { db } from ".";
import { colleges } from "./schema/colleges";
import { users } from "./schema/users";

async function main() {
	console.log("Deleting colleges...");
	await db.delete(colleges);
	console.log("Colleges deleted.");
	console.log("Deleting users...");
	await db.delete(users);
	console.log("Users deleted.");
	console.log("Reset complete.");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
