import React from "react";
import SpOnePostSkeleton from "./SpOnePostSkeleton";
import DetailSkeleton from "./DetailSkeleton";

const DetailModalLoading = () => {
  return (
    <>
      <div className="hidden sm:block max-w-5xl w-[90%] max-h-[600px] h-[83vh] mx-auto my-2">
        <DetailSkeleton />
      </div>
      <div className="sm:hidden flex flex-col">
        <SpOnePostSkeleton />
      </div>
    </>
  );
};

export default DetailModalLoading;
