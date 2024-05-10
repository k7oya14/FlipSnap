import { Hono } from "hono";
import { timeline } from "./lib/timeline";

export type Env = {
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/timeline", timeline);

export default app;
