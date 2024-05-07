import DetailPost from "@/components/detail/DetailPost";
import DetailLoading from "@/components/skeleton/DetailLoading";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="sm:max-w-5xl sm:w-[90%] sm:max-h-[600px] sm:h-[83vh] sm:mx-auto sm:my-2 sm:bg-neutral-100 sm:rounded-lg">
      <Suspense fallback={<DetailLoading />}>
        <DetailPost postId={params.id} />
      </Suspense>
    </div>
  );
};

export default Page;
