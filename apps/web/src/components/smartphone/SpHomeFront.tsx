import { Expand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StopPropagationDiv from "../StopPropagationDiv";
import { Post } from "@/lib/definitions";

type Props = {
  index: number;
  post: Post;
};

const SpHomeFront = (props: Props) => {
  const { index, post } = props;
  return (
    <div className="w-full group relative overflow-hidden hover:cursor-pointer">
      <Image
        width={500}
        height={500}
        priority={index === 0}
        className="rounded"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
        }}
        alt=""
        src={post.imgFront}
      />
      <div className="absolute inset-x-0 bottom-0 h-full w-full">
        <StopPropagationDiv>
          <Link href={`/posts/${post.id}`} scroll={false}>
            <Expand
              className={`absolute bottom-[10px] right-[10px] visible group-hover:visible size-[24px] text-slate-200 hover:scale-110 transition duration-300 ease-in-out`}
            />
          </Link>
        </StopPropagationDiv>
      </div>
    </div>
  );
};

export default SpHomeFront;
