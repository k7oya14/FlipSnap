import React from "react";
import SpHome from "../smartphone/SpHome";
import Image from "next/image";
import { auth } from "@/lib/auth";
import HomeGalleryFetch from "./HomeGalleryFetch";

const Home = async () => {
  const session = await auth();
  return (
    <>
      <div className="block sm:hidden">
        <SpHome myId={session?.user.id} />
      </div>
      <div className="hidden sm:flex flex-col justify-center">
        <Image
          width={1200}
          height={628}
          unoptimized
          priority={true}
          className="mt-1 w-full h-[66.67vh] object-contain"
          alt=""
          src="/hero.gif"
        />
        <HomeGalleryFetch myId={session?.user.id} />
      </div>
    </>
  );
};

export default Home;
