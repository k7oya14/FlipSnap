import React from "react";
import { MotionDiv } from "../MotionDiv";
import clsx from "clsx";
import Image from "next/image";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

const Hero = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={clsx("hero h-[80vh] w-full overflow-hidden")}
    >
      <div className="relative inset-0 mt-[5vh] h-[70vh] flex items-center justify-center mx-auto px-8">
        <div className={`${robotoSlab.className} w-full max-w-xl text-center`}>
          <MotionDiv
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl font-bold mb-4 relative"
          >
            FlipSnap
          </MotionDiv>
          <MotionDiv
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg"
          >
            Unlock a world of shared moments.
          </MotionDiv>
          <MotionDiv
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-lg"
          >
            Share your favorite memories with friends and family.
          </MotionDiv>
        </div>
        <MotionDiv
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-[85vh]"
        >
          <Image
            width={500}
            height={500}
            unoptimized
            priority={true}
            className="w-[98%] object-contain mx-auto hover:size-[100%] transition-all duration-300 ease-in-out"
            alt="hero image"
            src={"social-media-64.svg"}
          />
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default Hero;
