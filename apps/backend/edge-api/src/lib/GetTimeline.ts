import { Redis } from "@upstash/redis/cloudflare";
import { Handler } from "hono";

export const GetTimeline: Handler = async (c) => {
  const take = c.req.query("skip") ? Number(c.req.query("take")) : 0;
  const skip = c.req.query("skip") ? Number(c.req.query("skip")) : 0;
  const myId = c.req.query("myId");

  const redis = new Redis({
    url: c.env.UPSTASH_REDIS_REST_URL,
    token: c.env.UPSTASH_REDIS_REST_TOKEN,
  });

  if (myId) {
    const data = await redis.lrange(
      `timeline:user:${myId}`,
      skip,
      skip + take - 1
    );
    const posts = data.filter((v) => v !== "");
    return c.json(posts);
  } else {
    const data = await redis.lrange("timeline", skip, skip + take - 1);
    const posts = data.filter((v) => v !== "");
    return c.json(posts);
  }
};
