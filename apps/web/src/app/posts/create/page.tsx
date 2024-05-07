import CreatePostForm from "@/components/create-post/CreatePostForm";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/profile/error");
  }
  return (
    <div className="my-4">
      <Card className={`mx-auto p-3 max-w-[90vw] w-96 border-slate-300`}>
        <CreatePostForm userId={session.user.id} />
      </Card>
    </div>
  );
};

export default page;
