"use client";

import React from "react";
import { isMobile } from "react-device-detect";

const page = () => {
  return <div>{isMobile ? <p>mobile</p> : <p>notmobile</p>}</div>;
};

export default page;
