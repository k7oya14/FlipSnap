import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react";
import React, { memo } from "react";

type Props = {
  handleAspectChange: (newAspectRatio: number) => void;
};

const AspectRatioButton = memo(function AspectRatioButton(props: Props) {
  const { handleAspectChange } = props;
  return (
    <div className="w-full">
      <h1 className="mb-2">Image Size</h1>
      <div className="flex items-center justify-center space-x-5">
        <button
          onClick={() => handleAspectChange(3 / 4)}
          className="border shadow-md flex flex-col items-center p-1 size-16 transition duration-100 transform hover:shadow hover:translate-y-[0.5px]"
        >
          <RectangleVertical className="size-10 text-black" />
          <p className="text-sm">3:4</p>
        </button>
        <button
          onClick={() => handleAspectChange(1)}
          className="border shadow-md flex flex-col items-center p-1 size-16 transition duration-100 transform hover:shadow hover:translate-y-[0.5px]"
        >
          <Square className="size-10 text-black" />
          <p className="text-sm">1:1</p>
        </button>
        <button
          onClick={() => handleAspectChange(4 / 3)}
          className="border shadow-md flex flex-col items-center p-1 size-16 transition duration-100 transform hover:shadow hover:translate-y-[0.5px]"
        >
          <RectangleHorizontal className="size-10 text-black" />
          <p className="text-sm">4:3</p>
        </button>
      </div>
    </div>
  );
});

export default AspectRatioButton;
