"use client";
import { ArrowRight } from "lucide-react";

interface IntroCardProps {
  onMoreClick: () => void;
}

export default function IntroCard({ onMoreClick }: IntroCardProps) {
  return (
    <section className="w-full lg:w-96 self-stretch p-8 bg-white rounded-[32px] outline outline-8 outline-offset-[-8px] outline-zinc-100 backdrop-blur-[20px] inline-flex flex-col justify-end items-start gap-4 overflow-hidden">
      <img src="/avatar.png" alt="Jan Brinkmann" className="" />

      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <p className="self-stretch text-zinc-700 text-2xl font-['Zodiak'] leading-6">
            Hi, I'm <span className="underline">Jan</span> <span className="text-zinc-500 text-sm ml-1">(ya-hn)</span>
          </p>
          <p className="self-stretch text-zinc-500 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
            I am a product designer that spent the last 5 years moving pixels to make people smile.
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
    </section>
  );
}

