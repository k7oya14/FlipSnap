"use client";

import React, { useCallback, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { clsx } from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { useFormStatus } from "react-dom";
import { Like, UndoLike } from "@/lib/actions";

type Props = {
  myId: string | undefined | null;
  postId: string;
  size?: number;
  text?: string;
  onClick?: (arg0: boolean) => void;
  defaultLiked?: boolean;
};

export const LikeButton = (props: Props) => {
  const {
    myId,
    postId,
    size = 44,
    defaultLiked = false,
    text,
    onClick,
  } = props;

  const width = Math.floor(size * 25);
  const [currentLikeState, setCurrentLikeState] = useState(defaultLiked);
  const [clicked, setClicked] = useState(false);
  const realityLiked = useRef(defaultLiked);
  const { pending } = useFormStatus();

  const onDebounceLike = useDebouncedCallback(async () => {
    if (pending) return;

    if (realityLiked.current === currentLikeState) return;

    if (currentLikeState) {
      try {
        await Like(myId!, postId);
        realityLiked.current = true;
        setCurrentLikeState(true);
      } catch (error) {
        realityLiked.current = false;
        setCurrentLikeState(false);
        if (onClick) onClick(false);
      }
    } else {
      try {
        await UndoLike(myId!, postId);
        realityLiked.current = false;
        setCurrentLikeState(false);
      } catch (error) {
        realityLiked.current = true;
        setCurrentLikeState(true);
        if (onClick) onClick(true);
      }
    }
  }, 1000);

  const handleOnClick = useCallback(() => {
    if (onClick) onClick(!currentLikeState);
    setCurrentLikeState(!currentLikeState);
    if (!clicked) setClicked(true);
    onDebounceLike();
  }, [currentLikeState, onClick, onDebounceLike, clicked]);

  return (
    <form action={handleOnClick}>
      <button
        type="submit"
        className="relative flex items-center justify-center"
        style={{
          width: text ? "auto" : `${size}px`,
          height: `${size}px`,
          paddingLeft: text ? `${size - 2}px` : "0",
        }}
      >
        <div
          className={clsx(
            `like-base-64 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full`
          )}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundSize: `auto ${size}px`,
            transition: `background-position steps(25)`,
            transitionDuration: currentLikeState ? "1s" : "0s",
            backgroundPosition: currentLikeState ? `-${width}px 0` : `0 0`,
          }}
        >
          <Heart
            className={clsx(
              "size-[28px]",
              currentLikeState
                ? "fill-pink-500 text-pink-500"
                : "fill-transparent text-gray-500 hover:text-gray-600",
              clicked
                ? currentLikeState
                  ? "like-animation"
                  : "like-animation-end"
                : ""
            )}
          />
        </div>
        {text && (
          <span
            className={clsx(
              "text-lg",
              currentLikeState ? "text-pink-500" : "text-gray-500"
            )}
          >
            {text}
          </span>
        )}
      </button>
    </form>
  );
};

export default LikeButton;
