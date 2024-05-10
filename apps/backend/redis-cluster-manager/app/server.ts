import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";

async function main() {
  console.log("Listening for new users...");

  const subscription = await prisma.account.subscribe({
    create: {},
  });

  for await (const event of subscription) {
    const userId = event.created.userId;
    console.log("received new user :", "userId:" + userId);

    // Create the new user's timeline List in Redis
    await redis.lpush(`timeline:user:${userId}`, "");
  }
}

main();
