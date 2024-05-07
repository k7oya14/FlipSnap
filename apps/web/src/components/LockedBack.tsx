"use client";

import { EyeOff } from "lucide-react";
import React from "react";
import { UserRelationship } from "@/lib/definitions";
import BackFollowButton from "./BackFollowButton";

type Props = {
  profile?: boolean;
  myId?: string | null | undefined;
  userId?: string;
  relationship: UserRelationship;
  loading?: boolean;
  fetchRelationship?: () => void;
};

const LockedBack = (props: Props) => {
  const {
    profile = false,
    myId,
    userId,
    relationship,
    loading = false,
    fetchRelationship,
  } = props;
  return (
    <div className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent to-black rounded-t rounded-b">
      <div className="absolute flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <EyeOff className="h-10 w-10 left-1/2 text-white" />
        {loading ? (
          <div className="my-2 flex flex-col justify-center">
            <p className="whitespace-nowrap text-lg text-white text-center">
              Loading
            </p>
          </div>
        ) : (
          <BackFollowButton
            profile={profile}
            myId={myId!}
            userId={userId}
            relationship={relationship}
            fetchRelationship={fetchRelationship}
          />
        )}
      </div>
    </div>
  );
};

export default LockedBack;
