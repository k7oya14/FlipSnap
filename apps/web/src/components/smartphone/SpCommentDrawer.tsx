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
import { MessageCircle, MessageCircleDashed } from "lucide-react";
import { Comment, sessionUser } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import CommentLoadMore from "../detail/CommentLoadMore";
import OneComment from "../detail/OneComment";
import CommentForm from "../detail/CommentForm";
import { fetchComments } from "@/lib/fetch";
import OneCommentSkeleton from "../skeleton/OneCommentSkeleton";

type Props = {
  latestComments?: Comment[] | [];
  postId: string;
  me: sessionUser | undefined;
};

export const SpCommentDrawer = (props: Props) => {
  const { latestComments = [], postId, me } = props;
  const { cursorById } = useCursorById();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>(latestComments);
  const [optimisticComments, setOptimisticComments] =
    useOptimistic<Comment[]>(comments);
  const firstClick = useRef(true);

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
    if (latestComments.length === 0 && firstClick.current) {
      firstClick.current = false;
      setLoading(true);
      const comments = await fetchComments(postId, 8);
      setOptimisticComments([...latestComments, ...comments]);
      setComments([...latestComments, ...comments]);
      setLoading(false);
    }
  }, [latestComments, postId]);

  return (
    <Drawer>
      <DrawerTrigger
        onClick={fetchLatestCommnent}
        className="focus-visible:ring-transparent outline-none focus:ring-0 p-[6px]"
      >
        <MessageCircle className="size-[28px] text-gray-500 hover:text-gray-600 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="focus-visible:ring-transparent outline-none focus:ring-0 h-[70vh]">
        <DrawerHeader className="pb-0">
          <DrawerTitle className="border-b border-gray-200 pb-5">
            Comment
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
