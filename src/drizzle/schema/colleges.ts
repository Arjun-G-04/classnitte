import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const colleges = pgTable("colleges", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 75 }).notNull(),
});

export const collegesRelations = relations(colleges, ({ many }) => ({
	users: many(users),
}));
