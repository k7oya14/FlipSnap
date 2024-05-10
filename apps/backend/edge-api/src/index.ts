import { Hono } from "hono";
import { fetchLatestPosts } from "./lib/fetchLatestPosts";

export type Env = {
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/posts/latest", fetchLatestPosts);

export default app;
