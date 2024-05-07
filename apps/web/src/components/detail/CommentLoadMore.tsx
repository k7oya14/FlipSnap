"use client";

import { Comment } from "@/lib/definitions";
import { fetchMoreComments } from "@/lib/fetch";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import OneComment from "./OneComment";
import { useCursorById } from "@/lib/utils";

type Props = {
  postId: string;
  commentId: string;
};

const CommentLoadMore = (props: Props) => {
  const { postId, commentId } = props;
  const { cursorById } = useCursorById();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLimit, setCommentLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cursorCommentId, setCursorCommentId] = useState(commentId);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !commentLimit) {
      const fetchComments = async () => {
        setLoading(true);
        const newComments = await fetchMoreComments(
          postId,
          10,
          cursorCommentId
        );
        if (newComments.length < 10) {
          setCommentLimit(true);
        }
        setComments((prev) => [...prev, ...newComments]);
        setCursorCommentId(cursorById(newComments));
        setLoading(false);
      };
      fetchComments();
    }
  }, [inView, commentLimit]);
  return (
    <>
      {comments.map((comment) => (
        <OneComment key={comment.id} comment={comment} />
      ))}
      <div className="h-[1px]" ref={ref} />
      {loading && !commentLimit && (
        <div className="mx-auto mb-2 animate-spin size-6 border-[3px] border-slate-200 rounded-full border-t-transparent" />
      )}
    </>
  );
};

export default CommentLoadMore;
