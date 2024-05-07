import Image from "next/image";
import React from "react";
import LockedBack from "../LockedBack";
import { GalleyPost, Post, UserRelationship } from "@/lib/definitions";

type Props = {
  post: GalleyPost | Post;
  myId: string | undefined | null;
  relationship: UserRelationship;
  loading?: boolean;
  fetchRelationship?: () => void;
};

const ImageBack = (props: Props) => {
  const {
    post,
    myId,
    relationship,
    loading = false,
    fetchRelationship,
  } = props;
  const open =
    relationship === UserRelationship.Mutual ||
    relationship === UserRelationship.Me;
  return (
    <div>
      <div className="overflow-hidden w-full h-auto hover:cursor-pointer sm:rounded-lg ">
        <Image
          width={500}
          height={500}
          className={`rounded-md  relative ${open || "filter blur-lg"}`}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
          }}
          alt=""
          src={post.imgBack}
        />
        {open || (
          <LockedBack
            myId={myId}
            userId={post.authorId}
            relationship={relationship}
            loading={loading}
            fetchRelationship={fetchRelationship}
          />
        )}
      </div>
    </div>
  );
};

export default ImageBack;
