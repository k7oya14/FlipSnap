import React from "react";
import SpOnePostSkeleton from "./SpOnePostSkeleton";

const SpHomeSkeleton = () => {
  return [...Array(2)].map((_, i) => <SpOnePostSkeleton key={i} />);
};

export default SpHomeSkeleton;
