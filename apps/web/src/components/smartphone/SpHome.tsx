import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { Post, sessionUser } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import HomeFlipImage from "../home/HomeFlipImage";
import SpImageFront from "./SpImageFront";

type Props = {
  firstPosts: Post[];
  me: sessionUser | undefined;
};

const SpHome = async (props: Props) => {
  const { firstPosts, me } = props;
  const { cursorById } = useCursorById();
  return (
    <div>
      {firstPosts.map((post: Post, index) => (
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
      <SpHomeLoadMore skip={firstPosts.length} me={me} />
    </div>
  );
};

export default SpHome;
