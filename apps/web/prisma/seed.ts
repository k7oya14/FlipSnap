import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { imgSets } from "./imgSets";

const prisma = new PrismaClient();

type User = {
  id: string;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  name: string | null;
  bio: string;
  created_at: Date;
};

async function claerRecords() {
  await prisma.user.deleteMany();
}

const userCount = 64; // TODO : Change this parameter

async function createUsers() {
  const users = [];

  for (let i = 0; i < userCount; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    const user = await prisma.user.create({
      data: {
        username,
        email,
        image: faker.image.avatar(),
        name: faker.person.fullName(),
        bio: faker.person.bio(),
        created_at: faker.date.past(),
      },
    });

    users.push(user);
  }

  return users;
}

async function createFollowRelations(users: User[]) {
  for (const user of users) {
    const followCount = faker.number.int({ min: 0, max: userCount });
    const follows = faker.helpers
      .arrayElements(users, followCount)
      .filter((u) => u.id !== user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        following: {
          createMany: { data: follows.map((u) => ({ followeeId: u.id })) },
        },
      },
    });
    // await prisma.user.update({
    //   where: { username: "ksaka" },
    //   data: {
    //     followedBy: {
    //       create: { followerId: user.id },
    //     },
    //   },
    // });
  }
}

const postUserCount = 20; // TODO : Change this parameter

async function createPost(users: User[]) {
  const posts = [];
  let imgIndex = 0;
  for (const user of users.slice(0, postUserCount)) {
    const data = await prisma.user.update({
      where: { id: user.id },
      data: {
        posts: {
          create: {
            imgFront: imgSets[imgIndex % imgSets.length],
            imgBack: imgSets[imgIndex % imgSets.length],
            caption: faker.lorem.lines(),
            createdAt: faker.date.past(),
          },
        },
      },
      include:{
        posts: true
      }
    });
    const postId = data.posts[0].id;
    posts.push(postId);
    imgIndex++;
  }
  return posts;
}

const targetPostCount = postUserCount / 4; // TODO : Change this parameter

async function createComments(users : User[], posts: string[]) {
  for (const user of users) {
    const commentPostCount = faker.number.int({ min: 0, max: targetPostCount });
    const commentPosts = faker.helpers
      .arrayElements(posts, commentPostCount)

    for (const commentPostId of commentPosts) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          comments: {
            create: {
              postId: commentPostId,
              content: faker.lorem.lines(),
            },
          },
        },
      });
    }
  }
}

const targetLikeCount = postUserCount / 2; // TODO : Change this parameter

async function createLikes(users : User[], posts: string[]) {
  for (const user of users) {
    const likedPostCount = faker.number.int({ min: 0, max: targetLikeCount });
    const likedPosts = faker.helpers
      .arrayElements(posts, likedPostCount)

    for (const likedPostId of likedPosts) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          likes: {
            create: {
              postId: likedPostId
            },
          },
        },
      });
    }
  }
}

// async function createhishiwatPosts() {
//   for (let i = 0; i < 9; i++) {
//     await prisma.user.update({
//       where: { username: "hishiwat" },
//       data: {
//         posts: {
//           create: {
//             imgFront: "",
//             imgBack: "",
//             caption: faker.lorem.lines(),
//           },
//         },
//       },
//     });
//   }
// }

async function main() {
  await claerRecords();
  const users = await createUsers();
  await createFollowRelations(users);
  const posts = await createPost(users);
  await createComments(users, posts);
  await createLikes(users, posts);
  // await createhishiwatPosts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
