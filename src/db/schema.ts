import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: varchar("content", { length: 250 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPostSchema = createInsertSchema(posts, {
  content: (schema) => schema
    .min(1, "Content is required")
    .max(250, "Content must be less than 250 characters")
    .trim(),
});

export const selectPostSchema = createSelectSchema(posts);

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type PostFormData = z.infer<typeof insertPostSchema>;