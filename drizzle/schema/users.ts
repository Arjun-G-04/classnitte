import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { colleges } from "./colleges";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull(),
	email: varchar("email", { length: 50 }).notNull().unique(),
	uid: varchar("uid", { length: 50 }).notNull(),
	collegeId: integer("college_id").notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
	college: one(colleges, {
		fields: [users.collegeId],
		references: [colleges.id],
	}),
}));
