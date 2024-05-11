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
  console.log("--------------------"); //
  const start = process.hrtime(); //
  const posts = await fetchLatestPosts(12); //
  const end = process.hrtime(start); //
  console.log(
    "[MY LOG] fetchLatestPosts >>> " + (end[0] * 1e9 + end[1]) / 1e6 + "ms"
  ); //
  const start2 = process.hrtime(); //
  const posts2 = await fetchTimeline(12); //
  const end2 = process.hrtime(start2); //
  console.log(
    "[MY LOG] fetchTimeline >>> " + (end2[0] * 1e9 + end2[1]) / 1e6 + "ms"
  ); //
  console.log("--------------------"); //
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
