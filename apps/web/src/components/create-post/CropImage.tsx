"use client";

import React, { useState, useCallback } from "react";
import { Area } from "react-easy-crop";
import CropperModal from "../../components/create-post/CropperModal";
import getCroppedImg from "../../lib/getCroppedImg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";

type Props = {
  setCroppedImage: (blob: Blob) => void;
  front: boolean;
  aspectRatio: number;
};

const CropImage = (props: Props) => {
  const { setCroppedImage, front, aspectRatio } = props;
  /** Cropモーダルの開閉 */
  const [isOpen, setIsOpen] = useState(false);

  /** アップロードした画像URL */
  const [imgSrc, setImgSrc] = useState("");

  /** 画像の拡大縮小倍率 */
  const [zoom, setZoom] = useState(1);

  /** 切り取る領域の情報 */
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  /** 切り取る領域の情報 */
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  /**
   * ファイルアップロード後
   * 画像ファイルのURLをセットしモーダルを表示する
   */
  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (reader.result) {
            setImgSrc(reader.result.toString() || "");
            setIsOpen(true);
          }
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    []
  );

  /**
   * 切り取り完了後、切り取り領域の情報をセット
   */
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  /**
   * 切り取り後の画像を生成し画面に表示
   */
  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <div className="min-w-full flex items-center text-center flex-col">
        <Input
          type="file"
          accept="image/*"
          name={front ? "imgFront" : "imgBack"}
          id={front ? "imgFront" : "imgBack"}
          required
          aria-describedby={front ? "imgFront-error" : "imgBack-error"}
          className="border border-slate-400 p-2"
          onChange={onFileChange}
        />
        <DialogContent className="rounded-lg max-w-[90vw] w-[500px] max-h-[85vh] flex items-center text-center justify-center">
          <CropperModal
            aspectRatio={aspectRatio}
            crop={crop}
            setCrop={setCrop}
            zoom={zoom}
            setZoom={setZoom}
            onCropComplete={onCropComplete}
            onClose={() => setIsOpen(false)}
            imgSrc={imgSrc}
            showCroppedImage={showCroppedImage}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};
export default CropImage;
