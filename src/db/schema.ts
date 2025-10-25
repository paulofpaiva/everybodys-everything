import { pgTable, uuid, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: varchar("type", { length: 20 }).notNull(),
  content: varchar("content", { length: 250 }),
  drawing_data: jsonb("drawing_data"),
  animation: varchar("animation", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPostSchema = createInsertSchema(posts, {
  content: (schema) => schema
    .max(250, "Content must be less than 250 characters")
    .trim()
    .optional(),
  animation: (schema) => schema
    .optional()
    .nullable()
        .refine((val) => {
          if (!val) return true;
          const validAnimations = ['heart', 'heart_broken', 'heart_blind', 'dog_and_man', 'path_to_victory', 'couple_walking'];
          return validAnimations.includes(val);
        }, "Invalid animation type"),
}).refine(
  (data) => {
    if (data.type === "text") return !!data.content?.trim();
    if (data.type === "drawing") {
      if (!data.drawing_data) return false;
      if (Array.isArray(data.drawing_data)) return data.drawing_data.length > 0;
      if (typeof data.drawing_data === 'object' && data.drawing_data !== null && 'paths' in data.drawing_data && Array.isArray((data.drawing_data as any).paths)) {
        return (data.drawing_data as any).paths.length > 0;
      }
      return false;
    }
    if (data.type === "mixed") {
      if (!data.content?.trim() || !data.drawing_data) return false;
      if (Array.isArray(data.drawing_data)) return data.drawing_data.length > 0;
      if (typeof data.drawing_data === 'object' && data.drawing_data !== null && 'paths' in data.drawing_data && Array.isArray((data.drawing_data as any).paths)) {
        return (data.drawing_data as any).paths.length > 0;
      }
      return false;
    }
    return false;
  },
  { message: "Invalid post data for the specified type" }
);

export const selectPostSchema = createSelectSchema(posts);

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type PostFormData = z.infer<typeof insertPostSchema>;