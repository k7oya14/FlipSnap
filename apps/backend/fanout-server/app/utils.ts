import { prisma } from "./prisma";

export async function fetchUserInfo(userId: string) {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        image: true,
        name: true,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user info by username.");
  }
}
