"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { updateUsername } from "@/lib/actions";
import { useFormState } from "react-dom";

export function SignupForm({ userId }: { userId: string }) {

  const initialState = { message: "", errors: { username: [] } };
  const updateUsernameWithId = updateUsername.bind(null, userId);
  const [state, dispatch] = useFormState(updateUsernameWithId, initialState);
  return (
    <div className="m-4 flex items-center justify-center">
      <form action={dispatch} className="w-96">
        <div className="rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p>Please enter your username.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="ml-2 font-bold">Username</h1>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                required
                aria-describedby="username-error"
                className="w-full border border-gray-200 rounded-lg p-2 focus-visible:ring-transparent focus:outline-none focus:border-gray-800 focus:border-[1.4px] shadow-sm"
                style={{ outline: "none" }}
              />
              <div id="username-error" aria-live="polite" aria-atomic="true">
                {state.errors?.username &&
                  state.errors.username.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <Button
              type="submit"
              className="group w-full bg-black hover:bg-black text-white"
            >
              <div className="flex items-center justify-center">
                Sign up
                <ChevronDoubleRightIcon className="w-6 h-6 ml-2 transition-transform transform-gpu group-hover:translate-x-1" />
              </div>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
