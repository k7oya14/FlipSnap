"use client";

import React, { useCallback, useOptimistic, useState } from "react";
import ModalLink from "./ModalLink";
import { Comment, OnePost, sessionUser } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import OneComment from "./OneComment";
import CommentLoadMore from "./CommentLoadMore";
import { useCursorById } from "@/lib/utils";
import { formatDistance } from "date-fns";
import CommentForm from "./CommentForm";
import LikeButtonWithText from "./LikeButtonWithText";
import { Heart } from "lucide-react";

type Props = {
  post: OnePost;
  me: sessionUser | undefined;
  latestComments: Comment[];
};

const PostInformation = (props: Props) => {
  const { post, me, latestComments } = props;
  const { cursorById } = useCursorById();

  const [comments, setComments] = useState<Comment[]>(latestComments);
  const [optimisticComments, setOptimisticComments] =
    useOptimistic<Comment[]>(comments);

  const onSubmitComment = useCallback(async (commentContent: string) => {
    const optimisticComment: Comment = {
      author: {
        image: me!.image,
        name: me!.name,
        username: "optimistic",
      },
      id: crypto.randomUUID().toString(),
      authorId: me!.id,
      postId: post.id,
      content: commentContent,
      createdAt: new Date(),
    };
    setOptimisticComments((prev) => [optimisticComment, ...prev]);
  }, []);

  return (
    <div className="relative h-[83vh] max-h-[600px] w-[45%] flex flex-col border rounded-r-lg border-gray-200">
      <div className="overflow-y-scroll dialog-scroll flex-grow">
        <div className="flex items-center p-2 md:p-4 border-b">
          <ModalLink
            href={`/profile/${post.author?.username}`}
            className="flex items-center hover:cursor-pointer"
          >
            <Avatar>
              <AvatarImage
                src={
                  post.author?.image || "/placeholder.svg?height=32&width=32"
                }
              />
              <AvatarFallback>{post.author?.name}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-semibold">{post.author?.name}</p>
              <p className="text-xs text-gray-500">{post.author?.username}</p>
            </div>
          </ModalLink>
        </div>
        <p className="m-2 md:m-4 text-sm md:text-base">{post.caption}</p>
        <div>
          {optimisticComments.map((comment) => (
            <OneComment key={comment.id} comment={comment} />
          ))}
          {optimisticComments.length < 8 || (
            <CommentLoadMore
              postId={post.id}
              commentId={cursorById(comments)}
            />
          )}
        </div>
      </div>
      <div className="sticky bottom-0 w-full">
        <div className="flex items-center justify-between px-2 border-t-[1.35px]">
          {me ? (
            <LikeButtonWithText
              defaultLiked={post.isLikedByMe}
              myId={me?.id}
              postId={post.id}
              initialCountLikes={post._count.likes}
            />
          ) : (
            <ModalLink
              href="/profile/error"
              className="py-2 flex items-center hover:cursor-pointer"
            >
              <Heart className="size-6 fill-transparent text-gray-500 hover:text-gray-600" />
              <p className="text-lg text-gray-500 ml-[6px]">
                {post._count.likes}
              </p>
            </ModalLink>
          )}

          <p className="text-xs text-gray-500">
            {formatDistance(new Date(), Date.parse(String(post.createdAt)))} ago
          </p>
        </div>
        {me && (
          <CommentForm
            me={me}
            postId={post.id}
            onSubmit={onSubmitComment}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};

export default PostInformation;
