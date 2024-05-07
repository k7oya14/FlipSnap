import React from "react";
import ProfileInformation from "./ProfileInformation";
import ErrorCard from "../ErrorCard";
import { auth } from "@/lib/auth";
import { fetchUserByUsername, fetchUserRelationship } from "@/lib/fetch";
import { UserRelationship } from "@/lib/definitions";
import ProfileTab from "./ProfileTab";

type Props = {
  username: string;
};

const Profile = async (props: Props) => {
  const { username } = props;
  const userInfo = await fetchUserByUsername(username);
  if (!userInfo?.id) {
    return (
      <ErrorCard
        heading="User not found"
        message="お探しのユーザーが見つかりませんでした"
        button="Go Home"
        link="/"
      />
    );
  }
  const session = await auth();
  let relationship = UserRelationship.NoSession;
  if (session) {
    relationship = await fetchUserRelationship(session?.user.id, userInfo.id);
  }
  return (
    <>
      <ProfileInformation
        userInfo={userInfo}
        myId={session?.user.id}
        relationship={relationship}
      />
      <div className="sm:py-4 mx-2">
        <ProfileTab
          userInfo={userInfo}
          myId={session?.user.id}
          relationship={relationship}
        />
      </div>
    </>
  );
};

export default Profile;
