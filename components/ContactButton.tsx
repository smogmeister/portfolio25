"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ContactButtonProps {
  href: string;
  icon: LucideIcon;
  defaultText: string;
  hoverText: string;
  minWidth: string;
}

export default function ContactButton({
  href,
  icon: Icon,
  defaultText,
  hoverText,
  minWidth,
}: ContactButtonProps) {
  return (
    <motion.a
      href={href}
      className="group relative h-10 pr-4 rounded-[999px] outline outline-1 outline-[#DBE0DE] flex items-center gap-2 overflow-visible"
      style={{ minWidth }}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* animated white background */}
      <motion.span
        variants={{
          rest: { width: "2.5rem" },
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute left-0 top-0 h-full rounded-[999px] bg-white"
      />
      {/* 3 animated outlines */}
      <motion.span
        variants={{
          rest: { opacity: 0, scale: 1 },
          hover: { 
            opacity: 0.75, 
            scale: 1,
            transition: { delay: 0.3, duration: 0.2 }
          },
        }}
        className="absolute inset-[-4px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
      />
      <motion.span
        variants={{
          rest: { opacity: 0, scale: 1 },
          hover: { 
            opacity: 0.5, 
            scale: 1,
            transition: { delay: 0.35, duration: 0.2 }
          },
        }}
        className="absolute inset-[-8px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
      />
      <motion.span
        variants={{
          rest: { opacity: 0, scale: 1 },
          hover: { 
            opacity: 0.25, 
            scale: 1,
            transition: { delay: 0.4, duration: 0.2 }
          },
        }}
        className="absolute inset-[-12px] rounded-[999px] outline outline-1 outline-[#DBE0DE] pointer-events-none"
      />
      <div className="w-full flex items-center relative z-10 gap-2">
        <span className="w-10 h-10 flex justify-center items-center flex-shrink-0">
          <Icon className="w-4 h-4 text-zinc-600" />
        </span>
        <div className="relative flex-1 flex justify-center">
          <motion.span
            variants={{
              rest: { clipPath: "inset(0% 0% 0% 0%)" },
              hover: { clipPath: "inset(0% 0% 0% 100%)" },
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-zinc-700 text-sm font-medium leading-6"
          >
            {defaultText}
          </motion.span>
          <motion.span
            variants={{
              rest: { clipPath: "inset(0% 100% 0% 0%)" },
              hover: { clipPath: "inset(0% 0% 0% 0%)" },
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm font-medium leading-6"
          >
            {hoverText}
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}

