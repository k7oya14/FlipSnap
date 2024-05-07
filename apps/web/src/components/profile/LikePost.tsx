import React from "react";
import { Post } from "@/lib/definitions";
import HomeFlipImage from "../home/HomeFlipImage";
import LikePostImageFront from "./LikePostImageFront";

type Props = {
  post: Post;
  index: number;
  myId: string | undefined;
};

const LikePost = function LikePost(props: Props) {
  const { post, index, myId } = props;
  return (
    <HomeFlipImage
      likes={true}
      post={post}
      myId={myId}
      containerStyle={{
        width: "100%",
        height: "auto",
      }}
      frontComponent={<LikePostImageFront index={index} post={post} />}
    />
  );
};

export default LikePost;
