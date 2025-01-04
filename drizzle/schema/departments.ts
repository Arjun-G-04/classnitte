import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { professors } from "./professors";

export const departments = pgTable("departments", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
	professors: many(professors),
}));
