import { appRouter } from "./router/_app";
import { createCallerFactory } from "./trpc";

// server side caller
const createCaller = createCallerFactory(appRouter);
export const caller = createCaller({});
