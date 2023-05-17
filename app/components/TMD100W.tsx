import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const vars = {
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 6 },
  },
  hidden: {
    opacity: 0,
    scale: 0,
  },
};

const TMD100W = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <motion.button className="hidden md:block absolute right-24 bottom-32 w-20 h-20 bg-neutral-600 text-4xl rounded-full text-neutral-900">
        <motion.div
          onClick={() => {
            setShow(!show);
          }}
          title="这是什么？点一下"
          className="m-0 w-full h-full flex justify-center items-center text-5xl font-bold"
          whileHover={{
            scale: 1.4,
            transition: { type: "spring", damping: 6 },
          }}
        >
          {show ? "×" : "?"}
        </motion.div>
      </motion.button>
      <motion.div
        className="absolute z-40 right-0 bottom-0 pointer-events-none text-4xl text-white"
        variants={vars}
        animate={show ? "show" : "hidden"}
      >
        <Image
          width={550}
          height={900}
          src="/images/TMD100W.png"
          alt="TMD100万匹力量，海虎爆破拳啊！"
        />
      </motion.div>
      <motion.div
        className="absolute z-50 top-12 right-8 text-5xl text-[#5a4d9a] font-bold flex flex-col items-center bg-yellow-500 p-2"
        variants={vars}
        animate={show ? "show" : "hidden"}
      >
        <div>是</div>
        <div>T</div>
        <div>M</div>
        <div>D</div>
        <div>海</div>
        <div>虎</div>
        <div>爆</div>
        <div>破</div>
        <div>拳</div>
        <div>啊</div>
        <div>!!</div>
      </motion.div>
    </>
  );
};

export default TMD100W;
