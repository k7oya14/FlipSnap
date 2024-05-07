import CreatePostForm from "@/components/create-post/CreatePostForm";
import InterceptedDialogContent from "@/components/ui/InterceptedDialogContent";
import { Dialog, DialogOverlay } from "@/components/ui/dialog";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function InterceptedPageAsModal() {
  const session = await auth();
  if (!session) {
    redirect("/profile/error");
  }
  return (
    <Dialog open>
      <DialogOverlay>
        <InterceptedDialogContent className="max-w-[90vw] w-96 max-h-5/6 rounded-md shadow-xl">
          <CreatePostForm userId={session.user.id} />
        </InterceptedDialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
