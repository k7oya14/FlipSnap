import React from "react";
import { Skeleton } from "../ui/skeleton";

const HomeSkeleton = () => {
  return (
    <div className="lg:px-40 px-5 flex">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-1/3 p-2">
          <Skeleton className="w-full h-[100vh]" />
        </div>
      ))}
    </div>
  );
};

export default HomeSkeleton;
