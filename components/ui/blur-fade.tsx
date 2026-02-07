"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  blur?: number;
  className?: string;
  yOffset?: number;
  xOffset?: number;
}

export function BlurFade({
  children,
  delay = 0,
  duration = 1.2,
  blur = 10,
  className,
  yOffset = 0,
  xOffset = 0,
}: BlurFadeProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        filter: `blur(${blur}px)`,
        y: yOffset,
        x: xOffset,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        x: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
