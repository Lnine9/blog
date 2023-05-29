"use client";
import React, { useCallback } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { MenuPath } from "@/app/consts/menu";
import Link from "next/link";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  active = false,
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`
        px-5
        py-2
        my-1
        min-h-[3.5rem]
        text-neutral-700
        hover:bg-neutral-200
        transition-colors
        ease-in-out
        rounded-lg
        duration-300
        cursor-pointer
        flex
        items-center
        ${active ? "bg-neutral-200" : ""}
        ${active ? "font-bold" : ""}
      `}
        title={label}
      >
        {label}
      </div>
    </>
  );
};

interface SideBarProps {
  paths: {
    slug: string;
    title: string;
  }[];
}

const SideBar = ({ paths }: SideBarProps) => {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const jump = useCallback(
    (slug: string) => {
      router.push(`/${MenuPath.POST}/${slug}`);
    },
    [router]
  );
  return (
    <div
      className="
      hidden
      md:flex
      flex-col
      w-64
      min-w-[16rem]
      pl-4
      pr-1
      py-4
      top-[calc(theme(height.navh))]
      h-[calc(100vh-theme(height.navh))]
      overflow-y-scroll
      sticky
      bg-white
      z-10
      "
    >
      <Link
        className="bg-neutral-900 text-white text-xl
      flex justify-center rounded-lg w-full mx-auto mb-4 py-3"
        href={"/post"}
      >
        POST
      </Link>
      {paths.map((item) => (
        <MenuItem
          key={item.slug}
          active={item.slug === segment}
          onClick={() => {
            jump(item.slug);
          }}
          label={item.title}
        />
      ))}
    </div>
  );
};

export default SideBar;
