import { boolean, date, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { classes } from "./classes";

export const attendance = pgTable("attendance", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	classId: integer("class_id")
		.notNull()
		.references(() => classes.id, { onDelete: "cascade" }),
	date: date("date").notNull(),
	status: boolean("status").notNull(), // true = present, false = absent
});

export const attendanceRelations = relations(attendance, ({ one }) => ({
	student: one(users, {
		fields: [attendance.userId],
		references: [users.id],
	}),
	class: one(classes, {
		fields: [attendance.classId],
		references: [classes.id],
	}),
}));
