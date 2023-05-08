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
import SectionTitle from "@/app/components/homeSections/SectionTitle";

const buttonStyle =
  "text-3xl md:text-7xl w-[60px] h-[60px] md:w-[100px] md:h-[100px]" +
  " bg-neutral-700 text-white hover:bg-neutral-900 disabled:bg-neutral-400 rounded-full" +
  " flex items-center justify-center transition-colors ease-in-out opacity-80" +
  " shadow-xl pointer-events-auto";

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
      <div className="absolute left-1/2 top-12 translate-x-[-50%]">
        <SectionTitle>
          <BsFillHeartFill className="text-rose-600 text-3xl" />
          My Favourites
        </SectionTitle>
      </div>
      <div
        className="absolute left-1/2 bottom-24 md:top-1/2 translate-x-[-50%] translate-y-[-30%]
       flex z-20 w-3/4 md:w-1/2 md:min-w-[560px] justify-between items-center pointer-events-none"
      >
        <button
          className={buttonStyle}
          disabled={loading || index <= 0}
          onClick={() => {
            setIndex(index - 1);
          }}
        >
          <BsCaretLeftFill />
        </button>
        <button
          className={buttonStyle}
          disabled={loading || index >= 2}
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          <BsCaretRightFill />
        </button>
      </div>
      <div className="w-full h-full">
        <FavouriteCanvas index={index} setLoading={setLoading} />
      </div>
    </div>
  );
};

export default SectionWrapper(FavouriteSection, "favourite");
