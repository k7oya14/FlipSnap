import FollowingList from "@/components/follow/FollowingList";
import FollowSkeleton from "@/components/skeleton/FollowSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import React, { Suspense } from "react";

const Following = async ({ params }: { params: { username: string } }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center mt-4">Following</h1>
      <Card className="m-4 max-w-[90vw] w-[500px] mx-auto shadow-lg">
        <CardContent className="py-1">
          <Suspense fallback={<FollowSkeleton />}>
            <FollowingList username={params.username} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default Following;
