"use client";

import { Divide, EyeOff } from "lucide-react";
import React from "react";
import { UserRelationship } from "@/lib/definitions";
import BackFollowButton from "./BackFollowButton";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type Props = {
  myId?: string | null | undefined;
  userId?: string;
  relationship: UserRelationship;
  loading?: boolean;
};

const LockedBack = (props: Props) => {
  const { myId = undefined, userId, relationship, loading = false } = props;
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
        ) : relationship === UserRelationship.NoSession ? (
          <div className="my-2 flex flex-col justify-center">
            <p className="whitespace-nowrap text-lg text-white text-center">
              You have to sign in
            </p>
            <div className="mx-auto" onClick={(e) => e.stopPropagation()}>
              <Button
                onClick={() => signIn("google")}
                className="mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold max-w-fit"
              >
                Sign in
              </Button>
            </div>
          </div>
        ) : (
          <BackFollowButton
            myId={myId!}
            userId={userId}
            relationship={relationship}
          />
        )}
      </div>
    </div>
  );
};

export default LockedBack;
