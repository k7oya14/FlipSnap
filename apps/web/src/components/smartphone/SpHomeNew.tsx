import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { GalleyPost, sessionUser } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
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
        <div className="rounded-3xl m-2 shadow-lg">
          <HomeFlipImage
            key={post.id}
            post={post}
            myId={me?.id}
            containerStyle={{
              width: "100%",
              height: "auto",
              borderRadius: "0.5rem",
            }}
            frontComponent={<ImageFront mobile={true} index={0} post={post} />}
          />
        </div>
      ))}
      {/* <SpHomeLoadMore cursorId={cursorById(firstPosts)} me={me} /> */}
    </div>
  );
};

export default SpHomeNew;
