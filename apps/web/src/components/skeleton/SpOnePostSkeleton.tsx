import React from "react";
import { Skeleton } from "../ui/skeleton";
import { HeartIcon, MessageCircle } from "lucide-react";

const SpOnePostSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col border-b-2">
      <div className="pl-3 pt-3 flex items-center hover:cursor-pointer">
        <Skeleton className="rounded-full w-10 h-10" />
        <div className="ml-3">
          <Skeleton className="w-[30vw] h-[20px]" />
          <Skeleton className="ml-1 mt-1 w-[25vw] h-3" />
        </div>
      </div>
      <main className="flex-grow overflow-y-auto">
        <div className="flex flex-col pt-2">
          <Skeleton className="w-full h-[60vh] rounded-none" />
          <div className="px-4 flex flex-col">
            <div className="flex items-center my-[10px]">
              <button className="focus:outline-none">
                <HeartIcon className="size-[28px] text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
              <button className="focus:outline-none">
                <MessageCircle className="size-[28px] ml-[14px] text-gray-500 hover:text-gray-600 cursor-pointer" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-3 w-[35%] mb-2" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpOnePostSkeleton;
