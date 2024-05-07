import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistance } from "date-fns";
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

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ReplyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function BookmarkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}
