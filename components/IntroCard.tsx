"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface IntroCardProps {
  onMoreClick: () => void;
  index?: number;
}

export default function IntroCard({ onMoreClick, index = 0 }: IntroCardProps) {
  return (
    <motion.section 
      className="w-full lg:w-96 self-stretch p-8 bg-white rounded-[32px] outline outline-8 outline-offset-[-8px] outline-zinc-100 backdrop-blur-[20px] inline-flex flex-col justify-end items-start gap-4 overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut"
      }}
    >
      <img src="/avatar.png" alt="Jan Brinkmann" className="" />

      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <p className="self-stretch text-zinc-800 text-2xl font-['Zodiak'] leading-6">
            Hi, I'm <span className="underline">Jan</span> <span className="text-zinc-500 text-sm ml-1">(ya-hn)</span>
          </p>
          <p className="self-stretch text-zinc-500 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
            I shape design strategies and create human-centered products for startups and enterprises. Currently, I work as a Design Lead at Schaeffler and study for an MBA at IU.
          </p>
        </div>

        <button 
          onClick={onMoreClick}
          className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2 bg-white/70 hover:bg-white transition overflow-visible cursor-pointer">
          <span className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-500 ease-out shadow-[0_0_0_0px_rgba(229,231,235,0.5)] group-hover:shadow-[0_0_0_4px_rgba(229,231,235,0.5)]" />
          <span className="relative z-10 text-zinc-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
            More about me
          </span>
          <ArrowRight className="relative z-10 w-4 h-4 text-zinc-700 transition-transform duration-500 ease-out group-hover:-rotate-90" />
        </button>
      </div>
    </motion.section>
  );
}

