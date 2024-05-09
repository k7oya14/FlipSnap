import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { GalleyPost, sessionUser } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import { SpHomePost } from "./SpHomePost";
import HomeFlipImage from "../home/HomeFlipImage";
import ImageFront from "../home/ImageFront";

type Props = {
  firstPosts: GalleyPost[];
  me: sessionUser | undefined;
};

const SpHomeNew = async (props: Props) => {
  const { firstPosts, me } = props;
  const { cursorById } = useCursorById();
  return (
    <div>
      {firstPosts.map((post: GalleyPost) => (
        <HomeFlipImage
          key={post.id}
          post={post}
          myId={me?.id}
          containerStyle={{
            width: "100%",
            height: "auto",
          }}
          frontComponent={<ImageFront mobile={true} index={0} post={post} />}
        />
      ))}
      {/* <SpHomeLoadMore cursorId={cursorById(firstPosts)} me={me} /> */}
    </div>
  );
};

export default SpHomeNew;
