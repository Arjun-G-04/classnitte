import { getServerSession } from "next-auth";
import { publicProcedure, router } from "../trpc";
import { eq } from "drizzle-orm";
import { RegisterFormSchema } from "@/app/student/register/(form)/schema";
import { TRPCError } from "@trpc/server";
import { db } from "@drizzle/index";
import { users } from "@drizzle/schema/users";
import { professors } from "@drizzle/schema/professors";
import { colleges } from "@drizzle/schema/colleges";

const studentProcedure = publicProcedure.use(async (opts) => {
	// General Error
	const error = new TRPCError({
		code: "UNAUTHORIZED",
		message: "Unauthorized",
	});

	// Get session from NextAuth
	const session = await getServerSession();
	if (!session?.user?.email) throw error;

	// Check if there is a user with the email
	const user = await db
		.select()
		.from(users)
		.where(eq(users.email, session.user.email));
	if (user.length !== 1) throw error;

	// Add user to context
	return opts.next({
		ctx: {
			user: user[0],
		},
	});
});

export const userRouter = router({
	exists: publicProcedure.query(async () => {
		const session = await getServerSession();
		if (!session?.user?.email) return "unauthenticated";

		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, session.user.email));
		if (user.length === 1) return "user";

		const professor = await db
			.select()
			.from(professors)
			.where(eq(professors.email, session.user.email));
		if (professor.length === 1) return "professor";

		return "unregistered";
	}),

	register: publicProcedure.input(RegisterFormSchema).mutation(async (opts) => {
		// Make sure user is logged in
		const session = await getServerSession();
		if (!session?.user?.email) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "Not logged in",
			});
		}

		// Make sure email matches
		if (session.user.email !== opts.input.email) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Logged in user does not match with register email",
			});
		}

		// Make sure college exists
		const college = await db
			.select()
			.from(colleges)
			.where(eq(colleges.name, opts.input.college));
		if (college.length !== 1) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "College not found",
			});
		}

		// Register User
		await db.insert(users).values({
			name: opts.input.name,
			email: opts.input.email,
			uid: opts.input.uid,
			collegeId: college[0].id,
		});

		return "User registered";
	}),

	name: studentProcedure.query(async (opts) => {
		return opts.ctx.user.name;
	}),
});
