import React from "react";
import Image from "next/image";

const Index = () => {
  return (
    <div className="px-16 py-8 w-full h-full min-h-[calc(100vh-theme(height.navh))] bg-white flex justify-center items-center">
      <Image
        src="/images/coding-bro.svg"
        alt="posts"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Index;
