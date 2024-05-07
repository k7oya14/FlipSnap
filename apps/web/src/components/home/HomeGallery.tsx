"use client";

import React, { useEffect, useState } from "react";
import ImageFront from "./ImageFront";
import { GalleyPost } from "@/lib/definitions";
import { fetchMoreLatestPosts } from "@/lib/fetch";
import { useInView } from "react-intersection-observer";
import { useCursorById } from "@/lib/utils";
import HomeFlipImage from "./HomeFlipImage";

type Props = {
  firstPosts: GalleyPost[][];
  myId: string | undefined;
  cursorId: string;
};

const HomeGallery = (props: Props) => {
  const { firstPosts, myId, cursorId } = props;
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<GalleyPost[][]>(firstPosts);
  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !postLimit) {
      const fetchMorePosts = async () => {
        const newPosts = await fetchMoreLatestPosts(6, cursorPostId);
        if (newPosts.length < 6) {
          setPostLimit(true);
        }
        const newPostsArray: GalleyPost[][] = [[], [], []];
        newPosts.forEach((post: GalleyPost, i) => {
          newPostsArray[i % 3] = [...newPostsArray[i % 3], post];
        });

        setPosts((prevPosts) => [
          [...prevPosts[0], ...newPostsArray[0]],
          [...prevPosts[1], ...newPostsArray[1]],
          [...prevPosts[2], ...newPostsArray[2]],
        ]);
        setCursorPostId(cursorById(newPosts));
      };
      fetchMorePosts();
    }
  }, [inView]);

  return (
    <div className="lg:px-32 px-5 flex">
      {posts.map((colPosts: GalleyPost[]) => (
        <div key={colPosts[0].id} className="w-1/3 p-1 relative">
          {colPosts.map((post: GalleyPost, index) => (
            <HomeFlipImage
              key={post.id}
              post={post}
              myId={myId}
              containerStyle={{
                width: "100%",
                height: "auto",
                marginBottom: "8px",
              }}
              frontComponent={<ImageFront index={index} post={post} />}
            />
          ))}
          <div ref={ref} className="absolute bottom-[600px] h-[1px]" />
        </div>
      ))}
    </div>
  );
};

export default HomeGallery;
