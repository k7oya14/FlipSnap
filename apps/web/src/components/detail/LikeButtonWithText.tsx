import React, { useCallback, useState } from "react";
import LikeButton from "../LikeButton";

type Props = {
  defaultLiked: boolean;
  myId: string | undefined | null;
  postId: string;
  initialCountLikes: number;
};

const LikeButtonWithText = (props: Props) => {
  const { defaultLiked, myId, postId, initialCountLikes } = props;
  const [countLikes, setCountLikes] = useState(initialCountLikes);

  const onClick = useCallback((liked: boolean) => {
    if (liked) {
      setCountLikes((prev) => prev + 1);
    } else {
      setCountLikes((prev) => prev - 1);
    }
  }, []);
  return (
    <LikeButton
      defaultLiked={defaultLiked}
      myId={myId}
      postId={postId}
      text={String(countLikes)}
      onClick={onClick}
    />
  );
};

export default LikeButtonWithText;
