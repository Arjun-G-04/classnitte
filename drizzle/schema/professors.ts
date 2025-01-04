import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { colleges } from "./colleges";
import { departments } from "./departments";

export const professors = pgTable("professors", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 50 }).notNull().unique(),
	name: varchar("name", { length: 50 }).notNull(),
	password: varchar("password").notNull(),
	departmentId: integer("department_id").notNull(),
	collegeId: integer("college_id").notNull(),
});

export const professorsRelations = relations(professors, ({ one }) => ({
	college: one(colleges, {
		fields: [professors.collegeId],
		references: [colleges.id],
	}),
	department: one(departments, {
		fields: [professors.departmentId],
		references: [departments.id],
	}),
}));
