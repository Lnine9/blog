import React, { Suspense } from "react";
import Loader from "@/app/components/Loader";

const DocLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen-xl max-w-screen-xl mx-auto min-h-[calc(100vh-theme(height.navh))]">
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

export default DocLayout;
