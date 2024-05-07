"use client";

import { useCursorById } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BadgeCheck } from "lucide-react";
import { Card } from "../ui/card";
import { fetchMoreLatestPosts } from "@/lib/fetch";
import { GalleyPost, sessionUser } from "@/lib/definitions";
import { SpHomePost } from "./SpHomePost";

type Props = {
  cursorId: string;
  me: sessionUser | undefined;
};

const SpHomeLoadMore = (props: Props) => {
  const { cursorId, me } = props;
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<GalleyPost[]>([]);
  const [postLimit, setPostLimit] = useState(false);
  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !postLimit) {
      const fetchMorePosts = async () => {
        setLoading(true);
        const newPosts = await fetchMoreLatestPosts(6, cursorPostId);
        if (newPosts.length < 6) {
          setPostLimit(true);
        }
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setCursorPostId(cursorById(newPosts));
        setLoading(false);
      };
      fetchMorePosts();
    }
  }, [inView, postLimit]);

  return (
    <div>
      {posts.map((post: GalleyPost) => (
        <SpHomePost key={post.id} post={post} me={me} />
      ))}
      <div className="h-[1px]" ref={ref}></div>
      {loading && !postLimit && (
        <div className="mx-auto m-4 animate-spin size-10 border-4 border-slate-200 rounded-full border-t-transparent"></div>
      )}
      {postLimit && (
        <Card className="flex flex-col items-center p-4 m-4 mx-auto w-96 max-w-[80vw]">
          <BadgeCheck className="size-20 mb-2" />
          <p>You&apos;re all caught up</p>
        </Card>
      )}
    </div>
  );
};

export default SpHomeLoadMore;
