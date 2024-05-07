import Image from "next/image";
import React from "react";
import LockedBack from "../LockedBack";
import { OnePost, UserRelationship } from "@/lib/definitions";
import { fetchUserRelationship } from "@/lib/fetch";

type Props = {
  post: OnePost;
  myId: string | undefined | null;
};

const SpDetailImageBack = async (props: Props) => {
  const { post, myId } = props;
  let relationship = UserRelationship.NoSession;
  if (myId) {
    relationship = await fetchUserRelationship(myId, post.authorId!);
  }
  const open =
    relationship === UserRelationship.Mutual ||
    relationship === UserRelationship.Me;
  return (
    <div className="overflow-hidden w-full">
      <Image
        alt=""
        src={post.imgBack!}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
        }}
        className={`${open || "filter blur-lg"}`}
        width={500}
        height={500}
      />
      {open || (
        <LockedBack
          myId={myId}
          userId={post.authorId}
          relationship={relationship!}
        />
      )}
    </div>
  );
};

export default SpDetailImageBack;
