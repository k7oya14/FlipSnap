"use server";

import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prismaClient";
import { UserRelationship } from "./definitions";

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getUsernameById(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
  return data;
}

export async function fetchUserByUsername(username: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        _count: {
          select: {
            following: true,
            followedBy: true,
            posts: true,
          },
        },
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user info by username.");
  }
}

export async function fetchFollows(username: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        following: {
          select: {
            followee: {
              select: {
                username: true,
                image: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    const follows = data?.following
      ? data.following.map((f) => f.followee)
      : [];
    return follows;
  } catch (error) {
    throw new Error("Failed to fetch follows.");
  }
}

export async function fetchFollowers(username: string) {
  noStore();
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        followedBy: {
          select: {
            follower: {
              select: {
                username: true,
                image: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    const followers = data?.followedBy
      ? data.followedBy.map((f) => f.follower)
      : [];
    return followers;
  } catch (error) {
    throw new Error("Failed to fetch follows.");
  }
}

export async function fetchUserRelationship(myId: string, userId: string) {
  // const start = process.hrtime();
  if (myId === userId) {
    return UserRelationship.Me;
  }
  noStore();
  try {
    const relationships = await prisma.user_User_Follows.findMany({
      where: {
        OR: [
          { followerId: myId, followeeId: userId },
          { followerId: userId, followeeId: myId },
        ],
      },
      take: 2,
    });
    const isFollowing = relationships.some((rel) => rel.followerId === myId);
    const isFollower = relationships.some((rel) => rel.followerId === userId);

    // const end = process.hrtime(start);
    // console.log("[MY LOG] fetchUserRelationship >>> " + (end[0] * 1e9 + end[1]) / 1e6 + "ms");

    if (isFollowing && isFollower) {
      return UserRelationship.Mutual;
    } else if (isFollowing) {
      return UserRelationship.Following;
    } else if (isFollower) {
      return UserRelationship.Follower;
    } else {
      return UserRelationship.None;
    }
  } catch (error) {
    throw new Error("Failed to fetch user relationship.");
  }
}

export async function fetchPost(postId: string, myId?: string | undefined) {
  // noStore();
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
        likes: {
          where: {
            userId: myId ?? "",
          },
          select: {
            createdAt: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    const post = data ? { ...data, isLikedByMe: data.likes.length > 0 } : data;
    return post;
  } catch (error) {
    throw new Error("Failed to fetch a post.");
  }
}

// Fetch Posts API Usage at infinite scroll:
//
//const data = await fetchLatestPosts(2, session?.user.id);
// let cursorPostId = useCursorById(data);
// const data2 = await fetchMoreLatestPosts(12, session?.user.id, cursorPostId);
// cursorPostId = useCursorById(data2);
// const data3 = await fetchMoreLatestPosts(12, session?.user.id, cursorPostId);
// ...

export async function fetchLatestPosts(
  take: number,
  myId?: string | undefined
) {
  noStore();
  const start = process.hrtime();
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
        likes: {
          where: {
            userId: myId ?? "",
          },
          select: {
            createdAt: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      take,
    });
    const posts = data.map((post) => ({
      ...post,
      isLikedByMe: post.likes.length > 0,
    }));
    const end = process.hrtime(start);
    console.log(
      "[MY LOG] fetchLatestPosts >>> " +
        (end[0] * 1e9 + end[1]) / 1e6 +
        "ms"
    );
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch first latest posts.");
  }
}

export async function fetchMoreLatestPosts(
  take: number,
  cursorPostId: string,
  myId?: string | undefined
) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
            image: true,
            name: true,
          },
        },
        likes: {
          where: {
            userId: myId ?? "",
          },
          select: {
            createdAt: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      take,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursorPostId,
      },
    });
    const posts = data.map((post) => ({
      ...post,
      isLikedByMe: post.likes.length > 0,
    }));
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch more latest posts.");
  }
}

export async function fetchUserPostsById(
  userId: string,
  take: number,
  myId?: string | undefined
) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
      include: {
        likes: {
          where: {
            userId: myId ?? "",
          },
          select: {
            createdAt: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    const posts = data.map((post) => ({
      ...post,
      isLikedByMe: post.likes.length > 0,
    }));
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch first User posts.");
  }
}

export async function fetchMoreUserPostsById(
  userId: string,
  take: number,
  cursorPostId: string,
  myId?: string | undefined
) {
  noStore();
  try {
    const data = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursorPostId,
      },
      include: {
        likes: {
          where: {
            userId: myId ?? "",
          },
          select: {
            createdAt: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    const posts = data.map((post) => ({
      ...post,
      isLikedByMe: post.likes.length > 0,
    }));
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch more User posts.");
  }
}

export async function fetchLikedPosts(userId: string, take: number) {
  noStore();
  try {
    const data = await prisma.like.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        post: {
          include: {
            author: {
              select: {
                username: true,
                image: true,
                name: true,
              },
            },
          },
        },
      },
      take,
    });
    const posts = data.map((post) => {
      return post.post;
    });
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch first liked posts.");
  }
}

export async function fetchMoreLikedPosts(
  userId: string,
  take: number,
  cursorPostId: string
) {
  noStore();
  try {
    const data = await prisma.like.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        post: {
          include: {
            author: {
              select: {
                username: true,
                image: true,
                name: true,
              },
            },
          },
        },
      },
      take,
      skip: 1, // Skip the cursor
      cursor: {
        userId_postId: {
          userId,
          postId: cursorPostId,
        },
      },
    });
    const posts = data.map((post) => {
      return post.post;
    });
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch more liked posts.");
  }
}

export async function fetchComments(postId: string, take: number) {
  noStore();
  try {
    const data = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
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
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch first comments.");
  }
}

export async function fetchMoreComments(
  postId: string,
  take: number,
  cursorCommentId: string
) {
  noStore();
  try {
    const data = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
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
      skip: 1, // Skip the cursor
      cursor: {
        id: cursorCommentId,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch more comments.");
  }
}
