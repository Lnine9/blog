"use client";
import React, { useState } from "react";
import SectionWrapper from "@/app/components/hocs/SectionWrapper";
import { motion, useAnimate } from "framer-motion";
import Image from "next/image";
import { staggerContainer } from "@/libs/motions";
import useAsyncEffect from "@/app/hooks/utils";
import { Item, items } from "./skills";
import SectionTitle from "@/app/components/homeSections/SectionTitle";
import { BsCodeSlash } from "react-icons/bs";

const SkillSection = () => {
  const [isFront, setFront] = useState<boolean>(true);

  const [scope, animate] = useAnimate();

  useAsyncEffect(async () => {
    if (!isFront) {
      await animate(
        "#skill-switch",
        {
          top: 0,
          bottom: "auto",
          height: "100%",
        },
        { duration: 0.3, ease: "easeInOut" }
      );
      animate(".skill-front-skill", {
        visibility: "hidden",
      });
      await animate(
        "#skill-box",
        { bottom: 0, top: "auto" },
        { duration: 0.3 }
      );
      animate(".skill-back-skill", {
        visibility: "visible",
      });

      await animate(
        "#skill-switch",
        {
          height: "6rem",
        },
        { duration: 0.2, ease: "easeInOut" }
      );
    } else {
      await animate(
        "#skill-switch",
        {
          height: "100%",
        },
        { duration: 0.3, ease: "easeInOut" }
      );
      animate(".skill-back-skill", {
        visibility: "hidden",
      });

      animate("#skill-box", { top: 0, bottom: "auto" });

      await animate(
        "#skill-switch",
        {
          bottom: 0,
          top: "auto",
        },
        { duration: 0.3 }
      );
      animate(".skill-front-skill", {
        visibility: "visible",
      });

      await animate(
        "#skill-switch",
        {
          height: "6rem",
        },
        { duration: 0.2, ease: "easeInOut" }
      );
    }
  }, [isFront]);

  return (
    <div className="w-full h-full flex flex-col items-center shadow-2x">
      <SectionTitle className="mt-20 mb-14 md:mb-36">
        <BsCodeSlash className="text-green-700" />
        My Skills
      </SectionTitle>
      <div
        ref={scope}
        className="w-[21rem] h-[34rem] md:w-[60rem] md:h-[26rem] relative bg-neutral-800"
      >
        <motion.div
          id="skill-box"
          className="w-full grid gap-[1px] absolute
           md:h-[40rem] md:grid-cols-6 md:grid-rows-4
           h-[56rem] grid-cols-3 grid-rows-8"
          variants={staggerContainer(0.05, 0.4)}
          initial="hidden"
          whileInView="show"
        >
          {items.map((t) => (
            <Item key={t.title} {...t} />
          ))}
        </motion.div>
        <motion.div
          className=" h-24 w-full bottom-0 z-50 bg-neutral-800 absolute cursor-pointer"
          id="skill-switch"
          onClick={() => {
            setFront(!isFront);
          }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <span
              className={`${
                isFront
                  ? "text-white text-lg md:text-3xl"
                  : "text-neutral-500 text-1xl"
              } skill-front transition duration-600 ease-in-out`}
            >
              Front-End
            </span>
            <span className="text-neutral-400 text-1xl mx-2">/</span>
            <span
              className={`${
                !isFront
                  ? "text-white text-lg md:text-3xl"
                  : "text-neutral-500 text-1xl"
              } skill-back transition duration-600 ease-in-out`}
            >
              Back-End
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Item = ({ img, title, desc, type = "front" }: Item) => {
  const variants = {
    hidden: {
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
    show: {
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

  return (
    <motion.div
      className={`bg-white flex flex-col justify-center items-center relative drop-shadow-xl ${
        type === "back"
          ? "row-span-2 skill-back-skill invisible"
          : "skill-front-skill"
      }`}
      whileHover={{
        x: -10,
        y: type === "back" ? 10 : -10,
        transition: { type: "spring" },
      }}
      variants={variants}
    >
      <Image
        width={64}
        height={64}
        className="w-[48px] h-[48px] md:w-[64px] md:h-[64px]"
        src={img}
        alt={title}
      ></Image>
      <p className="text-sm md:text-lg mt-2 text-neutral-500 font-clash">
        {title}
      </p>
    </motion.div>
  );
};

export default SectionWrapper(SkillSection, "skills");
