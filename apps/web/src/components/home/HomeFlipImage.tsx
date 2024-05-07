"use client";

import { GalleyPost, Post, UserRelationship } from "@/lib/definitions";
import React, { useState } from "react";
import ReactFlipCard from "reactjs-flip-card";
import ImageBack from "./ImageBack";
import { fetchUserRelationship } from "@/lib/fetch";
import ProfileImageBack from "../profile/ProfileImageBack";

type Props = {
  likes?: boolean;
  post: GalleyPost | Post;
  myId: string | undefined | null;
  containerStyle: React.CSSProperties;
  frontComponent: JSX.Element;
};

const HomeFlipImage = React.memo(function HomeFlipImage(props: Props) {
  const { likes = false, post, myId, containerStyle, frontComponent } = props;
  const [loading, setLoading] = useState(myId ? true : false);
  const [relationship, setRelationship] = useState<UserRelationship>(
    UserRelationship.NoSession
  );

  const fetchRelationship = async () => {
    if (!myId) return;
    const relationship = await fetchUserRelationship(myId!, post.authorId);
    setRelationship(relationship);
    setLoading(false);
  };
  return (
    <ReactFlipCard
      flipTrigger="onClick"
      direction="horizontal"
      onClick={loading ? fetchRelationship : undefined}
      containerStyle={containerStyle}
      frontComponent={frontComponent}
      backComponent={
        likes ? (
          <ProfileImageBack
            src={post.imgBack}
            userId={post.authorId}
            myId={myId}
            loading={loading}
            relationship={relationship}
          />
        ) : (
          <ImageBack
            post={post}
            myId={myId}
            relationship={relationship}
            loading={loading}
            fetchRelationship={fetchRelationship}
          />
        )
      }
    />
  );
});

export default HomeFlipImage;
