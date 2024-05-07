import React from "react";
import { Skeleton } from "../ui/skeleton";

const DetailSkeleton = () => {
  return (
    <div className="flex">
      <div className="w-[55%] h-[83vh] max-h-[600px] rounded-l-lg bg-neutral-900 border-r border-gray-200 flex justify-center">
        <Skeleton className="w-full h-full rounded-l-lg rounded-r-none" />
      </div>
      <div className="w-[45%] flex flex-col border rounded-r-lg border-gray-200">
        <div className="flex items-center p-2 md:p-4 border-b">
          <div className="flex items-center hover:cursor-pointer">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="ml-3">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-16 h-3 mt-1" />
            </div>
          </div>
        </div>
        <div className="m-2 md:m-4">
          <Skeleton className=" w-full h-4 md:h-5" />
          <Skeleton className="w-full h-4 md:h-5 my-1 md:my-2" />
          <Skeleton className="w-1/3 h-4 md:h-5" />
        </div>
        {/* <div className="flex-grow overflow-y-auto">
	  <div className="flex items-start space-x-3 p-4">
		<Avatar>
		  <AvatarImage
			alt="User avatar"
			src="/placeholder.svg?height=32&width=32"
		  />
		  <AvatarFallback>U</AvatarFallback>
		</Avatar>
		<div>
		  <p className="font-semibold">
			username <span className="font-normal">comment text</span>
		  </p>
		  <p className="text-xs text-gray-500">2d</p>
		</div>
	  </div>
	</div> */}
        {/* <div className="flex items-center justify-between p-4 border-t">
	  <div className="flex space-x-4">
		<HeartIcon className="text-gray-600" />
		<ReplyIcon className="text-gray-600" />
		<SendIcon className="text-gray-600" />
	  </div>
	  <BookmarkIcon className="text-gray-600" />
	</div>
	<div className="px-4 pb-4">
	  <p className="font-semibold">1,234 likes</p>
	  <p className="text-xs text-gray-500">2 days ago</p>
	</div>
	<div className="px-4 pb-4">
	  <Input placeholder="Add a comment..." type="text" />
	</div> */}
      </div>
    </div>
  );
};

export default DetailSkeleton;
