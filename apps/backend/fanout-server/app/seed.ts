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

export async function fetchLatestPosts(take: number, skip: number) {
  try {
    const data = await prisma.post.findMany({
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
      take,
      skip,
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch a latest post.");
  }
}

async function main() {
  try {
    console.log("Seeding the Redis database with Postgres data...");

    // Delete all k-V in the Redis database
    await redis.flushall();

    const count = await fetchCountPosts(0);

    let i = 0;
    while (i < count) {
      const data = await fetchLatestPosts(64, i);
      if (!data) {
        break;
      } else {
        i += data.length;
      }

      const posts = data.map((post) => JSON.stringify(post));
      await redis.lpush("timeline", ...posts);
      await redis.ltrim("timeline", 0, 63);
    }
    console.log("Seeding completed!");
  } catch (error) {
    console.error(error);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
  await redis.quit();
});
