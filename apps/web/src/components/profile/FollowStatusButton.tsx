"use client";

import React, { useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Follow, UnFollow } from "@/lib/actions";
import { UserRelationship } from "@/lib/definitions";
import { MotionDiv } from "../MotionDiv";
import { useFormStatus } from "react-dom";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  myId: string;
  userId: string;
  relationship: UserRelationship;
};

const FollowStatusButton = (props: Props) => {
  const { myId, userId, relationship } = props;

  const [optimisticRelationship, updateOptimisticRelationship] =
    useState(relationship);
  const realityRelationship = useRef(relationship);
  const { pending } = useFormStatus();

  const onDebounceFollow = useDebouncedCallback(async () => {
    if (pending) return;

    if (realityRelationship.current === optimisticRelationship) return;

    if (
      optimisticRelationship === UserRelationship.Following ||
      optimisticRelationship === UserRelationship.Mutual
    ) {
      try {
        await Follow(myId, userId);
        realityRelationship.current++;
        updateOptimisticRelationship(realityRelationship.current);
      } catch (error) {
        updateOptimisticRelationship(realityRelationship.current);
      }
    } else {
      try {
        await UnFollow(myId, userId);
        realityRelationship.current--;
        updateOptimisticRelationship(realityRelationship.current);
      } catch (error) {
        updateOptimisticRelationship(realityRelationship.current);
      }
    }
  }, 500);

  const handleOnClick = useCallback(() => {
    if (
      optimisticRelationship === UserRelationship.Follower ||
      optimisticRelationship === UserRelationship.None
    )
      updateOptimisticRelationship((prev) => prev + 1);
    else updateOptimisticRelationship((prev) => prev - 1);
    onDebounceFollow();
  }, [optimisticRelationship, onDebounceFollow]);

  switch (optimisticRelationship) {
    case UserRelationship.Follower:
    case UserRelationship.None:
      return (
        <>
          <MotionDiv
            whileTap={{
              scale: 0.9,
            }}
          >
            <form action={handleOnClick} className="flex flex-col">
              <Button
                type="submit"
                className="rounded-full bg-neutral-900 w-24"
              >
                Follow
              </Button>
            </form>
          </MotionDiv>
          {optimisticRelationship === UserRelationship.Follower && (
            <p className="text-sm font-normal">You are being followed</p>
          )}
        </>
      );
    case UserRelationship.Following:
    case UserRelationship.Mutual:
      return (
        <>
          <MotionDiv
            whileTap={{
              scale: 0.9,
            }}
          >
            <form action={handleOnClick} className="flex flex-col">
              <Button
                type="submit"
                className="group w-24 rounded-full bg-neutral-300 hover:bg-neutral-400 opacity-80 text-black"
              >
                <span className="hidden group-hover:block">Unfollow</span>
                <span className="block group-hover:hidden">Following</span>
              </Button>
            </form>
          </MotionDiv>
          {optimisticRelationship === UserRelationship.Mutual && (
            <p className="text-sm font-normal">You are being followed</p>
          )}
        </>
      );
    default:
      break;
  }
};

export default FollowStatusButton;
