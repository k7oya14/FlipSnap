import React from "react";
import { Skeleton } from "../ui/skeleton";

const DetailSkeleton = () => {
  return (
    <div className="flex">
      <div className="w-[55%] h-[83vh] max-h-[600px] rounded-l-lg bg-neutral-900 border-r border-gray-200 flex justify-center">
        <Skeleton className="w-full h-full rounded-l-lg rounded-r-none" />
      </div>
      <div className="w-[45%] flex flex-col border rounded-r-lg border-gray-200">
        <div className="flex items-center p-2 md:p-4 border-b">
          <div className="flex items-center hover:cursor-pointer">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="ml-3">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-16 h-3 mt-1" />
            </div>
          </div>
        </div>
        <div className="m-2 md:m-4">
          <Skeleton className=" w-full h-4 md:h-5" />
          <Skeleton className="w-full h-4 md:h-5 my-1 md:my-2" />
          <Skeleton className="w-1/3 h-4 md:h-5" />
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
