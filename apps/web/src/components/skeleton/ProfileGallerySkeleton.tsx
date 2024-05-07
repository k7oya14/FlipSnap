import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProfileGallerySkeleton = () => {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 mx-3 sm:mx-4 gap-1 sm:gap-2 sm:mt-4">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="w-full aspect-square" />
      ))}
    </div>
  );
};

export default ProfileGallerySkeleton;
