import { prisma } from "./prisma"; // import your extended Prisma Client instance
import { fetchUserInfo } from "./utils";

async function main() {
  const subscription = await prisma.post.subscribe({
    create: {},
  });

  for await (const event of subscription) {
    const userInfo = await fetchUserInfo(event.created.authorId);
    const post = { ...event.created, author: userInfo };
    console.log(post);
  }
}

main();
