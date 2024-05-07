"use client";

import React, { memo } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

type Props = {
  imgFront: Blob | undefined;
  imgBack: Blob | undefined;
};

const PostButton = memo(function PostButton(props: Props) {
  const { imgFront, imgBack } = props;
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={`w-full border py-0 my-0 rounded-md ${
        imgFront && imgBack
          ? "bg-black text-white border-black hover:bg-gray-800"
          : "bg-gray-400 text-white hover:bg-gray-400 cursor-not-allowed"
      }`}
      aria-disabled={pending}
      disabled={!imgFront || !imgBack}
    >
      {pending ? (
        <>
          <LoaderCircle className="w-6 h-6 animate-spin mr-2" />
          <span>Processing...</span>
        </>
      ) : (
        "Post"
      )}
    </Button>
  );
});

export default PostButton;
