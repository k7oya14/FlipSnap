"use client";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

const ModalLink = (props: Props) => {
  const { children, href, className = "" } = props;
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(href);
        router.refresh();
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default ModalLink;
