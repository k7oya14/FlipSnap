import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { GalleyPost, sessionUser } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import { SpHomePost } from "./SpHomePost";

type Props = {
  firstPosts: GalleyPost[];
  me: sessionUser | undefined;
};

const SpHome = async (props: Props) => {
  const { firstPosts, me } = props;
  const { cursorById } = useCursorById();
  return (
    <div>
      {firstPosts.map((post: GalleyPost) => (
        <SpHomePost key={post.id} post={post} me={me} />
      ))}
      <SpHomeLoadMore cursorId={cursorById(firstPosts)} me={me} />
    </div>
  );
};

export default SpHome;
