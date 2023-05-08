"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import SectionWrapper from "@/app/components/hocs/SectionWrapper";
import SectionTitle from "@/app/components/homeSections/SectionTitle";
import { BsFilm } from "react-icons/bs";
import {
  Experience,
  experiences,
} from "@/app/components/homeSections/experiences";
import {
  animate,
  motion,
  MotionValue,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import useMeasure from "react-use-measure";
import { throttle } from "@/libs/func";
import Image from "next/image";
import useAsyncEffect from "@/app/hooks/utils";

const ExperienceSection = () => {
  const [hoverImg, setHoverImg] = useState<string>("");
  const [imgShow, setImgShow] = useState<boolean>(false);
  const onHover = (title: string) => {
    setHoverImg(experiences.find((t) => t.title === title)?.img || "");
  };
  const [ref, bounds] = useMeasure();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const X = useMotionValue(0);
  const Y = useMotionValue(0);

  const onMouseMove = (e) => {
    if (!imgShow) {
      setImgShow(true);
    }
    mouse.current = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };
    mouse.current.x = transform(
      [0, bounds.width],
      [180, bounds.width - 180]
    )(mouse.current.x);
    mouse.current.y = transform(
      [0, bounds.height],
      [135, bounds.height - 135]
    )(mouse.current.y);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let targetX = mouse.current.x - 180;
      let targetY = mouse.current.y - 135;
      const nextX = X.get() + (targetX - X.get()) * 0.05;
      const nextY = Y.get() + (targetY - Y.get()) * 0.05;
      X.set(nextX);
      Y.set(nextY);
    }, 20);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <SectionTitle className="mt-12 mb-14">
        <BsFilm />
        My Experience
      </SectionTitle>
      <div className="max-w-6xl min-w-[1000px] w-2/3 flex">
        <div
          ref={ref}
          className="flex-1 flex flex-col gap-2 justify-center text-neutral-800 hover:text-neutral-400"
          onMouseLeave={() => {
            setImgShow(false);
          }}
          onMouseMove={onMouseMove}
        >
          {experiences.map((item) => (
            <Item key={item.title} {...item} onHover={onHover} />
          ))}
        </div>
        <MotionImg src={hoverImg} imgShow={imgShow} x={X} y={Y} />
      </div>
    </div>
  );
};

const Item = ({
  title,
  date,
  desc,
  onHover,
}: Experience & { onHover: (title) => void }) => {
  return (
    <div
      className="w-full h-28 border-b border-black z-40
      cursor-pointer flex justify-between items-center relative
      hover:text-neutral-800 hover:h-36 transition-all duration-300 ease-in-out"
      onMouseOver={() => {
        onHover(title);
      }}
    >
      <div>
        <p className="text-4xl mb-6">{title}</p>
        <p className="absolute bottom-2 text-lg">{desc}</p>
      </div>
      <p className="absolute right-4 bottom-2 text-xl text-neutral-500">
        {date}
      </p>
    </div>
  );
};

const MotionImg = ({
  src,
  imgShow,
  x,
  y,
}: {
  src: string;
  imgShow: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) => {
  return (
    <motion.img
      animate={
        imgShow
          ? {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5 },
            }
          : {
              opacity: 0,
              scale: 0.2,
              transition: { duration: 0.5 },
            }
      }
      style={{
        x: x,
        y: y,
      }}
      id="img-cur"
      className="absolute z-[5]"
      width={360}
      height={270}
      src={src}
      alt=""
    />
  );
};

export default SectionWrapper(ExperienceSection, "experience");
