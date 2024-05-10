"use client";

import React, { useEffect, useState } from "react";
import ImageFront from "./ImageFront";
import { Post } from "@/lib/definitions";
import { fetchTimeline } from "@/lib/fetch";
import { useInView } from "react-intersection-observer";
import { useCursorById } from "@/lib/utils";
import HomeFlipImage from "./HomeFlipImage";

type Props = {
  firstPosts: Post[][];
  myId: string | undefined;
};

const HomeGallery = (props: Props) => {
  const { firstPosts, myId } = props;
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<Post[][]>(firstPosts);
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !postLimit) {
      const fetchMorePosts = async () => {
        const newPosts = await fetchTimeline(
          6,
          posts[0].length + posts[1].length + posts[2].length
        );
        if (newPosts.length < 6) {
          setPostLimit(true);
        }
        const newPostsArray: Post[][] = [[], [], []];
        newPosts.forEach((post: Post, i) => {
          newPostsArray[i % 3] = [...newPostsArray[i % 3], post];
        });

        setPosts((prevPosts) => [
          [...prevPosts[0], ...newPostsArray[0]],
          [...prevPosts[1], ...newPostsArray[1]],
          [...prevPosts[2], ...newPostsArray[2]],
        ]);
      };
      fetchMorePosts();
    }
  }, [inView]);

  return (
    <div className="lg:px-32 px-5 flex">
      {posts.map((colPosts: Post[]) => (
        <div key={colPosts[0].id} className="w-1/3 p-1 relative">
          {colPosts.map((post: Post, index) => (
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
