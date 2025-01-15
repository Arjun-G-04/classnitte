import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { professors } from "./professors";

export const classes = pgTable("classes", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 75 }).notNull(),
	professorId: integer("professor_id").notNull(),
});

export const classesRelations = relations(classes, ({ many, one }) => ({
	professor: one(professors, {
		fields: [classes.professorId],
		references: [professors.id],
	}),
}));
