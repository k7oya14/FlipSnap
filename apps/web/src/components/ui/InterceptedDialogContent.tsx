"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { DialogPortal } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const InterceptedDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const router = useRouter();

  const onDismiss = React.useCallback(() => {
    router.back();
  }, [router]);

  return (
    <DialogPortal>
      <DialogPrimitive.Content
        ref={ref}
        onEscapeKeyDown={onDismiss} // Add here
        onPointerDownOutside={onDismiss} // And here
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className={cn(
          "bg-background flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 w-full max-w-6xl translate-x-[-50%] translate-y-[-50%] gap-4 shadow-lg duration-200",
          className
        )}
        {...props}
      >
        {children}
        <button
          onClick={onDismiss}
          className="ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute p-3 right-1 top-1 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
InterceptedDialogContent.displayName = DialogPrimitive.Content.displayName;

export default InterceptedDialogContent;
