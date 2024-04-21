import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { UserInfo, UserRelationship } from "@/lib/definitions";
import FollowStatusButton from "./FollowStatusButton";
import Link from "next/link";

type Props = {
  userInfo: UserInfo;
  myId: string | null | undefined;
  relationship: UserRelationship;
};

const ProfileInformation = (props: Props) => {
  const { userInfo, myId, relationship } = props;
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Avatar className="w-28 h-28">
        <AvatarImage src={userInfo.image!} />
        <AvatarFallback>{userInfo.name}</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold mt-4">{userInfo.name}</h2>
      <p className="font-medium mt-1">@{userInfo.username}</p>
      <p className="mt-2">{userInfo.bio}</p>
      <FollowStatusButton
        myId={myId!}
        userId={userInfo.id!}
        relationship={relationship}
      />
      <div className="flex items-center justify-center space-x-5 mt-2">
        <div className="text-center">
          <span className="block font-bold">{userInfo._count?.posts}</span>
          <span className="block text-sm">
            &nbsp;&nbsp;&nbsp;&nbsp;Posts&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
        <Link
          prefetch={true}
          href={`/profile/${userInfo.username}/follower`}
          className="text-center"
        >
          <span className="block font-bold">{userInfo._count?.followedBy}</span>
          <span className="block text-sm">Followers</span>
        </Link>
        <Link
          prefetch={true}
          href={`/profile/${userInfo.username}/following`}
          className="text-center"
        >
          <span className="block font-bold">{userInfo._count?.following}</span>
          <span className="block text-sm">Following</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInformation;
