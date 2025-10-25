ALTER TABLE "posts" ALTER COLUMN "content" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "type" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "drawing_data" jsonb;