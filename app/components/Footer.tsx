"use client";
import React from "react";
import { BiMailSend } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";
import {
  TbBrandNextjs,
  TbBrandTailwind,
  TbBrandThreejs,
  TbBrandFramer,
} from "react-icons/tb";
import TMD100W from "@/app/components/TMD100W";
import BackTop from "@/app/components/BackTop";
const Footer = () => {
  return (
    <footer className="w-full bg-neutral-800 relative overflow-hidden">
      <TMD100W />
      <div
        className="max-w-screen-xl m-auto min-h-[75vh] text-neutral-200
      grid grid-cols-none grid-rows-2 md:grid-rows-none md:grid-cols-2 py-8 px-12"
      >
        <div className="flex justify-center md:justify-start items-end">
          <BackTop />
        </div>
        <div className="flex flex-col justify-between">
          <div
            className="text-neutral-200 text-2xl md:text-3xl mt-24"
            style={{ lineHeight: "3rem" }}
          >
            没什么东西可以展示的了，但是这里有一个 super cool 的按钮！
            <br />
            点一下就可以回到网页顶部捏。
          </div>
          <div>
            <p className="text-sm mb-2">CONTACT ME</p>
            <p className="flex gap-2 items-center">
              <BiMailSend /> 1498613780@qq.com
            </p>
            <p className="flex gap-2 items-center">
              <BsGithub /> https://github.com/Lnine9
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center text-neutral-200 py-3 bg-neutral-700">
        created by Lnine9 with&nbsp;&nbsp;
        <TbBrandNextjs /> next.js |&nbsp;
        <TbBrandTailwind /> tailwindcss |&nbsp;
        <TbBrandThreejs /> react-three-fiber |&nbsp;
        <TbBrandFramer /> framer-motion ...
      </div>
    </footer>
  );
};

export default Footer;
