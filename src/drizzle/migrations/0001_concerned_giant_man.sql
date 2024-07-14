CREATE TABLE IF NOT EXISTS "colleges" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(75)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"email" varchar(50),
	"college_id" integer
);
