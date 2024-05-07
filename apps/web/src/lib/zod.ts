import { z } from "zod";
import { auth } from "./auth";

export const UserSchema = z.object({
  id: z.string().cuid(),
  username: z
    .string()
    .regex(/^[\.a-zA-Z0-9_-]+$/, {
      message: "Username can only contain alphabets, numbers, '_','-' and '.'.",
    })
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z.string().email(),
  emailVerified: z.date(),
  image: z.string().url(),
  name: z.string(),
  bio: z.string(),
  created_at: z.date(),
});

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const RawPostSchema = z.object({
  imgFront: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    }),
  imgBack: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    }),
  caption: z.string(),
});

export const CommentSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid(),
  authorId: z.string().cuid(),
  content: z
    .string()
    .min(1, { message: "Comment must be at least 1 characters long." }),
  created_at: z.date(),
});
