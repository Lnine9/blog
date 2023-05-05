"use client";
import React, { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/app/components/hocs/SectionWrapper";
import FavouriteCanvas from "@/app/components/homeSections/FavouriteCanvas";
import { useInView } from "framer-motion";
import {
  BsCaretLeftFill,
  BsCaretRightFill,
  BsFillHeartFill,
} from "react-icons/bs";
import { motion } from "framer-motion";

const FavouriteSection = () => {
  const ref = useRef<any>(null);

  const inView = useInView(ref, {
    margin: "-400px 0px -400px 0px",
    once: true,
  });

  const [index, setIndex] = useState<number>(-1);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inView) {
      setIndex(0);
    }
  }, [inView]);

  return (
    <div className="w-full h-full relative" ref={ref}>
      <div
        className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]
       flex z-20 w-3/4 justify-between items-center pointer-events-none"
      >
        <button
          className="text-7xl w-[100px] h-[100px] bg-neutral-700 text-white hover:bg-neutral-900 disabled:bg-neutral-400 rounded-full
          flex items-center justify-center transition-colors ease-in-out opacity-80 shadow-xl pointer-events-auto"
          disabled={loading || index <= 0}
          onClick={() => {
            setIndex(index - 1);
          }}
        >
          <BsCaretLeftFill />
        </button>
        <button
          className="text-7xl w-[100px] h-[100px] bg-neutral-700 text-white hover:bg-neutral-900 disabled:bg-neutral-400 rounded-full
          flex items-center justify-center transition-colors ease-in-out opacity-80 shadow-xl pointer-events-auto"
          disabled={loading || index >= 2}
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          <BsCaretRightFill />
        </button>
      </div>
      <motion.div
        initial={{ x: -400 }}
        animate={inView && { x: 20 }}
        transition={{ type: "spring", duration: 1 }}
        className="text-3xl text-rose-600 font-bold absolute top-4 z-20
        py-2 px-3 bg-white border-2 border-neutral-800 rounded-3xl flex items-center"
      >
        My Favourites&nbsp;
        <BsFillHeartFill />
      </motion.div>
      <div className="w-full h-full">
        <FavouriteCanvas index={index} setLoading={setLoading} />
      </div>
    </div>
  );
};

export default SectionWrapper(FavouriteSection, "favourite");
