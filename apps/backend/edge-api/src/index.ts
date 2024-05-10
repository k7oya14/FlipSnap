import { Hono } from "hono";
import { GetTimeline } from "./lib/GetTimeline";

export type Env = {
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/timeline", GetTimeline);

export default app;
