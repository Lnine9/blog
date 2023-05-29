import React from "react";
import { DOCS, Item } from "@/app/works/list";
import Image from "next/image";
import ReactIcon from "@/public/react.svg";
import Link from "next/link";

const Item = (props: Item) => (
  <Link
    href={"/works/" + props.path}
    className="
    flex
    flex-col
    md:flex-row
    gap-4
    md:w-3/4
    items-center
    shadow-2xl
    shadow-neutral-300
    bg-white
    hover:bg-neutral-800
    hover:text-white
    transition-colors ease-in-out
    p-4
    md:p-0
    rounded-lg
    md:rounded-none
    "
  >
    <img
      src={props.img || ReactIcon}
      width={380}
      height={220}
      alt={props.title}
      className="
      bg-neutral-700
      "
      style={{ objectFit: "cover", height: "220px" }}
    />
    <div className="flex-1 mx-8 py-4 max-w-[380px] md:max-w-auto">
      <h2 className="text-2xl whitespace-pre-wrap mb-2">{props.title}</h2>
      <p className="text-neutral-500 whitespace-pre-wrap">
        {props.description}
      </p>
    </div>
  </Link>
);

const Page = () => {
  return (
    <div className="w-full px-8 my-8 flex flex-col items-center gap-10 pb-20">
      {DOCS.map((item) => (
        <Item {...item} key={item.path} />
      ))}
    </div>
  );
};

export default Page;
