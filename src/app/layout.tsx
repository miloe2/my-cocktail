import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import localFont from "next/font/local";
import FilterModal from "@/components/pages/main/FilterModal";
import BottomModal from "@/components/elements/BottomModal";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <head></head>
      {/* <body> */}
      <body
        className={`${pretendard.variable} font-pretendard bg-stone-800 text-stone-100`}
      >
      <button>click</button>
        {children}
        {/* 전역 modal = true && modal */}
        {/* <BottomModal>
          <div className="bg-red-500 h-auto  inline-flex">hihi</div>
          <div>hihi</div>
        </BottomModal> */}
        <FilterModal/>

      </body>
    </html>
  );
}
