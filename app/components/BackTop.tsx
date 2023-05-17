"use client";
import React from "react";
import { motion, MotionConfig, useAnimationControls } from "framer-motion";
import { HiOutlinePaperAirplane } from "react-icons/hi";

const BackTop = () => {
  const ctrl = useAnimationControls();

  const toTop = async () => {
    await ctrl.start(
      { y: [0, 35, -200], scale: [0.9, 1, 0.2] },
      { ease: "easeIn", duration: 0.6 }
    );
    await ctrl.start(
      { y: [200, 0], scale: [0.2, 1] },
      { ease: "easeOut", duration: 0.6 }
    );
    document.querySelector("#about-container")!.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 200 }}>
      <motion.button
        className="bg-white text-9xl rounded-full text-neutral-900 overflow-hidden"
        whileHover={{
          scale: 0.85,
        }}
        onClick={toTop}
      >
        <motion.div
          className="flex justify-center items-center w-64 h-64"
          whileHover={{
            scale: 0.9,
          }}
          animate={ctrl}
        >
          <HiOutlinePaperAirplane />
        </motion.div>
      </motion.button>
    </MotionConfig>
  );
};

export default BackTop;
