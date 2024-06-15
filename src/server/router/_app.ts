import { db } from "@/drizzle";
import { publicProcedure, router } from "../trpc";
import { asc } from "drizzle-orm";
import { samples } from "@/drizzle/schema/samples";

// all routes
export const appRouter = router({
	sample: publicProcedure.query(async () => {
		const samplesData = await db.query.samples.findMany({
			orderBy: [asc(samples.id)],
		});
		return samplesData;
	}),
});

export type AppRouter = typeof appRouter;
