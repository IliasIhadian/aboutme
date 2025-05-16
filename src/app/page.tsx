"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";
import { useMediaQuery } from "react-responsive";
import Navbar from "@/components/navbar";
import { useEffect, useRef } from "react";

const useDesktopMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 1280px)" });

const useTabletAndBelowMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 1279px)" });

const Desktop = ({ children }: { children: any }) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

const TabletAndBelow = ({ children }: { children: any }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  return isTabletAndBelow ? children : null;
};

export default function Home() {
  const hasFired = useRef(false);

  useEffect(() => {
    if (!hasFired.current) {
      fetch("/api/pageview");
      hasFired.current = true;
    }
  }, []);

  return (
    <main className="rounded p-8">
      <div className="	rounded-md border-2 border-black">
        <Desktop>
          <div className="grid grid-cols-3 gap-4 ">
            <div className="order-first col-span-3 ">
              <Hero></Hero>
            </div>

            <div className="">
              <Sidebar animate={"h"}></Sidebar>
            </div>

            <div className="col-span-2">
              <Image
                src="/foreground.png"
                alt={"paper ship"}
                width="900"
                height="900"
              ></Image>
            </div>
          </div>
        </Desktop>
        <TabletAndBelow>
          <Hero></Hero>
          <Navbar animate={"h"}></Navbar>
          <Image
            src="/foreground.png"
            alt={"paper ship"}
            width="900"
            height="900"
          ></Image>
        </TabletAndBelow>
      </div>
      <div className="absolute right-[40px] ">
        <Image
          src="/signing.png"
          alt={"alt"}
          width="50"
          height="50"
          className="rotate90"
        ></Image>
      </div>
    </main>
  );
}
