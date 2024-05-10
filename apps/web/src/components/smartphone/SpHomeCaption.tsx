"use client";

import React, { useState } from "react";

const SpHomeCaption = ({ caption }: { caption: string }) => {
  const [fullCaption, setFullCaption] = useState(false);
  const onClickCaption = () => {
    if (!fullCaption) setFullCaption(true);
  };
  return (
    <p
      className={`${
        fullCaption ? "" : "line-clamp-2"
      } text-base hover:cursor-pointer text-left font-medium`}
      onClick={onClickCaption}
    >
      {caption}
    </p>
  );
};

export default SpHomeCaption;
