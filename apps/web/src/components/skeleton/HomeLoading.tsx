import React from "react";
import SpHomeSkeleton from "./SpHomeSkeleton";
import HomeSkeleton from "./HomeSkeleton";

const HomeLoading = () => {
  return (
    <>
      <div className="sm:hidden block">
        <SpHomeSkeleton />
      </div>
      <div className="hidden sm:flex flex-col justify-center items-center">
        <HomeSkeleton />
      </div>
    </>
  );
};

export default HomeLoading;
