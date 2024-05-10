import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Comment, OnePost, sessionUser } from "@/lib/definitions";
import ModalLink from "../detail/ModalLink";
import FlipImage from "../FlipImage";
import Image from "next/image";
import SpDetailImageBack from "./SpDetailImageBack";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import SpPostInformation from "./SpPostInformation";

type Props = {
  post: OnePost;
  me: sessionUser | undefined;
  latestComments: Comment[];
};

export async function SpDetailPost(props: Props) {
  const { post, me, latestComments } = props;

  return (
    <div className="w-full h-full flex flex-col">
      <ModalLink
        href={`/profile/${post.author?.username}`}
        className="pl-3 pt-3 flex items-center hover:cursor-pointer"
      >
        <Avatar>
          <AvatarImage
            className="rounded-full w-10 h-10"
            src={post.author?.image || "/placeholder.svg?height=32&width=32"}
          />
          <AvatarFallback>{post.author?.name}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-semibold">{post.author?.name}</p>
          <p className="ml-1 text-xs text-gray-500">{post.author?.username}</p>
        </div>
      </ModalLink>
      <main className="flex-grow overflow-y-auto">
        <div className="flex flex-col pt-2">
          <FlipImage
            containerStyle={{
              width: "100%",
              height: "auto",
              cursor: "pointer",
            }}
            frontComponent={
              <Image
                alt=""
                src={post.imgFront!}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                }}
                width={500}
                height={500}
              />
            }
            backComponent={
              <Suspense
                fallback={
                  <>
                    <Image
                      alt=""
                      src={post.imgFront!}
                      width={500}
                      height={500}
                      className="w-full h-auto opacity-0 relative"
                    />
                    <Skeleton className="absolute inset-0 w-full h-auto" />
                  </>
                }
              >
                <SpDetailImageBack post={post} myId={me?.id} />
              </Suspense>
            }
          />
          <SpPostInformation
            defaultLiked={post.isLikedByMe}
            latestComments={latestComments}
            caption={post.caption}
            createdAt={post.createdAt}
            postId={post.id}
            me={me}
          />
        </div>
      </main>
    </div>
  );
}