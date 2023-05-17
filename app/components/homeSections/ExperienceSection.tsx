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
import { staggerContainer } from "@/libs/motions";

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
      <div className="max-w-6xl md:min-w-[1000px] w-3/4 md:w-2/3 flex">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1, 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex-1 flex flex-col justify-center text-neutral-800 hover:text-neutral-400"
          onMouseLeave={() => {
            setImgShow(false);
          }}
          onMouseMove={onMouseMove}
        >
          {experiences.map((item) => (
            <Item key={item.title} {...item} onHover={onHover} />
          ))}
        </motion.div>
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
      className="w-full h-20 md:h-28 border-b border-black z-40
      cursor-pointer flex justify-between items-center relative
      hover:text-neutral-800 hover:h-36 transition-all duration-300 ease-in-out"
      onMouseOver={() => {
        onHover(title);
      }}
      onClick={() => {
        onHover(title);
      }}
    >
      <div>
        <p className="text-2xl md:text-4xl mb-6">{title}</p>
        <p className="absolute bottom-2 md:text-lg text-neutral-500 truncate w-[calc(100%-8rem)]">
          {desc}
        </p>
      </div>
      <p className="absolute right-4 bottom-2 md:text-xl text-neutral-500">
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
  const ref = useRef(null);
  // useEffect(() => {
  //   animate(ref.current, { opacity: [0.3, 0.9] }, { duration: 1.2 });
  // }, [src]);

  return (
    <motion.img
      ref={ref}
      animate={
        imgShow
          ? {
              opacity: 0.9,
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
