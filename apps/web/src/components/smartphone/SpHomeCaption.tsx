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
        fullCaption ? "" : "truncate"
      } text-base hover:cursor-pointer`}
      onClick={onClickCaption}
    >
      {caption}
    </p>
  );
};

export default SpHomeCaption;
