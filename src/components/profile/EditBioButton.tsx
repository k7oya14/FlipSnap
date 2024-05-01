"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { AutosizeTextarea } from "../ui/autosizeTextarea";
import { Roboto_Slab } from "next/font/google";
import { useFormState } from "react-dom";
import { updateBio } from "@/lib/actions";

const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

type Props = {
  myId: string | undefined | null;
  bio: string | undefined;
};

const EditBioButton = (props: Props) => {
  const { myId, bio } = props;

  const [currentBio, setCurrentBio] = useState(bio);
  const initialState = {
    message: "",
    errors: { bio: [] },
  };
  const updateBioWithId = updateBio.bind(null, myId!);
  const [state, dispatch] = useFormState(updateBioWithId, initialState);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-1 h-5 sm:px-2 sm:h-6 bg-neutral-200 text-black border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-300 text-xs font-normal">
          Edit{bio?.length == 0 ? " Bio" : ""}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${robotoSlab.className} max-w-[90vw] w-[500px] rounded-lg`}
      >
        <DialogHeader>
          <DialogTitle className="mx-auto text-2xl p-0">Edit bio</DialogTitle>
        </DialogHeader>
        <form action={dispatch}>
          <div className="grid gap-4 py-2">
            <AutosizeTextarea
              id="bio"
              name="bio"
              placeholder="Bio"
              value={currentBio}
              onChange={(e) => setCurrentBio(e.target.value)}
              minHeight={100}
              maxHeight={200}
              className="h-[103px] text-base dialog-scroll border-neutral-950 border-[1.9px] resize-none focus-visible:ring-offset-0 focus-visible:ring-1 w-full col-span-3"
            />
          </div>
          <DialogFooter>
            <DialogClose
              type="submit"
              className="bg-neutral-950 mt-2 hover:bg-neutral-900 text-white rounded-lg px-4 py-2 text-sm"
            >
              Save changes
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBioButton;
