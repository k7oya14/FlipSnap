"use client";

import React, { CSSProperties } from "react";
import ReactFlipCard from "reactjs-flip-card";

type Props = {
  containerStyle: CSSProperties | undefined;
  frontComponent: JSX.Element;
  backComponent: JSX.Element;
};

const FlipImage = (props: Props) => {
  const { containerStyle, frontComponent, backComponent } = props;
  return (
    <ReactFlipCard
      flipTrigger={"onClick"}
      containerStyle={containerStyle}
      direction="horizontal"
      frontComponent={frontComponent}
      backComponent={backComponent}
    />
  );
};

export default FlipImage;
