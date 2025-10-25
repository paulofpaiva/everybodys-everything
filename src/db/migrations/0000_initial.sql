CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(20) NOT NULL,
	"content" varchar(250),
	"drawing_data" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
