import React from "react";
import SpHome from "../smartphone/SpHome";
import { auth } from "@/lib/auth";
import { fetchLatestPosts, fetchTimeline } from "@/lib/fetch";
import HomeGallery from "./HomeGallery";
import { Post } from "@/lib/definitions";

type Props = { timeline?: boolean };

const Home = async (props: Props) => {
  const { timeline = false } = props;
  const session = await auth();
  let firstPosts: Post[] = [];
  if (timeline) {
    firstPosts = await fetchTimeline(12, 0, session?.user.id);
  } else {
    firstPosts = await fetchTimeline(12);
  }
  const firstPostThreeArrays: Post[][] = [[], [], []];
  firstPosts.forEach((post, i) => {
    firstPostThreeArrays[i % 3] = [...firstPostThreeArrays[i % 3], post];
  });
  return (
    <>
      <div className="block sm:hidden">
        <SpHome
          timeline={timeline}
          me={session?.user}
          firstPosts={firstPosts}
        />
      </div>
      <div className="hidden sm:flex flex-col justify-center items-center">
        <HomeGallery
          timeline={timeline}
          myId={session?.user.id}
          firstPosts={firstPostThreeArrays}
        />
      </div>
    </>
  );
};

export default Home;
