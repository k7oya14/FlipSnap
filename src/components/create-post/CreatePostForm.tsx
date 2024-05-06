"use client";

import { createPost } from "@/lib/actions";
import React from "react";
import { useFormState } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CardContent, CardHeader } from "../ui/card";
import { AutosizeTextarea } from "../ui/autosizeTextarea";
import { Roboto_Slab } from "next/font/google";
import { Camera } from "lucide-react";
import PostButton from "./PostButton";
import CropImage from "./CropImage";
import { DialogContent } from "../ui/dialog";

const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

function CreatePostForm({ userId }: { userId: string }) {
  const initialState = {
    message: "",
    errors: { imgFront: [], imgBack: [], caption: [] },
  };
  const createPostWithId = createPost.bind(null, userId);
  const [state, dispatch] = useFormState(createPostWithId, initialState);

  const [imgFront, setImgFront] = React.useState<Blob | undefined>();
  const [imgBack, setImgBack] = React.useState<Blob | undefined>();
  return (
    <div className={robotoSlab.className}>
      <CardHeader className="flex items-center">
        <h1 className="text-xl">Create Post</h1>
        <Camera className="w-8 h-8 text-black" />
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <form
          action={(formData) => {
            if (!imgFront || !imgBack) return;
            formData.set("imgFront", imgFront);
            formData.set("imgBack", imgBack);
            dispatch(formData);
          }}
          className="w-full"
        >
          <div className="mb-4">
            <Label className="ml-[2px]" htmlFor="imgFront">
              Front Image
            </Label>
            <CropImage setCroppedImage={setImgFront} front={true} />
            <div id="imgFront-error" aria-live="polite" aria-atomic="true">
              {state.errors?.imgFront &&
                state.errors.imgFront.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <Label className="ml-[2px]" htmlFor="imgBack">
              Back Image
            </Label>

            <CropImage setCroppedImage={setImgBack} front={false} />
            <div id="imgBack-error" aria-live="polite" aria-atomic="true">
              {state.errors?.imgBack &&
                state.errors.imgBack.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <Label className="ml-[2px]" htmlFor="caption">
              Caption
            </Label>
            <AutosizeTextarea
              placeholder="Write a caption..."
              maxHeight={300}
              name="caption"
              id="caption"
              className="min-h-[50px] border border-slate-400 p-2 focus-visible:ring-transparent focus:border-[1.3px]"
              aria-describedby="caption-error"
            />
            <div id="caption-error" aria-live="polite" aria-atomic="true">
              {state.errors?.caption &&
                state.errors.caption.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <PostButton imgFront={imgFront} imgBack={imgBack} />
        </form>
      </CardContent>
    </div>
  );
}

export default CreatePostForm;
