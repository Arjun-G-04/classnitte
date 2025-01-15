CREATE TABLE IF NOT EXISTS "classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(75) NOT NULL,
	"professor_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_classes" (
	"user_id" integer NOT NULL,
	"class_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_classes" ADD CONSTRAINT "users_to_classes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_classes" ADD CONSTRAINT "users_to_classes_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
