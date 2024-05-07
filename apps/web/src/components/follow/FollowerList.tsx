import React from "react";
import { fetchFollowers } from "@/lib/fetch";
import { MoveRight, UserRoundX } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  username: string;
};

const FollowerList = async (props: Props) => {
  const { username } = props;
  const followers = await fetchFollowers(username);
  return followers.length === 0 ? (
    <div className="m-4 flex flex-col items-center justify-center">
      <UserRoundX className="w-20 h-20" />
      <p className="font-bold">No following</p>
    </div>
  ) : (
    followers.map((follower, index) => (
      <Link
        prefetch={true}
        href={`/profile/${follower.username}`}
        key={follower.username}
        className={`flex items-center justify-between ${
          followers.length === index + 1 || "border-b border-gray-200"
        } py-2`}
      >
        <div className="flex items-center space-x-4">
          <Avatar className="size-[50px]">
            <AvatarImage src={follower.image || "/default_icon.png"} />
            <AvatarFallback>{follower.name}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold">{follower.name}</h1>
            <p className="text-gray-600 text-sm">{follower.username}</p>
          </div>
        </div>
        <MoveRight className="w-6 h-6 text-gray-400 hover:text-gray-500 transition-transform transform-gpu hover:translate-x-1 duration-200" />
      </Link>
    ))
  );
};

export default FollowerList;
