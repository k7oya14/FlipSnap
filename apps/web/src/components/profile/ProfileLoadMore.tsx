"use client";

import { Post, UserInfo, UserRelationship } from "@/lib/definitions";
import { fetchMoreLikedPosts, fetchMoreUserPostsById } from "@/lib/fetch";
import { useCursorById } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ProfilePost from "./ProfilePost";
import { Skeleton } from "../ui/skeleton";
import LikePost from "./LikePost";

type Props = {
  likes?: boolean;
  myId: string | undefined;
  userInfo: UserInfo;
  cursorId: string;
  relationship: UserRelationship;
};

const ProfileLoadMore = (props: Props) => {
  const { likes = false, myId, userInfo, cursorId, relationship } = props;
  const { cursorById } = useCursorById();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLimit, setPostLimit] = useState(false);
  const [cursorPostId, setCursorPostId] = useState(cursorId);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: undefined,
  });

  useEffect(() => {
    if (inView && !loading && !postLimit) {
      const fetchMorePosts = async () => {
        setLoading(true);
        let data: Post[] = [];
        if (!likes) {
          data = await fetchMoreUserPostsById(userInfo.id!, 6, cursorPostId);
        } else {
          data = await fetchMoreLikedPosts(userInfo.id!, 6, cursorPostId);
        }
        if (data.length < 6) {
          setPostLimit(true);
        }
        setPosts((prevPosts) => [...prevPosts, ...data]);
        const newCursorId = cursorById(data);
        setCursorPostId(newCursorId);
        setLoading(false);
      };
      fetchMorePosts();
    }
  }, [inView, loading, postLimit]);
  return (
    <>
      {posts.map((post, index) => (
        <div key={post.id}>
          {likes ? (
            <LikePost post={post} index={index} myId={myId} />
          ) : (
            <ProfilePost
              post={post}
              index={index}
              myId={myId}
              relationship={relationship}
            />
          )}
        </div>
      ))}
      {loading &&
        !postLimit &&
        [...Array(6)].map((_, index) => (
          <Skeleton key={index} className="w-full aspect-square" />
        ))}
      <div className="h-[1px]" ref={ref}></div>
    </>
  );
};

export default ProfileLoadMore;
