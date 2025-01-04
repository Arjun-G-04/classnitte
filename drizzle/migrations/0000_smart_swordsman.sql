CREATE TABLE IF NOT EXISTS "colleges" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(75) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professors" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(50) NOT NULL,
	"name" varchar(50) NOT NULL,
	"password" varchar NOT NULL,
	"department_id" integer NOT NULL,
	"college_id" integer NOT NULL,
	CONSTRAINT "professors_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"uid" varchar(50) NOT NULL,
	"college_id" integer NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
