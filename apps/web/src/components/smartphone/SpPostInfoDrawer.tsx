"use client";

import React, { useCallback, useOptimistic, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Heart, Info, MessageCircleDashed } from "lucide-react";
import { Comment, OnePost, sessionUser } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import CommentLoadMore from "../detail/CommentLoadMore";
import OneComment from "../detail/OneComment";
import CommentForm from "../detail/CommentForm";
import { fetchComments, fetchPost } from "@/lib/fetch";
import OneCommentSkeleton from "../skeleton/OneCommentSkeleton";
import LikeButtonWithText from "../detail/LikeButtonWithText";
import { Skeleton } from "../ui/skeleton";
import SpHomeCaption from "./SpHomeCaption";
import { formatDistance } from "date-fns";
import Link from "next/link";

type Props = {
  postId: string;
  me: sessionUser | undefined;
};

export const SpPostInfoDrawer = (props: Props) => {
  const { postId, me } = props;
  const { cursorById } = useCursorById();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<OnePost | undefined | null>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
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
      postId: postId,
      content: commentContent,
      createdAt: new Date(),
    };
    setOptimisticComments((prev) => [optimisticComment, ...prev]);
  }, []);

  const fetchLatestCommnent = useCallback(async () => {
    if (!post) {
      setLoading(true);
      const onePost = await fetchPost(postId, me?.id);
      const comments = await fetchComments(postId, 8);
      setPost(onePost);
      setComments([...comments]);
      setLoading(false);
    }
  }, [postId]);

  return (
    <Drawer>
      <DrawerTrigger
        onClick={fetchLatestCommnent}
        className="focus-visible:ring-transparent outline-none focus:ring-0 p-[6px]"
      >
        <Info className="size-[32px] text-neutral-300 hover:text-neutral-200 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="focus-visible:ring-transparent outline-none focus:ring-0 h-[80vh]">
        <DrawerHeader className="pb-0">
          <DrawerTitle className="border-b border-gray-200 pb-1">
            {post ? (
              <>
                <SpHomeCaption caption={post.caption} />
                <div className="flex items-center justify-between">
                  {me ? (
                    <LikeButtonWithText
                      postId={postId}
                      myId={me?.id}
                      defaultLiked={post.isLikedByMe}
                      initialCountLikes={post._count.likes!}
                    />
                  ) : (
                    <Link
                      href="/profile/error"
                      className="hover:cursor-pointer flex items-center my-2"
                    >
                      <Heart className="mr-[6px] size-[28px] fill-transparent text-gray-500 hover:text-gray-600" />
                      <p className="text-lg text-gray-500">
                        {post._count.likes}
                      </p>
                    </Link>
                  )}
                  <p className="block font-light text-xs text-gray-400">
                    {formatDistance(
                      new Date(),
                      Date.parse(String(post.createdAt))
                    )}{" "}
                    ago
                  </p>
                </div>
              </>
            ) : (
              <Skeleton className="h-3 w-2/3" />
            )}
          </DrawerTitle>
        </DrawerHeader>
        <div
          className={`overflow-y-scroll overflow-x-hidden ${me ? "mb-14" : ""}`}
        >
          {loading ? (
            [...Array(10)].map((_, i) => <OneCommentSkeleton key={i} />)
          ) : optimisticComments.length === 0 ? (
            <>
              <MessageCircleDashed className="size-[70px] text-gray-400 mx-auto mt-10" />
              <p className="text-center text-gray-400 text-xl mt-2">
                No comments yet
              </p>
            </>
          ) : (
            <>
              {optimisticComments.map((comment) => (
                <OneComment key={comment.id} comment={comment} />
              ))}
              {optimisticComments.length < 8 || (
                <CommentLoadMore
                  postId={postId}
                  commentId={cursorById(comments)}
                />
              )}
            </>
          )}
        </div>
        <DrawerFooter className="p-0">
          {me && (
            <CommentForm
              postId={postId}
              me={me}
              onSubmit={onSubmitComment}
              setComments={setComments}
            />
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
