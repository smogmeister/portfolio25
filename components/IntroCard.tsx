"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlurFade } from "./ui/blur-fade";
import { Highlighter } from "./ui/highlighter";
import { ThemeToggle } from "./ThemeToggle";

interface IntroCardProps {
  onMoreClick: () => void;
  index?: number;
  maxIndex?: number;
}

export default function IntroCard({ onMoreClick, index = 0, maxIndex = 3 }: IntroCardProps) {
  // Calculate when all cards have finished fading in
  // Last card starts at: maxIndex * 0.1, duration is 1.2
  const allCardsFadedInDelay = (maxIndex * 0.1) + 1.2;
  
  return (
    <BlurFade delay={index * 0.1} xOffset={-10} className="w-full lg:w-96 self-stretch">
      <div className="w-full h-full rounded-[32px] border border-border/50 p-[1px]">
        <section 
          className="w-full h-full p-8 bg-card rounded-[32px] border border-border/50 outline outline-12 outline-offset-[-12px] inline-flex flex-col justify-end items-start gap-4 overflow-hidden relative"
          style={{
            outlineColor: "var(--card-outline)",
          }}
        >
      {/* Theme toggle in top right */}
      {/*<div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>*/}
      
      <img 
        src="/favicon.png" 
        alt="Jan Brinkmann" 
        className="w-32 h-32 border-6 border-border/50 rounded-full object-cover grayscale transition-all duration-300 ease-out hover:scale-105 hover:rotate-4 hover:grayscale-0 mb-4" 
      />

      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <h1 className="self-stretch text-foreground text-2xl font-['Zodiak'] leading-6">
            Hi, I'm <Highlighter type="underline" animationDelay={allCardsFadedInDelay * 1000} padding={0} color="var(--primary)" animationDuration={400} verticalOffset={0}>Jan</Highlighter> <span className="text-muted-foreground text-sm ml-1">(ya-hn)</span>
          </h1>
          <p className="self-stretch text-muted-foreground text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
            I shape design strategies and create human-centered products for startups and enterprises. Currently, I work as a Design Lead at Schaeffler.
          </p>
        </div>

        <motion.button 
          onClick={onMoreClick}
          className="group relative h-10 px-4 py-2 rounded-[999px] outline outline-1 outline-offset-[-1px] outline-border inline-flex justify-center items-center gap-2 bg-card/70 hover:bg-card transition-colors overflow-visible cursor-pointer"
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <span 
            className="absolute inset-0 rounded-[999px] pointer-events-none transition-all duration-500 ease-out shadow-[0_0_0_0px_color-mix(in_oklch,var(--border)_50%,transparent)] group-hover:shadow-[0_0_0_4px_color-mix(in_oklch,var(--border)_50%,transparent)]"
          />
          <span className="relative z-10 text-accent-foreground text-sm font-medium font-['Plus_Jakarta_Sans'] leading-6">
            More about me
          </span>
          <ArrowRight className="relative z-10 w-4 h-4 text-accent-foreground transition-transform duration-500 ease-out group-hover:-rotate-90" />
        </motion.button>
      </div>
    </section>
      </div>
    </BlurFade>
  );
}

