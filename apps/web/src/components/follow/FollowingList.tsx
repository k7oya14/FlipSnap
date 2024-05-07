import React from "react";
import { fetchFollows } from "@/lib/fetch";
import { MoveRight, UserRoundX } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  username: string;
};
const FollowingList = async (props: Props) => {
  const { username } = props;
  const followings = await fetchFollows(username);

  return followings.length === 0 ? (
    <div className="m-4 flex flex-col items-center justify-center">
      <UserRoundX className="w-20 h-20" />
      <p className="font-bold">No following</p>
    </div>
  ) : (
    followings.map((following, index) => (
      <Link
        key={following.username}
        href={`/profile/${following.username}`}
        prefetch={true}
        className={`flex items-center justify-between ${
          followings.length === index + 1 || "border-b border-gray-200"
        } py-2`}
      >
        <div className="flex items-center space-x-4">
          <Avatar className="size-[50px]">
            <AvatarImage src={following.image || "/default_icon.png"} />
            <AvatarFallback>{following.name}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold">{following.name}</h1>
            <p className="text-gray-600 text-sm">{following.username}</p>
          </div>
        </div>
        <MoveRight className="w-6 h-6 text-gray-400 hover:text-gray-500 transition-transform transform-gpu hover:translate-x-1 duration-200" />
      </Link>
    ))
  );
};

export default FollowingList;
