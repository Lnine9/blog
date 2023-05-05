"use client";
import { motion } from "framer-motion";
import { staggerContainer } from "@/libs/motions";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer(0.4, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`w-full h-full`}
      >
        <div className="hash-span h-0" id={idName}>
          &nbsp;
        </div>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
