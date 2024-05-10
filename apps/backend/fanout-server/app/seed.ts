import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";
import { fetchFollowers } from "./lib/utils";

export async function fetchCountPosts(skip: number) {
  try {
    const data = await prisma.post.count({});
    return data;
  } catch (error) {
    throw new Error("Failed to fetch count posts.");
  }
}

export async function fetchALatestPost(skip: number) {
  try {
    const data = await prisma.post.findFirst({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
      },
      skip,
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch a latest post.");
  }
}

async function main() {
  // Delete all k-V in the Redis database
  await redis.flushall();

  const count = await fetchCountPosts(0);

  for (let i = 0; i < count; i++) {
    const post = await fetchALatestPost(i);

    // Push the new post to the Global timeline
    await redis.lpush("timeline", JSON.stringify(post));
    await redis.ltrim("timeline", 0, 63);

    // Push the new post to the Follower's timeline
    const followers = await fetchFollowers(post?.authorId ?? "");
    for (const follower of followers) {
      await redis.lpushx(`timeline:user:${follower.id}`, JSON.stringify(post));
      await redis.ltrim(`timeline:user:${follower.id}`, 0, 63);
    }
  }
}

main();
