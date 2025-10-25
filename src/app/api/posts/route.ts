import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { insertPostSchema, posts } from "@/db/schema";
import { desc, asc } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0", 10);
  const sortBy = searchParams.get("sortBy") || "latest";
  const limit = 5;

  const order = sortBy === "oldest" ? asc(posts.createdAt) : desc(posts.createdAt);

  const rows = await db
    .select()
    .from(posts)
    .orderBy(order)
    .limit(limit)
    .offset(page * limit);

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();

  const parseResult = insertPostSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.issues.map((e) => e.message).join(", ") },
      { status: 400 }
    );
  }

  const newPost = parseResult.data;

  const inserted = await db.insert(posts).values(newPost).returning();
  return NextResponse.json(inserted[0]);
}