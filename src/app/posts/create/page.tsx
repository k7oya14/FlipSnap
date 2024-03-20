import CreatePostForm from "@/components/CreatePostForm";
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
      <Card
        className={`mx-auto p-3 max-w-5xl w-96 flex flex-col justify-center items-center border-slate-300`}
      >
        <CreatePostForm userId={session.user.id} />
      </Card>
    </div>
  );
};

export default page;
