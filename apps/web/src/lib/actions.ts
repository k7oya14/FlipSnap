"use server";

import { CommentSchema, RawPostSchema, UserSchema } from "./zod";
import prisma from "./prismaClient";
import { redirect } from "next/navigation";
import { supabase } from "./supabseClient";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const path = require("path");

export async function uploadFile(file: File) {
  const fileExtension = path.extname(file.name);
  const file_path = `${uuidv4()}${fileExtension}`;
  const { data, error } = await supabase.storage
    .from("image-bucket")
    .upload(file_path, file, {
      contentType: "image/*",
    });
  if (error) {
    throw new Error(error.message);
  } else {
    const fullpath = `${process.env.SUPABASE_URL}/storage/v1/object/public/image-bucket/${data.path}`;
    return fullpath;
  }
}

export type updateUsernameState = {
  errors?: {
    username?: string[];
  };
  message?: string | null;
};
const updateUserSchema = UserSchema.pick({ username: true });

export async function updateUsername(
  userId: string,
  prevState: updateUsernameState,
  formData: FormData
) {
  const validatedFields = updateUserSchema.safeParse({
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Zod Error: Failed to Update username.",
    };
  }

  const { username } = validatedFields.data;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { username },
    });
  } catch (error) {
    return {
      errors: {},
      message: "Database Error: Failed to update username.",
    };
  }
  redirect("/profile/me");
}

export type updateBioState = {
  errors?: {
    bio?: string[];
  };
  message?: string | null;
};
const updateBioSchema = UserSchema.pick({ bio: true });

export async function updateBio(
  myId: string,
  prevState: updateBioState,
  formData: FormData
) {
  const validatedFields = updateBioSchema.safeParse({
    bio: formData.get("bio"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Zod Error: Failed to update Bio.",
    };
  }

  const { bio } = validatedFields.data;

  try {
    await prisma.user.update({
      where: { id: myId },
      data: {
        bio,
      },
    });
  } catch (error) {
    return {
      errors: {},
      message: "Database Error: Failed to update Bio.",
    };
  } finally {
    const referer = headers().get("referer") ?? "/";
    revalidatePath(referer);
    return { errors: {}, message: "" };
  }
}

export type createPostState = {
  errors?: {
    imgFront?: string[];
    imgBack?: string[];
    caption?: string[];
  };
  message?: string | null;
};

export async function createPost(
  userId: string,
  prevState: createPostState,
  formData: FormData
) {
  const validatedFields = RawPostSchema.safeParse({
    imgFront: formData.get("imgFront"),
    imgBack: formData.get("imgBack"),
    caption: formData.get("caption"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Zod Error: Failed to create post.",
    };
  }

  const { imgFront, imgBack, caption } = validatedFields.data;

  const [imgFrontUrl, imgBackUrl] = await Promise.all([
    uploadFile(imgFront),
    uploadFile(imgBack),
  ]);

  try {
    await prisma.post.create({
      data: {
        authorId: userId,
        imgFront: imgFrontUrl,
        imgBack: imgBackUrl,
        caption,
      },
    });
  } catch (error) {
    return {
      errors: {},
      message: "Database Error: Failed to create post.",
    };
  }

  revalidatePath("/profile/me");
  redirect("/profile/me");
}

export type createCommentState = {
  errors?: {
    content?: string[];
  };
  message?: string | null;
};
const createCommentSchema = CommentSchema.pick({ content: true });

export async function createComment(
  myId: string,
  postId: string,
  formData: FormData
) {
  const validatedFields = createCommentSchema.safeParse({
    content: formData.get("content"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Zod Error: Failed to create comment.",
    };
  }

  const { content } = validatedFields.data;

  try {
    await prisma.comment.create({
      data: {
        postId,
        authorId: myId,
        content,
      },
    });
  } catch (error) {
    return {
      errors: {},
      message: "Database Error: Failed to create comment.",
    };
  }
  //   finally {
  //     const referer = headers().get("referer") ?? "/";
  //     revalidatePath(referer);
  //   }
}

export async function Follow(myId: string, userId: string) {
  try {
    await prisma.user_User_Follows.create({
      data: {
        followerId: myId,
        followeeId: userId,
      },
    });
  } catch (error) {
    throw new Error("Failed to follow user.");
  } finally {
    const referer = headers().get("referer") ?? "/";
    revalidatePath(referer);
  }
}

export async function UnFollow(myId: string, userId: string) {
  try {
    await prisma.user_User_Follows.delete({
      where: {
        followerId_followeeId: {
          followerId: myId,
          followeeId: userId,
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to unfollow user.");
  } finally {
    const referer = headers().get("referer") ?? "/";
    revalidatePath(referer);
  }
}

export async function Like(myId: string, postId: string) {
  try {
    await prisma.like.create({
      data: {
        userId: myId,
        postId,
      },
    });
  } catch (error) {
    throw new Error("Failed to like the post.");
  }
  //   finally {
  //     const referer = headers().get("referer") ?? "/";
  //     revalidatePath(referer);
  //   }
}

export async function UndoLike(myId: string, postId: string) {
  try {
    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: myId,
          postId,
        },
      },
    });
  } catch (error) {
    throw new Error("Failed to Undo liked the post.");
  }
  //    finally {
  //     const referer = headers().get("referer") ?? "/";
  //     revalidatePath(referer);
  //   }
}
