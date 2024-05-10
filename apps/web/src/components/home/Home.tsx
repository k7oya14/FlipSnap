import React from "react";
import SpHome from "../smartphone/SpHome";
import { auth } from "@/lib/auth";
import { fetchTimeline } from "@/lib/fetch";
import HomeGallery from "./HomeGallery";
import { Post } from "@/lib/definitions";

const Home = async () => {
  const session = await auth();
  const firstPosts = await fetchTimeline(12);
  const firstPostThreeArrays: Post[][] = [[], [], []];
  firstPosts.forEach((post, i) => {
    firstPostThreeArrays[i % 3] = [...firstPostThreeArrays[i % 3], post];
  });
  return (
    <>
      <div className="block sm:hidden">
        <SpHome me={session?.user} firstPosts={firstPosts} />
      </div>
      <div className="hidden sm:flex flex-col justify-center items-center">
        <HomeGallery
          myId={session?.user.id}
          firstPosts={firstPostThreeArrays}
        />
      </div>
    </>
  );
};

export default Home;
