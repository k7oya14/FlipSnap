import React, { Suspense } from "react";

import HomeLoading from "@/components/skeleton/HomeLoading";
import Home from "@/components/home/Home";
import Hero from "@/components/home/Hero";

export default async function Page() {
  return (
    <>
      <div className="hidden sm:block relative">
        <Hero />
      </div>
      <Suspense fallback={<HomeLoading />}>
        <Home />
      </Suspense>
    </>
  );
}
