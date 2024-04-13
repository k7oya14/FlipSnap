"use client";

import React, { useEffect, useState } from "react";
import ImageFront from "./ImageFront";
import ImageBack from "./ImageBack";
import { GalleyPost, UserRelationship } from "@/lib/definitions";
import {
  delay,
  fetchMoreLatestPosts,
  fetchUserRelationship,
} from "@/lib/fetch";
import { useInView } from "react-intersection-observer";
import { useCursorById } from "@/lib/utils";

import ReactFlipCard from "reactjs-flip-card";

type Props = {
  firstPost: GalleyPost[];
  myId: string | undefined;
};

const NoLoginHomeGallery = (props: Props) => {
  const { firstPost, myId } = props;
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<GalleyPost[][]>([[], [], []]);
  const [loading, setLoading] = useState(true);
  const [cursorPostId, setCursorPostId] = useState(cursorById(firstPost));
  const [postLimit, setPostLimit] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    setLoading(true);
    const newPostsArray: GalleyPost[][] = [[], [], []];
    firstPost.forEach((post: GalleyPost, i) => {
      newPostsArray[i % 3] = [...newPostsArray[i % 3], post];
    });
    setPosts(newPostsArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (inView && !loading && !postLimit) {
      const fetchMorePosts = async () => {
        const newPosts = await fetchMoreLatestPosts(6, null, cursorPostId);
        if (newPosts.length < 6) {
          setPostLimit(true);
        } else {
          setPosts((prevPosts) => [
            [...prevPosts[0], newPosts[0], newPosts[3]],
            [...prevPosts[1], newPosts[1], newPosts[4]],
            [...prevPosts[2], newPosts[2], newPosts[5]],
          ]);
          const newCursorPostId = cursorById(newPosts);
          setCursorPostId(newCursorPostId);
        }
      };
      fetchMorePosts();
    }
  }, [inView, loading]);

  //   let relationship: string;
  const [relationship, setRelationship] = useState<UserRelationship>(
    UserRelationship.NoSession
  );
  const handleClick = (userId: string) => {
    const fetchRelationship = async () => {
      const relationship = await fetchUserRelationship(myId!, userId);
      await delay(1000);
      setRelationship(relationship);
    };
    if (myId) {
      fetchRelationship();
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div className="h-screen"></div>
        </>
      ) : (
        <div className="lg:px-40 px-5 flex">
          {posts.map((colPosts: GalleyPost[]) => (
            <div key={colPosts[0].id} className="w-1/3 p-1 lg:p-2">
              {colPosts.map((post: GalleyPost, index) => (
                // <ReactFlipCard
                //   key={post.id}
                //   onClick={() => handleClick(post.authorId)}
                //   containerStyle={{
                //     width: "100%",
                //     height: "auto",
                //     marginBottom: "8px",
                //   }}
                //   flipTrigger={"onClick"}
                //   direction="horizontal"
                //   frontComponent={<ImageFront index={index} post={post} />}
                //   backComponent={
                //     <ImageBack post={post} relationship={relationship} />
                //   }
                // />
                <FlipCard key={post.id} post={post} myId={myId} />
              ))}
              <div ref={ref} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NoLoginHomeGallery;

type FlipCardProps = {
  post: GalleyPost;
  myId: string | undefined;
};

const FlipCard = (props: FlipCardProps) => {
  const { post, myId } = props;
  //   let relationship: string;
  const [relationship, setRelationship] = useState<UserRelationship>(
    UserRelationship.NoSession
  );
  const handleClick = (userId: string) => {
    const fetchRelationship = async () => {
      const relationship = await fetchUserRelationship(myId!, userId);
      await delay(1000);
      setRelationship(relationship);
    };
    if (myId) {
      fetchRelationship();
    }
  };
  return (
    <ReactFlipCard
      key={post.id}
      onClick={() => handleClick(post.authorId)}
      containerStyle={{
        width: "100%",
        height: "auto",
        marginBottom: "8px",
      }}
      flipTrigger={"onClick"}
      direction="horizontal"
      frontComponent={<ImageFront index={1} post={post} />}
      backComponent={<ImageBack post={post} relationship={relationship} />}
    />
  );
};
