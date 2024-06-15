import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const samples = pgTable("samples", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }),
});
