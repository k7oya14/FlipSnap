import { Redis } from "@upstash/redis/cloudflare";
import { Handler } from "hono";

export const timeline: Handler = async (c) => {
  const take = c.req.query("skip") ? Number(c.req.query("take")) : 0;
  const skip = c.req.query("skip") ? Number(c.req.query("skip")) : 0;
  const myId = c.req.query("myId");

  const redis = new Redis({
    url: c.env.UPSTASH_REDIS_REST_URL,
    token: c.env.UPSTASH_REDIS_REST_TOKEN,
  });

  if (myId) {
    const posts = await redis.lrange(
      `timeline:user:${myId}`,
      skip,
      skip + take - 1
    );
    return c.json(posts);
  } else {
    const posts = await redis.lrange("timeline", skip, skip + take - 1);
    return c.json(posts);
  }
};
