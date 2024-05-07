"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";

function SignupButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="group w-full bg-black hover:bg-black text-white"
      aria-disabled={pending}
    >
      <div className="flex items-center justify-center">
        Sign up
        {pending ? (
          <>
            <LoaderCircle className="w-6 h-6 ml-3 animate-spin mr-2" />
          </>
        ) : (
          <ChevronsRight className="w-6 h-6 ml-2 transition-transform transform-gpu group-hover:translate-x-1" />
        )}
      </div>
    </Button>
  );
}

export default SignupButton;
