import React from "react";
import { Skeleton } from "../ui/skeleton";

const OneCommentSkeleton = () => {
  return (
    <div className="flex items-start space-x-3 sm:p-3 p-[10px]">
      <Skeleton className="rounded-full size-8 aspect-square" />
      <div className="w-full">
        <div className="flex sm:flex-none items-center space-x-2 hover:cursor-pointer mb-1">
          <Skeleton className="hover:cursor-pointer w-16 h-3" />
        </div>
        <Skeleton className="w-3/5 h-3" />
      </div>
    </div>
  );
};

export default OneCommentSkeleton;
