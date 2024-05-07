import React from "react";
import { Skeleton } from "../ui/skeleton";

const FollowSkeleton = () => {
  return [...Array(10)].map((_, i) => (
    <div
      key={i}
      className={`flex items-center justify-between ${
        i === 9 || "border-b border-gray-200"
      } py-2`}
    >
      <div className="flex items-center space-x-4">
        <Skeleton className="size-[50px] rounded-full" />
        <div>
          <Skeleton className="w-40 h-6 mb-1" />
          <Skeleton className="w-32 h-[14px]" />
        </div>
      </div>
    </div>
  ));
};

export default FollowSkeleton;
