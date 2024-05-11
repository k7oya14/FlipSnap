import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";
import { fetchFollowers, fetchUserInfo } from "./lib/utils";

async function main() {
  console.log("Listening for new posts...");

  const subscription = await prisma.post.subscribe({
    create: {},
  });

  for await (const event of subscription) {
    const userInfo = await fetchUserInfo(event.created.authorId);
    const data = { ...event.created, author: userInfo };
    console.log(
      "received new post :",
      "id:" + data.id + ",",
      "author:" + data.author?.name + ",",
      "caption:" + data.caption
    );

    // Push the new post to the Global timeline
    await redis.lpush("timeline", JSON.stringify(data));
    await redis.ltrim("timeline", 0, 127);

    // Push the new post to the Follower's timeline
    const followers = await fetchFollowers(event.created.authorId);
    for (const follower of followers) {
      await redis.lpushx(`timeline:user:${follower.id}`, JSON.stringify(data));
      await redis.ltrim(`timeline:user:${follower.id}`, 0, 127);
    }
  }
}

main();
