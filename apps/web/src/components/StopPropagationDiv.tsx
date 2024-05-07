"use client";

import React, { ReactNode } from "react";

const StopPropagationDiv = ({ children }: { children: ReactNode }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default StopPropagationDiv;
