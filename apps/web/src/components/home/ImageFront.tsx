import { Expand } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { GalleyPost } from "@/lib/definitions";
import StopPropagationDiv from "../StopPropagationDiv";
import { MotionDiv } from "../MotionDiv";

type Props = {
  index: number;
  post: GalleyPost;
};

const ImageFront = function ImageFront(props: Props) {
  const { index, post } = props;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: index == 0 ? 0 : 0.5 }}
    >
      <div className="w-full group relative rounded-md overflow-hidden hover:cursor-pointer">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <Image
          width={500}
          height={500}
          priority={index === 0}
          className="rounded-md"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
          }}
          alt=""
          src={post.imgFront}
        />
        <div className="absolute inset-x-0 bottom-0 h-full w-full hover:bg-gradient-to-b from-transparent to-zinc-800 rounded-b">
          <StopPropagationDiv>
            <Link
              href={`/profile/${post.author?.username}`}
              className="absolute bottom-2 left-2 invisible group-hover:visible flex items-center space-x-2 text-slate-200"
            >
              <Avatar>
                <AvatarImage src={post.author?.image!} />
                <AvatarFallback>{post.author?.name}</AvatarFallback>
              </Avatar>
              <p className="text-lg">{post.author?.name}</p>
            </Link>
            <Link href={`/posts/${post.id}`} scroll={false}>
              <Expand className="absolute bottom-[10px] right-[10px] invisible group-hover:visible size-[24px] text-slate-200 hover:scale-110 transition duration-300 ease-in-out" />
            </Link>
          </StopPropagationDiv>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ImageFront;
