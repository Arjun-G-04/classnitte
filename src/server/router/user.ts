import { getServerSession } from "next-auth";
import { publicProcedure, router } from "../trpc";
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/users";
import { eq } from "drizzle-orm";
import { RegisterFormSchema } from "@/utils/register/schema";
import { colleges } from "@/drizzle/schema/colleges";
import { TRPCError } from "@trpc/server";

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
		if (!session?.user?.email) return false;
		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, session.user.email));
		return user.length === 1;
	}),

	register: publicProcedure
		.input(RegisterFormSchema)
		.mutation(async (opts) => {
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
					message:
						"Logged in user does not match with register email",
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
