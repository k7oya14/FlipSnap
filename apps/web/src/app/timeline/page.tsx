import Home from "@/components/home/Home";
import HomeLoading from "@/components/skeleton/HomeLoading";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<HomeLoading />}>
      <Home timeline={true} />
    </Suspense>
  );
};

export default Page;
