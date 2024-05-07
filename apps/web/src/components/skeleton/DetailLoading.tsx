import React from "react";
import SpOnePostSkeleton from "./SpOnePostSkeleton";
import DetailSkeleton from "./DetailSkeleton";

const DetailLoading = () => {
  return (
    <>
      <div className="hidden sm:block relative">
        <DetailSkeleton />
      </div>
      <div className="sm:hidden flex flex-col dialog-scroll w-full overflow-y-scroll">
        <SpOnePostSkeleton />
      </div>
    </>
  );
};

export default DetailLoading;
