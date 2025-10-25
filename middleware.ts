export const runtime = 'nodejs';

import { NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000);

async function limitRequest(ip: string, limit = 10, windowSeconds = 10): Promise<boolean> {
  const now = Date.now();
  const resetTime = now + windowSeconds * 1000;
  
  const entry = rateLimitStore.get(ip);
  
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime });
    return true;
  }
  
  entry.count++;
  return entry.count <= limit;
}

export async function middleware(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "global";

  const ok = await limitRequest(ip);

  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests, slow down." },
      { status: 429 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], 
};