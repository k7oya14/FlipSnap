import React from "react";
import SpHome from "../smartphone/SpHome";
import { auth } from "@/lib/auth";
import { fetchLatestPosts } from "@/lib/fetch";
import { GalleyPost } from "@/lib/definitions";
import HomeGallery from "./HomeGallery";

const Home = async () => {
  const session = await auth();
  const firstPosts = await fetchLatestPosts(12);
  const firstPostThreeArrays: GalleyPost[][] = [[], [], []];
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
          cursorId={firstPosts[firstPosts.length - 1].id}
        />
      </div>
    </>
  );
};

export default Home;
