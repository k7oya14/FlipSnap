import React from "react";
import SpHomeLoadMore from "./SpHomeLoadMore";
import { GalleyPost, sessionUser } from "@/lib/definitions";
import { useCursorById } from "@/lib/utils";
import { SpHomePost } from "./SpHomePost";
import HomeFlipImage from "../home/HomeFlipImage";
import ImageFront from "../home/ImageFront";
import SpHomeFront from "./SpHomeFront";
import { Card } from "../ui/card";
import SpHome from "./SpHome";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Expand } from "lucide-react";

type Props = {
  firstPosts: GalleyPost[];
  me: sessionUser | undefined;
};

const SpHomeNew = async (props: Props) => {
  const { firstPosts, me } = props;
  const { cursorById } = useCursorById();
  return (
    <div>
      {firstPosts.map((post: GalleyPost) => (
        <Card key={post.id} className="mb-4 m-2 rounded shadow-xl">
          <HomeFlipImage
            post={post}
            myId={me?.id}
            containerStyle={{
              width: "100%",
              height: "auto",
            }}
            frontComponent={
              <Image
                alt=""
                src={post.imgFront}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                }}
                className="rounded-t"
                width={500}
                height={500}
              />
            }
          />
          <div className="flex items-center justify-between px-1 py-1 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-b">
            <Link
              href={`/profile/${post.author?.username}`}
              className={`flex items-center space-x-2 `}
            >
              <Avatar>
                <AvatarImage src={post.author?.image!} />
                <AvatarFallback>{post.author?.name}</AvatarFallback>
              </Avatar>
              <p className="text-xl font-semibold">{post.author?.name}</p>
            </Link>
            <Link href={`/posts/${post.id}`} scroll={false} className="p-[6px]">
              <Expand
                className={`size-[29px] text-neutral-800 hover:scale-110 transition duration-200 ease-in-out`}
              />
            </Link>
          </div>
        </Card>
      ))}
      {/* <SpHomeLoadMore cursorId={cursorById(firstPosts)} me={me} /> */}
    </div>
  );
};

export default SpHomeNew;
