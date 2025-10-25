import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

async function limitRequest(ip: string, limit = 10, windowSeconds = 10) {
  const key = `rate:${ip}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, windowSeconds);
  }

  return current <= limit;
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