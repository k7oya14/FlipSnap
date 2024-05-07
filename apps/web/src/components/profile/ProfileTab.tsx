import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileGallery } from "./ProfileGallery";
import { UserInfo, UserRelationship } from "@/lib/definitions";
import { Suspense } from "react";
import ProfileGallerySkeleton from "../skeleton/ProfileGallerySkeleton";

type Props = {
  userInfo: UserInfo;
  myId: string | undefined;
  relationship: UserRelationship;
};

const ProfileTab = (props: Props) => {
  const { userInfo, myId, relationship } = props;
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-[#f0f0f0] border-neutral-300 sm:border">
        <TabsTrigger value="posts" className="sm:font-semibold">
          Posts
        </TabsTrigger>
        <TabsTrigger value="likes" className="sm:font-semibold">
          Likes
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Suspense fallback={<ProfileGallerySkeleton />}>
          <ProfileGallery
            userInfo={userInfo}
            myId={myId}
            relationship={relationship}
          />
        </Suspense>
      </TabsContent>
      <TabsContent value="likes">
        <Suspense fallback={<ProfileGallerySkeleton />}>
          <ProfileGallery
            likes={true}
            userInfo={userInfo}
            myId={myId}
            relationship={relationship}
          />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTab;
