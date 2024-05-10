import { Redis } from "@upstash/redis/cloudflare";
import { Handler } from "hono";

export const fetchLatestPosts: Handler = async (c) => {
  const take = Number(c.req.query("take"));
  const skip = c.req.query("skip") ? Number(c.req.query("skip")) : 0;

  const redis = new Redis({
    url: c.env.UPSTASH_REDIS_REST_URL,
    token: c.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const posts = await redis.lrange("latest-posts", skip, skip + take - 1);
  
  return c.json(posts);
};
