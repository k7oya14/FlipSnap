"use client";

import React, { useState } from "react";
import ModalLink from "./ModalLink";
import { Comment, OnePost, sessionUser } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import OneComment from "./OneComment";
import CommentLoadMore from "./CommentLoadMore";
import { HeartIcon } from "lucide-react";
import { useCursorById } from "@/lib/utils";
import { formatDistance } from "date-fns";
import CommentForm from "./CommentForm";

type Props = {
  post: OnePost;
  me: sessionUser | undefined;
  latestComments: Comment[];
};

const PostInformation = (props: Props) => {
  const { post, me, latestComments } = props;
  const { cursorById } = useCursorById();

  const [comments, setComments] = useState<Comment[]>(latestComments);
  //   const [optimisticComments, setOptimisticComments] =
  //     useOptimistic<Comment[]>(comments);

  const onSubmitComment = async (commentContent: string) => {
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
    setComments((prev) => [optimisticComment, ...prev]);
    // const newComment = await fetchComments(postId, 1);
    // console.log(newComment);
    // setComments((prev) => [...newComment, ...prev]);
  };

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
          {comments.map((comment) => (
            <OneComment key={comment.id} comment={comment} />
          ))}
          <CommentLoadMore postId={post.id} commentId={cursorById(comments)} />
        </div>
      </div>
      <div className="sticky bottom-0 w-full">
        <div className="flex items-center justify-between p-2 border-t-[1.35px]">
          <div className="flex items-center">
            <HeartIcon className="text-gray-600" />
            <p className="font-semibold ml-[6px]">
              {post._count.likes.toLocaleString()}
            </p>
          </div>

          <p className="text-xs text-gray-500">
            {formatDistance(new Date(), Date.parse(String(post.createdAt)))} ago
          </p>
        </div>
        {me && (
          <CommentForm me={me} postId={post.id} onSubmit={onSubmitComment} />
        )}
      </div>
    </div>
  );
};

export default PostInformation;
