import FollowerList from "@/components/follow/FollowerList";
import FollowSkeleton from "@/components/skeleton/FollowSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import React, { Suspense } from "react";

const Follower = async ({ params }: { params: { username: string } }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center mt-4">Follower</h1>
      <Card className="m-4 max-w-[95vw] w-[500px] mx-auto shadow-lg">
        <CardContent className="py-1">
          <Suspense fallback={<FollowSkeleton />}>
            <FollowerList username={params.username} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default Follower;
