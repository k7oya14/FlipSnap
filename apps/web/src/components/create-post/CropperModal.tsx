import React, { useState, useEffect } from "react";
import Cropper, { Area } from "react-easy-crop";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";

type Props = {
  aspectRatio: number;
  crop: {
    x: number;
    y: number;
  };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onClose: () => void;
  imgSrc: string;
  showCroppedImage: () => void;
};

const CropperModal: React.FC<Props> = ({
  aspectRatio,
  crop,
  setCrop,
  onCropComplete,
  setZoom,
  zoom,
  onClose,
  imgSrc,
  showCroppedImage,
}) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRendered(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full h-full flex justify-center flex-col ">
      <div className="relative w-full h-[50vh] min-h-[170px] sm:min-h-[350px] bg-transparent mt-4 mb-2">
        {rendered ? (
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
          />
        ) : (
          <Skeleton className="w-full h-[50vh] min-h-[170px] sm:min-h-[350px] mt-4 mb-2" />
        )}
      </div>
      <DialogFooter>
        <Button className="" onClick={onClose}>
          Close
        </Button>
        <Button
          className="mb-1 sm:mb-0"
          onClick={() => {
            onClose();
            showCroppedImage();
          }}
        >
          OK
        </Button>
      </DialogFooter>
    </div>
  );
};

export default CropperModal;
