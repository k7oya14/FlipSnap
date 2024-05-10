import Image from "next/image";
import React, { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import {  Post, sessionUser } from "@/lib/definitions";
import StopPropagationDiv from "../StopPropagationDiv";
import { SpPostInfoDrawer } from "./SpPostInfoDrawer";

type Props = {
  me: sessionUser | undefined;
  index: number;
  post: Post;
};

const SpImageFront = memo(function SpImageFront(props: Props) {
  const { me, index, post } = props;

  return (
    <div className="w-full group relative overflow-hidden hover:cursor-pointer">
      <Image
        width={500}
        height={500}
        priority={index < 2}
        className="rounded-3xl"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
        }}
        alt=""
        src={post.imgFront}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-transparent from-60% to-zinc-800 rounded-b-3xl `}
      >
        <StopPropagationDiv>
          <Link
            href={`/profile/${post.author?.username}`}
            className={`absolute bottom-2 left-2 flex items-center space-x-2 text-slate-200`}
          >
            <Avatar>
              <AvatarImage src={post.author?.image!} />
              <AvatarFallback>{post.author?.name}</AvatarFallback>
            </Avatar>
            <p className="text-lg">{post.author?.name}</p>
          </Link>
          <div className="absolute bottom-1 right-[6px]">
            <SpPostInfoDrawer postId={post.id} me={me} />
          </div>
        </StopPropagationDiv>
      </div>
    </div>
  );
});

export default SpImageFront;
