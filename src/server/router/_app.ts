import { router } from "../trpc";
import { professorRouter } from "./professor";
import { userRouter } from "./user";

export const appRouter = router({
	user: userRouter,
	professor: professorRouter,
});

export type AppRouter = typeof appRouter;
