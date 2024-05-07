import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { UserInfo, UserRelationship } from "@/lib/definitions";
import FollowStatusButton from "./FollowStatusButton";
import Link from "next/link";
import EditBioButton from "./EditBioButton";

type Props = {
  userInfo: UserInfo;
  myId: string | null | undefined;
  relationship: UserRelationship;
};

const ProfileInformation = (props: Props) => {
  const { userInfo, myId, relationship } = props;
  return (
    <div className="flex flex-col sm:flex-row-reverse items-center justify-center sm:pt-8 py-3 pb-4 sm:pb-0 w-full">
      <div className="sm:w-[30%]">
        <Avatar className="size-28 sm:size-[95%]">
          <AvatarImage src={userInfo.image!} />
          <AvatarFallback>{userInfo.name}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-center sm:w-[50%] sm:px-4">
        <h2 className="text-2xl sm:text-5xl text-gray-800 font-bold mt-4 sm:mt-0">
          {userInfo.name}
        </h2>
        <p className="font-medium sm:mt-2">@{userInfo.username}</p>
        <div className="flex items-end space-x-2 sm:mt-1">
          <p className="sm:text-2xl sm:font-semibold text-gray-700 mt-2">
            {userInfo.bio}
          </p>
          {relationship === UserRelationship.Me && (
            <EditBioButton myId={myId} bio={userInfo.bio} />
          )}
        </div>
        <div className="flex items-center justify-center space-x-5 mt-2 sm:mt-6 mb-2">
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
            <span className="block font-bold">
              {userInfo._count?.followedBy}
            </span>
            <span className="block text-sm">Followers</span>
          </Link>
          <Link
            prefetch={true}
            href={`/profile/${userInfo.username}/following`}
            className="text-center"
          >
            <span className="block font-bold">
              {userInfo._count?.following}
            </span>
            <span className="block text-sm">Following</span>
          </Link>
        </div>
        <FollowStatusButton
          myId={myId!}
          userId={userInfo.id!}
          relationship={relationship}
        />
      </div>
    </div>
  );
};

export default ProfileInformation;
