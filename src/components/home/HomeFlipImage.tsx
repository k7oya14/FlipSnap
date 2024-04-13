"use client";

import { GalleyPost, UserRelationship } from "@/lib/definitions";
import Image from "next/image";
import React, { useState } from "react";
import ReactFlipCard from "reactjs-flip-card";
import ImageBack from "./ImageBack";
import { fetchUserRelationship } from "@/lib/fetch";

type Props = {
  post: GalleyPost;
  myId: string | undefined | null;
  containerStyle: React.CSSProperties;
  frontComponent: JSX.Element;
};

const HomeFlipImage = (props: Props) => {
  const { post, myId, containerStyle, frontComponent } = props;
  const [loading, setLoading] = useState(myId ? true : false);
  const [relationship, setRelationship] = useState<UserRelationship>(
    UserRelationship.NoSession
  );
  const handleRelationship = async () => {
    if (loading) {
      const relationship = await fetchUserRelationship(myId!, post.authorId);
      setRelationship(relationship);
      setLoading(false);
    }
  };
  return (
    <ReactFlipCard
      flipTrigger="onClick"
      direction="horizontal"
      onClick={handleRelationship}
      containerStyle={containerStyle}
      frontComponent={frontComponent}
      backComponent={
        <ImageBack
          post={post}
          myId={myId}
          relationship={relationship}
          loading={loading}
        />
      }
    />
  );
};

export default HomeFlipImage;
