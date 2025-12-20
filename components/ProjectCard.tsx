"use client";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  outlineColor: string;
  bgColor: string;
  textColor: string;
  textSecondaryColor: string;
  imagePosition?: "right-4" | "right-0";
  onClick?: () => void;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  outlineColor,
  bgColor,
  textColor,
  textSecondaryColor,
  imagePosition = "right-4",
  onClick,
}: ProjectCardProps) {
  return (
    <motion.article 
      className="flex-1 p-8 rounded-[32px] outline outline-8 outline-offset-[-8px] backdrop-blur-[20px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden relative cursor-pointer min-h-[340px]"
      style={{
        outlineColor: outlineColor,
        backgroundColor: bgColor,
      }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={onClick}
    >
      <div 
        className="absolute inset-0 rounded-[32px] pointer-events-none z-20"
        style={{
          outline: `8px solid ${outlineColor}`,
          outlineOffset: "-8px",
        }}
      />
      <div className="self-stretch flex flex-col justify-start items-start gap-6 relative z-10">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          <h2 className={`self-stretch ${textColor} text-2xl font-['Zodiak'] leading-6`}>
            {title}
          </h2>
          <p className={`self-stretch ${textSecondaryColor} text-base font-normal font-['Plus_Jakarta_Sans'] leading-6`}>
            {description}
          </p>
        </div>
      </div>
      <motion.img 
        src={imageSrc} 
        alt={imageAlt} 
        className={`absolute bottom-10 ${imagePosition} scale-125 w-auto object-contain z-0`}
        variants={{
          rest: { scale: 1.25, y: 0 },
          hover: { scale: 1.5, y: -20 }
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.article>
  );
}

