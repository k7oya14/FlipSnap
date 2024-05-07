import { auth } from "@/lib/auth";
import { fetchComments, fetchPost } from "@/lib/fetch";
import React from "react";
import ErrorCard from "../ErrorCard";
import { PostDetail } from "./PostDetail";
import { SpDetailPost } from "../smartphone/SpDetailPost";

type Props = { postId: string; modal?: boolean };

const DetailPost = async (props: Props) => {
  const { postId, modal = false } = props;
  const session = await auth();
  const comments = await fetchComments(postId, 8);
  const post = await fetchPost(postId, session?.user?.id);
  if (!post?.id)
    return (
      <ErrorCard
        heading="Post not found"
        message="お探しの投稿が見つかりませんでした"
        button="Go Home"
        link="/"
      />
    );
  return (
    <>
      <div className="hidden sm:block">
        <PostDetail post={post} me={session?.user} latestComments={comments} />
      </div>
      <div
        className={`sm:hidden flex flex-col ${
          modal && "dialog-scroll overflow-y-scroll"
        }`}
      >
        <SpDetailPost
          post={post}
          me={session?.user}
          latestComments={comments}
        />
      </div>
    </>
  );
};

export default DetailPost;
