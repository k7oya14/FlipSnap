import React from "react";
import Image from "next/image";
import LockedBack from "../LockedBack";
import { UserRelationship } from "@/lib/definitions";
import { fetchUserRelationship } from "@/lib/fetch";

type Props = {
  src: string;
  myId: string | null | undefined;
  userId: string;
};

const DetailImageBack = async (props: Props) => {
  const { src, myId, userId } = props;
  let relationship = UserRelationship.NoSession;
  if (myId) {
    relationship = await fetchUserRelationship(myId, userId);
  }
  const open =
    relationship === UserRelationship.Mutual ||
    relationship === UserRelationship.Me;

  return (
    <div className="text-center h-full">
      <div className="relative overflow-hidden h-full inline-block">
        <Image
          alt=""
          width={500}
          height={500}
          className={`object-contain h-full w-auto ${open || "filter blur-lg"}`}
          src={src}
        />
        {open || (
          <LockedBack myId={myId} userId={userId} relationship={relationship} />
        )}
      </div>
    </div>
  );
};

export default DetailImageBack;
