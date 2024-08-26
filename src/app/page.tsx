"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="rounded p-8">
      <AspectRatio ratio={16 / 9} className="	rounded-md border-2 border-black">
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
              alt={"alt"}
              width="900"
              height="900"
            ></Image>
          </div>
        </div>
      </AspectRatio>
      <div className="absolute right-[40px] bottom-[10px]">
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
