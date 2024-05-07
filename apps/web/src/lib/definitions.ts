// This file contains type definitions for your data.

export enum UserRelationship {
  Me,
  NoSession,
  None,
  Following,
  Follower,
  Mutual,
}

export type sessionUser = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export type Post = {
  author?: {
    image: string | null;
    name: string | null;
    username: string | null;
  };
  id: string;
  authorId: string;
  imgFront: string;
  imgBack: string;
  caption: string;
  createdAt: Date;
};

export type GalleyPost = {
  isLikedByMe: boolean;
  likes: {
    createdAt: Date;
  }[];
  _count: {
    likes: number;
  };
  author?: {
    image: string | null;
    name: string | null;
    username: string | null;
  };
  id: string;
  authorId: string;
  imgFront: string;
  imgBack: string;
  caption: string;
  createdAt: Date;
};

export type OnePost =
  | {
      author: {
        image: string | null;
        name: string | null;
        username: string | null;
      };
      isLikedByMe: boolean;
      likes: {
        createdAt: Date;
      }[];
      _count: {
        likes: number;
      };
    } & {
      id: string;
      authorId: string;
      imgFront: string;
      imgBack: string;
      caption: string;
      createdAt: Date;
    };

export type UserInfo = {
  _count?:
    | {
        following: number;
        followedBy: number;
        posts: number;
      }
    | undefined;
  id?: string | undefined;
  username?: string | null | undefined;
  created_at?: Date | undefined;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  name?: string | null;
  bio?: string;
};

export type Comment = {
  author: {
    image: string | null | undefined;
    name: string | null | undefined;
    username: string | null;
  };
} & {
  id: string;
  authorId: string;
  postId: string;
  content: string;
  createdAt: Date;
};
