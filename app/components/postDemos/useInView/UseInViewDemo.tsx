"use client";
import React, { useRef } from "react";
import { useInView } from "@/app/hooks/useInView";

const Demo = () => {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const isAInView = useInView(a, {
    rootMargin: "-100px 0px 400px 0px",
    threshold: [1],
  });
  const isBInView = useInView(b, {
    rootMargin: "-400px 0px -400px 0px",
    once: true,
  });
  const isContainer = useInView(container);

  return (
    <div
      ref={container}
      className="h-[2000px] flex items-center gap-4 relative"
    >
      <div
        style={{ visibility: isContainer ? "visible" : "hidden" }}
        className="fixed top-20 left-1/2 w-20 bg-neutral-700 bg-opacity-60 text-white"
      >
        <p>{isAInView ? "A is inView" : "A is not inView"}</p>
        <p>{isBInView ? "B is inView" : "B is not inView"}</p>
      </div>
      <div
        ref={a}
        className="w-[200px] h-[200px] bg-emerald-500
         flex justify-center items-center text-3xl"
      >
        A
      </div>
      <div
        ref={b}
        className="w-[200px] h-[200px] bg-rose-500
         flex justify-center items-center text-3xl"
      >
        B
      </div>
    </div>
  );
};

export default Demo;
