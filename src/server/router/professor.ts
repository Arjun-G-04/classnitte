import { getServerSession } from "next-auth";
import { publicProcedure, router } from "../trpc";
import { eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { db } from "@drizzle/index";
import { users, usersToClasses } from "@drizzle/schema/users";
import { professors } from "@drizzle/schema/professors";
import { CreateClassSchema } from "@/utils/schemas/professor/class/CreateClass";
import { classes } from "@drizzle/schema/classes";
import { CreateClassValidSchema } from "@/utils/schemas/professor/class/CreateClassValid";

const professorProcedure = publicProcedure.use(async (opts) => {
	// General Error
	const error = new TRPCError({
		code: "UNAUTHORIZED",
		message: "Unauthorized",
	});

	// Get session from NextAuth
	const session = await getServerSession();
	if (!session?.user?.email) throw error;

	// Check if there is a professor with the email
	const professor = await db
		.select()
		.from(professors)
		.where(eq(professors.email, session.user.email));
	if (professor.length !== 1) throw error;

	// Add user to context
	return opts.next({
		ctx: {
			professor: professor[0],
		},
	});
});

export const professorRouter = router({
	name: professorProcedure.query((opts) => {
		return opts.ctx.professor.name;
	}),

	validUsers: professorProcedure
		.input(CreateClassSchema)
		.mutation(async (opts) => {
			const listOfUsers = await db.select({ uid: users.uid }).from(users);
			const inputStudentsUid = opts.input.students.split("\n");
			const validStudentsUid: string[] = [];
			const invalidStudentsUid: string[] = [];
			for (const uid of inputStudentsUid) {
				if (listOfUsers.find((user) => user.uid === uid)) {
					validStudentsUid.push(uid);
				} else {
					invalidStudentsUid.push(uid);
				}
			}
			return {
				validStudentsUid,
				invalidStudentsUid,
			};
		}),

	createClass: professorProcedure
		.input(CreateClassValidSchema)
		.mutation(async (opts) => {
			const createdClass = await db
				.insert(classes)
				.values({ name: opts.input.name, professorId: opts.ctx.professor.id })
				.returning({ id: classes.id });
			const students = await db
				.select({ id: users.id })
				.from(users)
				.where(inArray(users.uid, opts.input.students));
			for (const student of students) {
				await db.insert(usersToClasses).values({
					userId: student.id,
					classId: createdClass[0].id,
				});
			}
		}),

	getClasses: professorProcedure.query(async (opts) => {
		const profClasses = await db
			.select({ id: classes.id, name: classes.name })
			.from(classes)
			.where(eq(classes.professorId, opts.ctx.professor.id));
		return profClasses;
	}),
});
