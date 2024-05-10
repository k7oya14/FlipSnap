"use client";

import Link from "next/link";
import { isMobile } from "react-device-detect";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GalleyPost, Post } from "@/lib/definitions";

type Props = { post: Post | GalleyPost };

const LikePostInformation = (props: Props) => {
  const { post } = props;
  return (
    <>
      {isMobile || (
        <Link
          href={`/profile/${post.author?.username}`}
          className={`absolute bottom-2 left-2 invisible flex items-center space-x-2 text-slate-200 group-hover:visible`}
        >
          <Avatar>
            <AvatarImage src={post.author?.image!} />
            <AvatarFallback>{post.author?.name}</AvatarFallback>
          </Avatar>
          <p className="text-lg">{post.author?.name}</p>
        </Link>
      )}
    </>
  );
};

export default LikePostInformation;
