import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const LIMIT = 3;

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_URL || !process.env.UPSTASH_REDIS_TOKEN) return null;
  return new Redis({
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN,
  });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { ip?: string };
  const ip = body.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const redis = getRedis();
  if (!redis) return NextResponse.json({ remaining: LIMIT });
  const day = new Date().toISOString().slice(0, 10);
  const key = `rl:${ip}:${day}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 86400);
  return NextResponse.json({ remaining: Math.max(0, LIMIT - count) });
}
