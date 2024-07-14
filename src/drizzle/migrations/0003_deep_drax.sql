ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "college_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "uid" varchar(50) NOT NULL;