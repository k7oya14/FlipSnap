"use client";

import React, { useOptimistic } from "react";
import { Button } from "./ui/button";
import { Follow } from "@/lib/actions";
import { UserRelationship } from "@/lib/definitions";
import { signIn } from "next-auth/react";

type Props = {
  profile?: boolean;
  myId: string | undefined;
  userId: string | undefined;
  relationship: UserRelationship;
  fetchRelationship?: () => void;
};

const BackFollowButton = (props: Props) => {
  const {
    profile = false,
    myId,
    userId,
    relationship,
    fetchRelationship,
  } = props;
  const [optimisticRelationship, updateOptimisticRelationship] = useOptimistic<
    UserRelationship,
    UserRelationship
  >(relationship, (state, newState: UserRelationship) => newState);

  switch (optimisticRelationship) {
    case UserRelationship.Following:
      return (
        <p
          className={`${
            profile ? "" : "sm:my-2"
          } whitespace-nowrap sm:text-lg text-white text-center`}
        >
          Not Followed Back
        </p>
      );
    case UserRelationship.Follower:
    case UserRelationship.None:
      return (
        <form
          action={async () => {
            updateOptimisticRelationship(relationship + 1);
            await Follow(myId!, userId!);
            await fetchRelationship?.();
          }}
          className={`${profile ? "" : "sm:my-2"} flex flex-col justify-center`}
        >
          <p className="whitespace-nowrap text-lg text-white text-center">
            You have to follow
          </p>
          <div className="mx-auto" onClick={(e) => e.stopPropagation()}>
            <Button
              type="submit"
              className={`${
                profile ? "h-8 w-16 sm:h-auto sm:w-auto" : ""
              } mt-2 mx-auto bg-white hover:bg-slate-100 rounded-full text-black font-bold max-w-fit`}
            >
              Follow
            </Button>
          </div>
        </form>
      );
    case UserRelationship.NoSession:
      return (
        <div
          className={`${profile ? "" : "sm:my-2"} flex flex-col justify-center`}
        >
          <p className="whitespace-nowrap text-lg text-white text-center">
            You have to sign in
          </p>
          <div className="mx-auto" onClick={(e) => e.stopPropagation()}>
            <Button
              onClick={() => signIn("google")}
              className={`${
                profile ? "h-8 w-[68px] sm:h-auto sm:w-auto" : ""
              } mt-2 bg-white hover:bg-slate-100 rounded-full text-black font-bold max-w-fit`}
            >
              Sign in
            </Button>
          </div>
        </div>
      );
    default:
      break;
  }
};

export default BackFollowButton;
