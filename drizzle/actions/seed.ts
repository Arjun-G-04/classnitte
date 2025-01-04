import bcrypt from "bcrypt";
import { db } from "..";
import { colleges } from "@drizzle/schema/colleges";
import { departments } from "@drizzle/schema/departments";
import { professors } from "@drizzle/schema/professors";

async function hashPassword(plainPassword: string) {
	return new Promise<string>((resolve, reject) => {
		bcrypt.hash(plainPassword, 10, (error, hash) => {
			if (error) {
				reject(error);
			} else {
				resolve(hash);
			}
		});
	});
}

async function main() {
	console.log("Seeding colleges...");
	const college = await db
		.insert(colleges)
		.values({ name: "NIT Trichy" })
		.onConflictDoNothing()
		.returning({ id: colleges.id });
	console.log("Colleges seeded.");

	console.log("Seeding departments...");
	const department = await db
		.insert(departments)
		.values({ name: "Mechanical Engineering" })
		.onConflictDoNothing()
		.returning({ id: departments.id });
	console.log("Departments seeded.");

	console.log("Seeding professors...");
	const hashedPassword = await hashPassword("password");
	await db
		.insert(professors)
		.values({
			name: "Panir",
			email: "panir@nitt.edu",
			password: hashedPassword,
			collegeId: college[0].id,
			departmentId: department[0].id,
		})
		.onConflictDoNothing();
	console.log("Professors seeded.");

	console.log("Seed complete.");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
