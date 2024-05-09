import { prisma } from "./prisma"; // import your extended Prisma Client instance
import { fetchUserInfo } from "./utils";

const Redis = require("ioredis");

let redis = new Redis(process.env.REDIS_URL);

async function main() {
  const subscription = await prisma.post.subscribe({
    create: {},
  });

  for await (const event of subscription) {
    const userInfo = await fetchUserInfo(event.created.authorId);
    const post = { ...event.created, author: userInfo };
    console.log(post);
    await redis.lpush("user-list", post);
  }
}

main();
