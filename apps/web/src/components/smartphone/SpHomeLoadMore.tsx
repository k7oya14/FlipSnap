"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BadgeCheck } from "lucide-react";
import { Card } from "../ui/card";
import { fetchTimeline } from "@/lib/fetch";
import { Post, sessionUser } from "@/lib/definitions";
import HomeFlipImage from "../home/HomeFlipImage";
import SpImageFront from "./SpImageFront";

type Props = {
  skip: number;
  me: sessionUser | undefined;
};

const SpHomeLoadMore = (props: Props) => {
  const { skip, me } = props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLimit, setPostLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !postLimit) {
      const fetchMorePosts = async () => {
        setLoading(true);
        const newPosts = await fetchTimeline(6, skip + posts.length);
        if (newPosts.length < 6) {
          setPostLimit(true);
        }
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setLoading(false);
      };
      fetchMorePosts();
    }
  }, [inView, postLimit]);

  return (
    <div>
      {posts.map((post: Post, index) => (
        <div key={post.id} className="rounded-3xl m-2 shadow-lg">
          <HomeFlipImage
            post={post}
            myId={me?.id}
            containerStyle={{
              width: "100%",
              height: "auto",
              borderRadius: "0.5rem",
            }}
            frontComponent={<SpImageFront index={index} post={post} me={me} />}
          />
        </div>
      ))}
      <div className="h-[1px]" ref={ref}></div>
      {loading && !postLimit && (
        <div className="mx-auto m-4 animate-spin size-10 border-4 border-slate-200 rounded-full border-t-transparent"></div>
      )}
      {postLimit && (
        <Card className="flex flex-col items-center p-4 m-2 rounded-3xl shadow-md">
          <BadgeCheck className="size-20 mb-2" />
          <p>You&apos;re all caught up</p>
        </Card>
      )}
    </div>
  );
};

export default SpHomeLoadMore;
