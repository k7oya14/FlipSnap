import React from "react";
import { Skeleton } from "../ui/skeleton";

const SpHomeSkeleton = () => {
  return [...Array(3)].map((_, i) => (
    <Skeleton className="m-2 w-full aspect-square" key={i} />
  ));
};

export default SpHomeSkeleton;
