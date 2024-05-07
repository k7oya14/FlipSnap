import { Expand } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import StopPropagationDiv from "../StopPropagationDiv";
import { MotionDiv } from "../MotionDiv";
import { isMobile } from "react-device-detect";

type Props = {
  index: number;
  src: string;
  postId: string;
};

const ProfileImageFront = (props: Props) => {
  const { index, src, postId } = props;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className={`group relative rounded-md overflow-hidden ${
        isMobile ? "" : "hover:cursor-pointer"
      }`}
    >
      <div
        className={
          isMobile
            ? ""
            : "absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-30"
        }
      />
      <Image
        priority={index < 3}
        alt=""
        className="w-full rounded"
        height="293"
        src={src}
        style={{
          aspectRatio: "293/293",
          objectFit: "cover",
        }}
        width="293"
      />
      <StopPropagationDiv>
        <Link
          className="pl-6 pt-6 pb-2 pr-2 absolute -bottom-[1px] sm:-bottom-[2px] -right-[1px] sm:right-0"
          href={`/posts/${postId}`}
          scroll={false}
        >
          <Expand className="visible sm:invisible group-hover:visible size-6 sm:size-[28px] text-slate-200 hover:scale-110 transition duration-300 ease-in-out" />
        </Link>
      </StopPropagationDiv>
    </MotionDiv>
  );
};

export default ProfileImageFront;
