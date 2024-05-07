import DetailImageBack from "./DetaiImagelBack";
import FlipImage from "../FlipImage";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { Comment, OnePost, sessionUser } from "@/lib/definitions";
import PostInformation from "./PostInformation";

type Props = {
  post: OnePost;
  me: sessionUser | undefined;
  latestComments: Comment[];
};

export async function PostDetail(props: Props) {
  const { post, me, latestComments } = props;

  return (
    <div className="flex bg-neutral-100 rounded-lg">
      <div className="w-[55%] h-[83vh] max-h-[600px] rounded-l-lg bg-neutral-900 border-r border-gray-200 flex justify-center">
        <FlipImage
          containerStyle={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
            margin: "auto",
          }}
          frontComponent={
            <Image
              alt=""
              width={500}
              height={500}
              style={{
                objectFit: "contain",
                height: "100%",
                width: "auto",
                margin: "auto",
              }}
              src={post.imgFront!}
            />
          }
          backComponent={
            <Suspense
              fallback={
                <Skeleton className="w-full h-[83vh] max-h-[600px] rounded-r-none" />
              }
            >
              <DetailImageBack
                src={post.imgBack!}
                myId={me?.id}
                userId={post.authorId!}
              />
            </Suspense>
          }
        />
      </div>
      <PostInformation post={post} me={me} latestComments={latestComments} />
    </div>
  );
}
