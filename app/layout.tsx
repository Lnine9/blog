import { Noto_Sans } from "next/font/google";

import Navbar from "@/app/components/navbar/Navbar";

import "./globals.css";
import "./prism.css";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/app/loading";

const font = Noto_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lnine9",
  description: "lnine9's blog",
  icons: ["/LOGO_LIGHT.png"],
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={font.className}>
        <div className="bak hidden md:block" />
        <Navbar />
        <div className="w-full flex flex-col justify-center">
          <div className="w-full min-h-[calc(100vh-theme(height.navh))]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
