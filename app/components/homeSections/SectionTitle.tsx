import React, { ReactNode } from "react";

const SectionTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={`text-4xl font-bold flex items-center gap-2 ${className}`}>
      {children}
    </h1>
  );
};

export default SectionTitle;
