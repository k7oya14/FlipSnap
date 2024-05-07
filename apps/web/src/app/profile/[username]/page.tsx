import Profile from "@/components/profile/Profile";
import ProfileGallerySkeleton from "@/components/skeleton/ProfileGallerySkeleton";
import ProfileInformationSkeleton from "@/components/skeleton/ProfileInformationSkeleton";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { username: string } }) => {
  return (
    <div className="my-1 sm:my-2 max-w-5xl mx-auto">
      <Suspense
        fallback={
          <>
            <ProfileInformationSkeleton />
            <ProfileGallerySkeleton />
          </>
        }
      >
        <Profile username={params.username} />
      </Suspense>
    </div>
  );
};

export default Page;
